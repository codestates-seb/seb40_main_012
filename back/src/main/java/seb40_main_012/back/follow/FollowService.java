package seb40_main_012.back.follow;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.service.UserService;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final EntityManager em;
    private final UserService userService;

    public String createFollow(long followingUserId, long followedUserId) {

        if (followingUserId == followedUserId) return "redirect:https://user-images.githubusercontent.com/70098708/201463341-052e7be2-619a-4ef0-9769-be23dc0dc19d.png";

        long result = followRepository.makeFollow(followingUserId, followedUserId);

        if (result == 1) return "팔로우 성공";
        return "이미 팔로우 한 사용자 입니다.";
    }

    public String deleteFollow(long followingUserId, long followedUserId) {

        if (followingUserId == followedUserId) return "redirect:https://user-images.githubusercontent.com/70098708/201463341-052e7be2-619a-4ef0-9769-be23dc0dc19d.png";

        long result = followRepository.makeUnFollow(followingUserId, followedUserId);

        if (result == 1) return "언팔로우 성공";
        return "이미 언팔로우한 사용자 입니다.";
    }

    public List<User> findFollowers(long userId) {

        List<Long> followerIdList = followRepository.findFollowersByUserId(userId);

        return followerIdList.stream()
                .map(userService::findVerifiedUser)
                .collect(Collectors.toList());
    }

    public List<User> findFollowings(long userId) {

        List<Long> followingIdList = followRepository.findFollowingsByUserId(userId);

        return followingIdList.stream()
                .map(userService::findVerifiedUser)
                .collect(Collectors.toList());
    }

    public long countFollowers(long userId) {

        List<Long> followerIdList = followRepository.findFollowersByUserId(userId);

        return followerIdList.stream().count();
    }

    public long countFollowings(long userId) {

        List<Long> followingIdList = followRepository.findFollowingsByUserId(userId);

        return followingIdList.stream().count();
    }
}
