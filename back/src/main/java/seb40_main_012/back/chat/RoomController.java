package seb40_main_012.back.chat;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Slf4j
@Controller
@RequestMapping("/chat")
@RequiredArgsConstructor
public class RoomController {

    private final ChatRoomRepository chatRoomRepository;

    @GetMapping("/rooms") // 채팅방 목록 조회
    public ModelAndView getRooms() {

        log.info("# All Chat Rooms");

        ModelAndView mv = new ModelAndView("chat/rooms");

        mv.addObject("list", chatRoomRepository.findAllRooms());

        return mv;
    }

    @PostMapping("/rooms/add") // 채팅방 생성
    public String create(@RequestParam String name,
                         RedirectAttributes rttr) {

        log.info("# Create New Chat Room, Name: " + name);

        rttr.addFlashAttribute("roomName", chatRoomRepository.createChatRoom(name));

        return "redirect:/chat/rooms";
    }

    @GetMapping("/room") // 채팅방 조회
    public void getRoom(String chatId, Model model) {

        log.info("# Get Chat Room, chatId: " + chatId);

        model.addAttribute("room", chatRoomRepository.findRoomById(chatId));
    }

}
