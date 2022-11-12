package seb40_main_012.back.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.dto.SingleResponseDto;
import seb40_main_012.back.user.dto.UserDto;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.mapper.UserMapper;
import seb40_main_012.back.user.service.UserService;

import javax.validation.Valid;

@RequestMapping("/api/users")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserMapper mapper;

    @PostMapping
    public ResponseEntity postUser(@Valid @RequestBody UserDto.PostDto postdto) {
        User user = mapper.userPostToUser(postdto);

        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserResponse(createdUser)), HttpStatus.CREATED);
    }

//    @PatchMapping("/nickname")
//    public void patchNickname(@RequestBody UserDto.PostDto request) {
//        userService.updateNickname(request.getNickname);
//    }

    @PatchMapping("/password")
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
