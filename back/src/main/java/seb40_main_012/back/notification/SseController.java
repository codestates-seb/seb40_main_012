package seb40_main_012.back.notification;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.service.UserService;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SseController {

    private final NotificationService notificationService;
    public static Map<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();
    private final UserService userService;

    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    public SseEmitter subscribe(@RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        return notificationService.connect(lastEventId);
    }

    @GetMapping(value = "/notice", consumes = MediaType.ALL_VALUE)
    public ResponseEntity<SseEmitter> connect() {

        User findUser = userService.getLoginUser();

        long userId = findUser.getUserId();

        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE); // 만료 시간

        // 전달 받은 토큰에서 userId를 파싱해서 SseEmitter 저장
        // 사용자 별로 SseEmitter 식별 후 알림 전송 가능
        sseEmitters.put(userId, sseEmitter);

        try {
            sseEmitter.send(SseEmitter
                    .event()
                    .name("connect")
                    .data("connected")); // 재연결 요청시 503 방지를 위한 더미 데이터
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 완료, 타임아웃, 에러 발생 후 재연결 요청시 새로운 객체 생성을 위한 기존 객체 삭제
        sseEmitter.onCompletion(() -> sseEmitters.remove(userId));
        sseEmitter.onTimeout(() -> sseEmitters.remove(userId));
        sseEmitter.onError((e) -> sseEmitters.remove(userId));

        return ResponseEntity.ok(sseEmitter);

    }

}
