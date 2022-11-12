package seb40_main_012.back.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.config.auth.event.UserRegistrationApplicationEvent;
import seb40_main_012.back.config.auth.utils.CustomAuthorityUtils;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ApplicationEventPublisher publisher;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public User createUser(User user) {
        Optional<User> verifiedUser = userRepository.findByEmail(user.getEmail());
        if(verifiedUser.isPresent())
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
        findUser.setNickName(nickname);
        userRepository.save(findUser);
    }

    public void editUser(){
        //상세정보 업뎃
    }



    public User findVerifiedUser(Long id) {
        User findUser = userRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return findUser;
    }

}
