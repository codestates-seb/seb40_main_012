package seb40_main_012.back.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ErrorResponse;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.regex.Pattern;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

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
        User findUser = findVerifiedUser(user.getId());
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
