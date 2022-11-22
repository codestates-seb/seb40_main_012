package seb40_main_012.back.notification;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.pairing.PairingRepository;
import seb40_main_012.back.pairing.PairingService;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.service.UserService;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final PairingService pairingService;
    private final PairingRepository pairingRepository;
    private final EmitterRepository emitterRepository;
    private final UserService userService;

//    ------------------------------------------------------------------------------------------------
//    ------------------------------------------------------------------------------------------------
//    ------------------------------------------------------------------------------------------------
//    ------------------------------------------------------------------------------------------------
//    ------------------------------------------------------------------------------------------------

    private static final Long DEFAULT_TIMEOUT = Long.MAX_VALUE;

    public SseEmitter connect(String lastEventId) {

        User findUser = userService.getLoginUser();
        long userId = findUser.getUserId();

        String connectId = userId + "_" + System.currentTimeMillis();

        SseEmitter sseEmitter = emitterRepository.save(connectId, new SseEmitter(DEFAULT_TIMEOUT));

        // 완료, 시간초과, 에러로 인해 요청 전송 불가시 저장해둔 sseEmitter 삭제
        sseEmitter.onCompletion(() -> emitterRepository.deleteById(connectId));
        sseEmitter.onTimeout(() -> emitterRepository.deleteById(connectId));
        sseEmitter.onError((e) -> emitterRepository.deleteById(connectId));

        sendToClient(sseEmitter, connectId, "Connected. [userId=" + userId + "]"); // 재연결 요청시 503 방지를 위한 더미 데이터

        if (!lastEventId.isEmpty()) { // 클라이언트가 미수신한 Event 유실 예방
            Map<String, Object> events = emitterRepository.findAllEventCacheStartWithByMemberId(String.valueOf(userId));
            events.entrySet().stream()
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                    .forEach(entry -> sendToClient(sseEmitter, entry.getKey(), entry.getValue()));
        }

        return sseEmitter;
    }

    public void sendNotification(Comment comment, String body) {

        User findUser = userService.getLoginUser(); // 코멘트에 코멘트를 단 유저

        User receiver = comment.getUser(); // 원래 코멘트의 주인 유저

        Notification notification = createCommentNotification(receiver, comment, findUser.getNickName(), body);

        Map<String, SseEmitter> sseEmitters = emitterRepository // 수신자의 모든 알림 조회
                .findAllEmitterStartWithByMemberId(String.valueOf(comment.getUser().getUserId()));

        sseEmitters.forEach(
                (key, emitter) -> {
                    emitterRepository.saveEventCache(key, notification); // 유실된 데이터 처리를 위한 캐시 저장
                    sendToClient(emitter, key, NotificationDto.Response.from(notification)); // 데이터 전송
                }
        );
    }

    private Notification createCommentNotification(User receiver, Comment comment, String commentUserNickName, String body) {

        return Notification.builder()
                .receiver(receiver)
                .body(body) // 알림 내용 ex) 작성하신 코멘트에 00가 코멘트를 남겼습니다.
                .receiverCommentBody(comment.getBody()) // reveiver가 작성한 코멘트! 헷갈리지 말 것!
                .commentUserNickName(commentUserNickName) // 코멘트에 코멘트를 단 유저의 닉네임
                .url("/api/comments/" + comment.getCommentId()) // receiver가 작성한 코멘트 주소, 즉 코멘트가 달린 코멘트의 주소
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();
    }

    private void sendToClient(SseEmitter emitter, String id, Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(id)
                    .name("sse")
                    .data(data));
        } catch (IOException exception) {
            emitterRepository.deleteById(id);
            throw new RuntimeException("연결 오류");
        }
    }

    //    ------------------------------------------------------------------------------------------------
//    ------------------------------------------------------------------------------------------------
//    ------------------------------------------------------------------------------------------------
//    ------------------------------------------------------------------------------------------------
//    ------------------------------------------------------------------------------------------------
    public void notifyUpdateLikeCommentEvent(Comment comment) { // 코멘트 좋아요 알림

        User findUser = userService.getLoginUser();

        long userId = comment.getUser().getUserId();

        if (SseController.sseEmitters.containsKey(userId)) {
            SseEmitter sseEmitter = SseController.sseEmitters.get(userId);
            try {
                log.info("작성하신 코멘트 <" + comment.getBody() + ">에 " + findUser.getNickName() + "님이 좋아요를 눌렀습니다.");
                log.info("http://localhost:8080/api/books/comments/" + comment.getCommentId());
                sseEmitter.send(SseEmitter.event().name("updateLikeComment")
                        .data("작성하신 코멘트 <" + comment.getBody() + ">에 " + findUser.getNickName() + "님이 좋아요를 눌렀습니다"
                                + "http://localhost:8080/api/books/comments/" + comment.getCommentId()));

            } catch (Exception e) {
                SseController.sseEmitters.remove(userId);
            }
        }
    }

    public void notifyUpdateLikePairingEvent(Pairing pairing) { // 페어링 좋아요 알림

        User findUser = userService.getLoginUser();

        long userId = pairing.getUser().getUserId();

        if (SseController.sseEmitters.containsKey(userId)) {
            SseEmitter sseEmitter = SseController.sseEmitters.get(userId);
            try {
                log.info("작성하신 페어링 <" + pairing.getTitle() + ">에 " + findUser.getNickName() + "님이 좋아요를 눌렀습니다.");
                log.info("http://localhost:8080/api/books/pairings/" + pairing.getPairingId());
                sseEmitter.send(SseEmitter.event().name("updateLikePairing")
                        .data("작성하신 페어링 <" + pairing.getTitle() + ">에 " + findUser.getNickName() + "님이 좋아요를 눌렀습니다.\n"
                                + "http://localhost:8080/api/books/pairings/" + pairing.getPairingId()));
            } catch (Exception e) {
                SseController.sseEmitters.remove(userId);
            }
        }
    }

    public void notifyPostPairingCommentEvent(Comment comment) { // 페어링 댓글 알림

        User findUser = userService.getLoginUser();

        Pairing pairing = comment.getPairing();

        long userId = pairing.getUser().getUserId();

        if (SseController.sseEmitters.containsKey(userId)) {
            SseEmitter sseEmitter = SseController.sseEmitters.get(userId);
            try {
                log.info("작성하신 페어링 <" + comment.getPairing().getTitle() + ">에 " + findUser.getNickName() + "님이 새로운 댓글을 달았습니다.");
                log.info("http://localhost:8080/api/comments/" + comment.getCommentId());
                log.info("\"" + comment.getBody() + "\"");
                sseEmitter.send(SseEmitter.event().name("postPairingComment")
                        .data("작성하신 페어링 <" + comment.getPairing().getTitle() + ">에 " + findUser.getNickName() + "님이 새로운 댓글을 달았습니다."
                                + ": " + comment.getBody()
                                + "http://localhost:8080/api/comments/" + comment.getCommentId()));
            } catch (Exception e) {
                SseController.sseEmitters.remove(userId);
            }
        }
    }
}
