package seb40_main_012.back.oauth.kakao;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.config.auth.cookie.CookieManager;
import seb40_main_012.back.config.auth.dto.LoginDto;
import seb40_main_012.back.config.auth.jwt.JwtTokenizer;
import seb40_main_012.back.dto.SingleResponseDto;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.mapper.UserMapper;
import seb40_main_012.back.user.repository.UserRepository;
import seb40_main_012.back.user.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Slf4j
@Validated
@Transactional
@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class KakaoController {

    private final KakaoService kakaoService;
    private final UserMapper userMapper;
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final KakaoAuthenticationSuccessHandler kakaoAuthenticationSuccessHandler;
    private final CookieManager cookieManager;
    private final JwtTokenizer jwtTokenizer;

    @ResponseBody
    @GetMapping("/kakao")
    public ResponseEntity<Object> kakaoCallback(@RequestParam("code") String code, HttpSession session) throws URISyntaxException, IOException {

        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletResponse res = attr.getResponse(); // Http Response

        String access_Token = kakaoService.getAccessToken(code);

        HashMap<String, Object> userInfo = kakaoService.getUserInfo(access_Token); // 카카오 액세스 토큰에서 유저 정보 가져다 등록

        //    클라이언트의 이메일이 존재할 때 세션에 해당 이메일과 토큰 등록
        if (userInfo.get("email") != null) {
            session.setAttribute("userId", userInfo.get("email"));
            session.setAttribute("access_Token", access_Token);
        }

        String email = userInfo.get("email").toString();

        if (userRepository.findByEmail(email).isEmpty()) { // DB에 해당 메일주소로 된 회원이 없을 경우

            User user = kakaoService.createUser(userInfo);
        }

        User findUser = userService.findUserByEmail(email);

        String accessToken = jwtTokenizer.delegateAccessToken(findUser);
        String refreshToken = jwtTokenizer.delegateRefreshToken(findUser);
        jwtTokenizer.addRefreshToken(findUser.getEmail(), refreshToken);

        ResponseCookie cookie = cookieManager.createCookie("refreshToken", refreshToken);
        res.setHeader("Authorization", "Bearer " + accessToken);
        res.setHeader("Set-Cookie", cookie.toString()); // refresh Token을 헤더에 Set-Cookie 해주기

        LoginDto.ResponseDto response = userMapper.userToLoginResponse(findUser);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }
}
