//package seb40_main_012.back.oauth.google;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.*;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.context.request.RequestContextHolder;
//import org.springframework.web.context.request.ServletRequestAttributes;
//import seb40_main_012.back.config.auth.cookie.CookieManager;
//import seb40_main_012.back.config.auth.dto.LoginDto;
//import seb40_main_012.back.config.auth.jwt.JwtTokenizer;
//import seb40_main_012.back.dto.SingleResponseDto;
//import seb40_main_012.back.user.entity.User;
//import seb40_main_012.back.user.mapper.UserMapper;
//
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//import java.io.IOException;
//import java.util.HashMap;
//
//@Controller
//@RequiredArgsConstructor
//public class GoogleController {
//
//    private final GoogleService googleService;
//    private final JwtTokenizer jwtTokenizer;
//    private final CookieManager cookieManager;
//    private final UserMapper userMapper;
//
//    @GetMapping("/oauth/google")
//    public ResponseEntity googleCallback(@RequestParam("code") String code, HttpSession session) throws IOException {
//        System.out.println("CODE:"+code);
//
//        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
//        HttpServletResponse response = attributes.getResponse();
//
//        String googleAccessToken = googleService.getGoogleAccessToken(code);
//        HashMap<String, Object> userInfo = googleService.getUserInfo(googleAccessToken);
//
//        User user = googleService.saveOrUpdate(userInfo);
//
//        String accessToken = jwtTokenizer.delegateAccessToken(user);
//        response.setHeader("Authorization", "Bearer " + accessToken);
//
//        // refresh Token을 헤더에 Set-Cookie 해주기
//        String refreshToken = jwtTokenizer.delegateRefreshToken(user);
//        jwtTokenizer.addRefreshToken(user.getEmail(), refreshToken);
//
//        ResponseCookie cookie = cookieManager.createCookie("refreshToken", refreshToken);
//        response.setHeader("Set-Cookie", cookie.toString());
//
//        LoginDto.ResponseDto responseDto = userMapper.userToLoginResponse(user);
//
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(responseDto), HttpStatus.OK);
//    }
//}
