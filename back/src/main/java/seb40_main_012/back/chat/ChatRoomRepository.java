package seb40_main_012.back.chat;

import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class ChatRoomRepository {

    private Map<String, ChatDto.ChatRoom> chatRoomMap;

    @PostConstruct
    private void init() {
        chatRoomMap = new LinkedHashMap<>();
    }

    // 채팅방 생성 최신 순으로
    public List<ChatDto.ChatRoom> findAllRooms() {
        List<ChatDto.ChatRoom> result = new ArrayList<>(chatRoomMap.values());
        Collections.reverse(result);

        return result;
    }

    public ChatDto.ChatRoom findRoomById(String chatId) {
        return chatRoomMap.get(chatId);
    }

    public ChatDto.ChatRoom createChatRoom(String name) {
        ChatDto.ChatRoom room = ChatDto.ChatRoom.create(name);
        chatRoomMap.put(room.getChatId(), room);

        return room;
    }
}
