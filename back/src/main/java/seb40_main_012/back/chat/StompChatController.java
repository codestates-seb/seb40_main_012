package seb40_main_012.back.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class StompChatController {

    private final SimpMessagingTemplate template; // 특정 broker로 메세지 전달

    // Client가 SEND할 수 있는 경로
    // StompWebSocketConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
    // "/pub/chat/enter"

    @MessageMapping("chat/enter")
    public void enter(ChatDto.Message message) {
        message.setMessage(message.getWriter() + "님이 채팅방에 참여하였습니다.");
        template.convertAndSend("/sub/chat/room" + message.getChatId(), message);
    }

//    @MessageMapping 을 통해 WebSocket으로 들어오는 메세지 발행을 처리한다.
//    Client에서는 prefix를 붙여 "/pub/chat/enter"로 발행 요청을 하면 Controller가 해당 메세지를 받아 처리하는데,
//    메세지가 발행되면 "/sub/chat/room/[roomId]"로 메세지가 전송되는 것을 볼 수 있다.
//
//    Client에서는 해당 주소를 SUBSCRIBE하고 있다가 메세지가 전달되면 화면에 출력한다.
//    이때 /sub/chat/room/[roomId]는 채팅방을 구분하는 값이다.
//    기존의 핸들러 ChatHandler의 역할을 대신 해주므로 핸들러는 없어도 된다.

    @MessageMapping("chat/message")
    public void message(ChatDto.Message message) {
        template.convertAndSend("/sub/chat/room" + message.getChatId(), message);
    }
}
