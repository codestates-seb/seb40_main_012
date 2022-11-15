package seb40_main_012.back.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.config.auth.dto.LoginDto;
import seb40_main_012.back.config.auth.event.UserRegistrationApplicationEvent;
import seb40_main_012.back.config.auth.utils.CustomAuthorityUtils;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.repository.UserRepository;

import java.util.List;
import java.util.regex.Pattern;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ApplicationEventPublisher publisher;
    private final CustomAuthorityUtils authorityUtils;
    private final BCryptPasswordEncoder passwordEncoder;

    public User createUser(User user) {
        Optional<User> verifiedUser = userRepository.findByEmail(user.getEmail());
        if (verifiedUser.isPresent())
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);

        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);
        User savedUser = userRepository.save(user);

        publisher.publishEvent(new UserRegistrationApplicationEvent(this, savedUser));
        return savedUser;
    }

    public void updateNickname(Long id, String nickname) {
        User findUser = findVerifiedUser(id);
        //nickname 중복 검사
        findUser.updateNickName(nickname);
        userRepository.save(findUser);
    }

    public boolean verifyPassword(Long userId, String password) {
        User findUser = findVerifiedUser(userId);
        return findUser.verifyPassword(passwordEncoder, password);
    }

    public void updatePassword(Long id, String password) {
        User findUser = findVerifiedUser(id);
        if (verifyPassword(id, password)) {
            throw new BusinessLogicException(ExceptionCode.PASSWORD_CANNOT_CHANGE);
        } else {
            findUser.updatePassword(passwordEncoder, password);
//            userRepository.save(findUser);
        }
    }

    public User editUserInfo(User user, List<String> category) {
        User findUser = findVerifiedUser(user.getUserId());
        findUser.updateUserInfo(user);
        return null;
    }

    public User findUser(long userId) {
        return findVerifiedUser(userId);
    }

    public User findVerifiedUser(Long id) {
        Optional<User> optionalUser =
                userRepository.findById(id);
        return optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    /* @Valid 와 차이 확인*/
//    public boolean validPassword(String password) {
//        Pattern pattern = Pattern.compile();
//    }

    public void updateOnFirstLogin(LoginDto.PatchDto patchDto) {
        User loginUser = getLoginUser(); // 로그인 유저 가져오기
        loginUser.setGender(patchDto.getGenderType());
        loginUser.setAge(patchDto.getAge());
        // TODO: 선호 장르 등록하기
        loginUser.setFirstLogin(false); // "나중에 하기" 또는 "확인" 버튼 클릭 시

        userRepository.save(loginUser);
    }

    public User getLoginUser() { // 로그인된 유저 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getName() == null || authentication.getName().equals("anonymousUser"))
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);

        Optional<User> optionalUser = userRepository.findByEmail(authentication.getName());
        User user = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return user;
    }

}
