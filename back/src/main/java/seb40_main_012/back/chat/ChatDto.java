package seb40_main_012.back.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.socket.WebSocketSession;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;


public class ChatDto {

    @Data
    @Builder
    public static class Message {
        private String chatId;
        private String writer;
        private String message;
        private LocalDateTime localDateTime;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChatRoom { // 채팅방
        private String chatId;
        private String name;
        private Set<WebSocketSession> sessions = new HashSet<>();

        public static ChatRoom create(String name) {
            ChatRoom chat = new ChatRoom();

            chat.chatId = UUID.randomUUID().toString();
            chat.name = name;

            return chat;
        }

    }

}
