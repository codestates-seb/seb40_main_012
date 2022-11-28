package seb40_main_012.back.aop;

import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import seb40_main_012.back.email.EmailSenderService;
import seb40_main_012.back.statistics.StatisticsRepository;
import seb40_main_012.back.user.dto.UserDto;

import java.security.GeneralSecurityException;

@Aspect
@Component
@RequiredArgsConstructor
public class CherriPickAop {

    private final EmailSenderService emailSenderService;
    private final StatisticsRepository statisticsRepository;

    @AfterReturning(value = "execution(* seb40_main_012.back.user.controller.UserController.postUser(..)) && args(postDto))", returning = "response")
    public void sendSignUpEmail(JoinPoint joinPoint, UserDto.PostDto postDto, ResponseEntity response) {

        try {
            emailSenderService.sendSignupEmail(postDto.getEmail());
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }
    }
}
