package seb40_main_012.back.aop;

import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import seb40_main_012.back.email.EmailSenderService;
import seb40_main_012.back.statistics.StatisticsRepository;
import seb40_main_012.back.statistics.StatisticsService;
import seb40_main_012.back.user.dto.UserDto;
import seb40_main_012.back.user.entity.User;

import java.security.GeneralSecurityException;
import java.time.LocalDate;

@Aspect
@Component
@RequiredArgsConstructor
public class CherriPickAop {

    private final EmailSenderService emailSenderService;
    private final StatisticsService statisticsService;
    private final StatisticsRepository statisticsRepository;

    @AfterReturning(value = "execution(* seb40_main_012.back.user.controller.UserController.postUser(..)) && args(postDto))", returning = "response")
    public void sendSignUpEmail(JoinPoint joinPoint, UserDto.PostDto postDto, ResponseEntity response) {

        try {
            emailSenderService.sendSignupEmail(postDto.getEmail());
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }
    }

    @AfterReturning(value = "execution(* seb40_main_012.back.config.auth.userdetails.UserDetailsServiceImpl.loadUserByUsername(..))", returning = "findUser")
    public void signInStatistics(JoinPoint joinPoint, User findUser) {

        if (statisticsRepository.findByDate(LocalDate.now()) == null) {
            statisticsService.createTable(LocalDate.now());
        }


        System.out.println("----------------------------------------------------");
        System.out.println("----------------------------------------------------");
        System.out.println("----------------------------------------------------");
        System.out.println("----------------------------------------------------");
        System.out.println("----------------------------------------------------");
        System.out.println("----------------------------------------------------");
        System.out.println(findUser);
        System.out.println("----------------------------------------------------");
        System.out.println("----------------------------------------------------");
        System.out.println("----------------------------------------------------");
        System.out.println("----------------------------------------------------");
        System.out.println("----------------------------------------------------");
        System.out.println("----------------------------------------------------");
        System.out.println("----------------------------------------------------");
        System.out.println("----------------------------------------------------");
        System.out.println("----------------------------------------------------");
        System.out.println("----------------------------------------------------");
    }

    /*@AfterReturning(value = "execution(* seb40_main_012.back.user.controller.UserController.emailConfirm(..)) && args(emailDto))", returning = "response")
    public void sendAuthCodeEmail(JoinPoint joinPoint, UserDto.EmailDto emailDto, String response) {
        String authCode = response;
        try {
            emailSenderService.sendAuthCode(emailDto.getEmail(), authCode);
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }
    }*/

}
