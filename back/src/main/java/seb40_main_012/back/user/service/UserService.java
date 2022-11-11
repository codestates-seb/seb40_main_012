package seb40_main_012.back.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ErrorResponse;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

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
