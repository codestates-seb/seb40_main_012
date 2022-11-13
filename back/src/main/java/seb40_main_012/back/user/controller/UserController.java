package seb40_main_012.back.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.dto.SingleResponseDto;
import seb40_main_012.back.user.dto.UserDto;
import seb40_main_012.back.user.dto.UserInfoDto;
import seb40_main_012.back.user.entity.User;
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

    @PatchMapping("/nickname")
    @ResponseStatus(HttpStatus.OK)
    public void patchNickname(@RequestHeader("Authorization") Long userId, @RequestBody UserDto.Profile request) {
        userService.updateNickname(userId,request.getNickname());
    }

    @PostMapping("/password/current")
    @ResponseStatus(HttpStatus.OK)
    public boolean verifyPassword(@RequestHeader("Authorization") Long userId,String currentPassword){
        return userService.verifyPassword(userId,currentPassword);
    }

    @PatchMapping("/password/update")
    @ResponseStatus(HttpStatus.OK)
    public void patchPassword(@RequestHeader("Authorization") Long userId, @RequestBody UserDto.Password request){
        userService.updatePassword(userId,request.getPassword());
    }

    //    @PatchMapping
//    public void patchImage(){}
//
    @PatchMapping
    @ResponseStatus(HttpStatus.OK)
    public UserInfoDto.Response patchUserInfo(@RequestHeader("Authorization") Long userId, UserInfoDto.Post request){
        User editedUser = userService.editUserInfo(request.toEntity(),request.getCategory());
        return null;
    }
//
//    @PatchMapping
//    public UserDto.ResponseDto patchProfile(){}
//
//    @DeleteMapping
//    public void deleteUser(){}
//
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
