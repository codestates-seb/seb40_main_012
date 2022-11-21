package seb40_main_012.back.follow;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.SliceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.dto.SingleResponseDto;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.service.UserService;

import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/follow")
public class FollowController {

    private final FollowService followService;
    private final FollowMapper followMapper;
    private final UserService userService;
    private final FollowRepository followRepository;

    @PostMapping("/{userId}")
    public ResponseEntity follow(@PathVariable("userId") @Positive long followedUserId) {

        User findUser = userService.getLoginUser();
        long followingUserId = findUser.getUserId();

        String result = followService.createFollow(followingUserId, followedUserId);

        return new ResponseEntity<>(
                new FollowDto.CMResponse<>(1, result), HttpStatus.OK
        );
//        return new FollowDto.CMResponse<>(1, result);
    }

    @DeleteMapping("/{userId}")
    public FollowDto.CMResponse unFollow(@PathVariable("userId") @Positive long followedUserId) {

        User findUser = userService.getLoginUser();
        long followingUserId = findUser.getUserId();

        String result = followService.deleteFollow(followingUserId, followedUserId);

        return new FollowDto.CMResponse<>(1, result);
    }

    @GetMapping("/{userId}/followers")
    public ResponseEntity followersList(@PathVariable("userId") @Positive long followedUserId) {

        List<User> findFollowers = followService.findFollowers(followedUserId);
        SliceImpl<FollowDto.Response> response = followMapper.followersToFollowResponses(findFollowers);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @GetMapping("/{userId}/followings")
    public ResponseEntity followingList(@PathVariable("userId") @Positive long followingUserId) {

        List<User> findFollowings = followService.findFollowings(followingUserId);
        SliceImpl<FollowDto.Response> response = followMapper.followingsToFollowResponses(findFollowings);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }
}
