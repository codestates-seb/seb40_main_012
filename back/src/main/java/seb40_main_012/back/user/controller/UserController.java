package seb40_main_012.back.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.config.auth.dto.LoginDto;
import seb40_main_012.back.bookCollection.dto.BookCollectionDto;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollection.repository.BookCollectionRepository;
import seb40_main_012.back.common.comment.CommentDto;
import seb40_main_012.back.common.comment.CommentRepository;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.dto.ListResponseDto;
import seb40_main_012.back.dto.SingleResponseDto;
import seb40_main_012.back.pairing.PairingDto;
import seb40_main_012.back.pairing.PairingRepository;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.dto.UserDto;
import seb40_main_012.back.user.dto.UserInfoDto;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.mapper.UserMapper;
import seb40_main_012.back.user.service.UserService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserMapper mapper;
    private final CommentRepository commentRepository;
    private final PairingRepository pairingRepository;
    private final BookCollectionRepository collectionRepository;


    @PostMapping("/users")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.PostDto postdto) {
        User user = mapper.userPostToUser(postdto);

        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserResponse(createdUser)), HttpStatus.CREATED);
    }
    @PostMapping("/mypage/verify/nickName")
    public boolean verifyNickName(@Valid @RequestBody UserDto.Profile request){
        return userService.verifyNickName(request.getNickName());
    }

    @PostMapping("/mypage/verify/email")
    public boolean verifyEmail(@Valid @RequestBody UserDto.EmailDto emailDto) {
        return userService.verifyEmail(emailDto.getEmail());
    }

    @PatchMapping("/mypage/nickname")
    @ResponseStatus(HttpStatus.OK)
    public void patchNickName(@RequestHeader("Authorization") Long userId, @RequestBody UserDto.Profile request) {
        userService.updateNickName(userId,request.getNickName());
    }

    @PostMapping("/mypage/password/current")
    @ResponseStatus(HttpStatus.OK)
    public boolean verifyPassword(@RequestHeader("Authorization") Long userId,@RequestBody String currentPassword){
        return userService.verifyPassword(userId,currentPassword);
    }

    @PatchMapping("/mypage/password/update")
    @ResponseStatus(HttpStatus.OK)
    public void patchPassword(@RequestHeader("Authorization") Long userId, @RequestBody UserDto.Password request){
        userService.updatePassword(userId,request.getPassword());
    }

    @PatchMapping("/mypage/userInfo")
    @ResponseStatus(HttpStatus.OK)
    public UserInfoDto.Response patchUserInfo(@RequestHeader("Authorization") Long userId, @RequestBody UserInfoDto.Post request){
        User editedUser = userService.editUserInfo(userId,request.toEntity(),request.getCategory());
        return UserInfoDto.Response.of(editedUser);
    }
    @GetMapping("/users/{user_id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity getUser(@PathVariable("user_id") @Positive Long userId){

        User user = userService.findUser(userId);

        UserDto.ResponseDto response = mapper.userToUserResponse(user);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    //    @PatchMapping
//    public void patchImage(){}
//
//    @PatchMapping //프사 수정
//    public UserDto.ResponseDto patchProfileImage(){}
//
    @DeleteMapping("/mypage")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteUser(@RequestHeader("Authorization") Long userId){
        return userService.deleteUser(userId);
    }


    /** 조회 API */
    @GetMapping("/mypage/nickName")
    @ResponseStatus(HttpStatus.OK)
    public UserDto.ProfileResponse getNickName(@RequestHeader("Authorization") Long userId){
        User user = userService.findVerifiedUser(userId);
        return new UserDto.ProfileResponse(user.getNickName());
    }

    @GetMapping("/mypage/userInfo")
    @ResponseStatus(HttpStatus.OK)
    public UserInfoDto.Response getUserInfo(@RequestHeader("Authorization") Long userId){
        User user = userService.findVerifiedUser(userId);
        return UserInfoDto.Response.of(user);
    }

    @GetMapping("/mypage/userComment")
    @ResponseStatus(HttpStatus.OK)
    public ListResponseDto<CommentDto.UserComment> getUserComment(@RequestHeader("Authorization") Long userId){
        List<Comment> comments = userService.getUserComment(userId);
        List<CommentDto.UserComment> commentDto = comments.stream().map(x -> CommentDto.UserComment.of(x)).collect(Collectors.toList());
        Long listCount = commentRepository.countBy();
        return new ListResponseDto<>(listCount,commentDto);
    }

    @GetMapping("/mypage/userPairing")
    @ResponseStatus(HttpStatus.OK)
    public ListResponseDto<PairingDto.UserPairing> getUserPairing(@RequestHeader("Authorization") Long userId){
        List<Pairing> pairings = userService.getUserPairing(userId);
        List<PairingDto.UserPairing> pairingDto = pairings.stream().map(x -> PairingDto.UserPairing.of(x)).collect(Collectors.toList());
        Long listCount = pairingRepository.countBy();
        return new ListResponseDto<>(listCount,pairingDto);
    }

    @GetMapping("/mypage/userCollection")
    @ResponseStatus(HttpStatus.OK)
    public ListResponseDto<BookCollectionDto.UserCollection> getUserBookCollection(@RequestHeader("Authorization") Long userId){
        List<BookCollection> collections = userService.getUserCollection(userId);
        List<BookCollectionDto.UserCollection> collectionDto = collections.stream().map(x-> BookCollectionDto.UserCollection.of(x)).collect(Collectors.toList());
        Long listCount = collectionRepository.countByUserUserId(userId);
        return new ListResponseDto<>(listCount,collectionDto);
    }


    @GetMapping("/mypage/bookMark/collection")
    @ResponseStatus(HttpStatus.OK)
    public ListResponseDto<BookCollectionDto.BookmarkedCollection> getBookMarkByBookCollection(@RequestHeader("Authorization") Long userId){
        List<BookCollection> collections = userService.getBookMarkByBookCollection(userId);
        List<BookCollectionDto.BookmarkedCollection> bookmarkedCollectionDto = collections.stream().map(x -> BookCollectionDto.BookmarkedCollection.of(x)).collect(Collectors.toList());
        Long listCount = collectionRepository.countByUserUserId(userId);
        return new ListResponseDto<>(listCount,bookmarkedCollectionDto);
    }

//    @GetMapping("/bookMark/pairing")
//    @ResponseStatus(HttpStatus.OK)
//    public ListResponseDto<PairingDto.BookmarkedPairing> getBookMarkByPairing(@RequestHeader("Authorization") Long userId){
//        List<Pairing> pairings = userService.getBookMarkByPairing(userId);
//        List<PairingDto.UserPairing> pairingDto = pairings.stream().map(x -> PairingDto.UserPairing.of(x)).collect(Collectors.toList());
//        Long listCount = pairingRepository.countBy();
//    }
//
//    @GetMapping
//    public UserDto.ResponseDto getBookMarkByBook(){}

    @PatchMapping("/users/firstLogin")
    public ResponseEntity patchUserOnFirstLogin(@RequestBody LoginDto.PatchDto patchDto) {
        User user = userService.updateOnFirstLogin(patchDto);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToFirstLoginResponse(user)), HttpStatus.OK);
    }

}
