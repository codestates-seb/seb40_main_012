package seb40_main_012.back.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.config.auth.event.UserRegistrationApplicationEvent;
import seb40_main_012.back.config.auth.utils.CustomAuthorityUtils;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.repository.UserRepository;
import javax.transaction.Transactional;
import java.util.List;
import java.util.regex.Pattern;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ApplicationEventPublisher publisher;
    private final CustomAuthorityUtils authorityUtils;

    private final BCryptPasswordEncoder passwordEncoder;

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
        findUser.updateNickName(nickname);
        userRepository.save(findUser);
    }

    public boolean verifyPassword(Long userId, String password){
        User findUser = findVerifiedUser(userId);
        return findUser.verifyPassword(passwordEncoder, password);
    }
    public void updatePassword(Long id, String password){
        User findUser = findVerifiedUser(id);
        if(verifyPassword(id,password)){
            throw new BusinessLogicException(ExceptionCode.PASSWORD_CANNOT_CHANGE);
        }
        else{
            findUser.updatePassword(passwordEncoder,password);
//            userRepository.save(findUser);
        }
    }

    public User editUserInfo(User user, List<String> category){
        User findUser = findVerifiedUser(user.getUserId());
        findUser.updateUserInfo(user);
        return null;
    }



    public User findVerifiedUser(Long id) {
        User findUser = userRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;
    }

    /** @Valid 와 차이 확인*/
//    public boolean validPassword(String password) {
//        Pattern pattern = Pattern.compile();
//    }


}
