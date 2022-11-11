package seb40_main_012.back.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.user.dto.UserDto;
import seb40_main_012.back.user.service.UserService;

@RequestMapping("/users")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

//    @PatchMapping("/nickname")
//    public void patchNickname(@RequestBody UserDto.PostDto request) {
//        userService.updateNickname(request.getNickname);
//    }

    @PatchMapping()
    public void patchPassword(){}

    @PatchMapping
    public void patchImage(){}

//    @PatchMapping
//    public UserDto.ResponseDto patchUserInfo(){}
//
//    @PatchMapping
//    public UserDto.ResponseDto patchProfile(){}

    @DeleteMapping
    public void deleteUser(){}

//    @GetMapping
//    public UserDto.ResponseDto getUserComment(){}
//
//    @GetMapping
//    public UserDto.ResponseDto getUserPairing(){}
//
//    @GetMapping
//    public UserDto.ResponseDto getUserBookCollection(){}
//
//    @GetMapping
//    public UserDto.ResponseDto getBookMarkByBookCollection(){}
//
//    @GetMapping
//    public UserDto.ResponseDto getBookMarkByPairing(){}
//
//    @GetMapping
//    public UserDto.ResponseDto getBookMarkByBook(){}


}
