package seb40_main_012.back.oauth.kakao;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
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

        HttpServletRequest req = attr.getRequest(); // Http Request
        HttpServletResponse res = attr.getResponse(); // Http Response

        String access_Token = kakaoService.getAccessToken(code);
        HashMap<String, Object> userInfo = kakaoService.getUserInfo(access_Token);

        //    클라이언트의 이메일이 존재할 때 세션에 해당 이메일과 토큰 등록
        if (userInfo.get("email") != null) {
            session.setAttribute("userId", userInfo.get("email"));
            session.setAttribute("access_Token", access_Token);
        }

        String email = userInfo.get("email").toString();
        String picture = userInfo.get("thumbnail_image").toString();
        String nickName = userInfo.get("nickname").toString();
        String password = userInfo.get("nickname").toString() + access_Token;
        String encodedPass = passwordEncoder.encode(password);

        if (userRepository.findByEmail(email).isEmpty()) { // DB에 해당 메일주소로 된 회원이 없을 경우

            if (userRepository.findByNickName(nickName) == null) { // + 해당 닉네임을 가진 회원이 없는 경우

                User user = User.builder()
                        .email(email)
                        .nickName(nickName)
                        .bookTemp(36.5)
                        .firstLogin(true)
                        .profileImage(picture)
                        .roles(List.of("USER"))
                        .password(encodedPass)
                        .build();

                userRepository.save(user);

            } else if (userRepository.findByNickName(nickName) != null) { // 해당 닉네임을 가진 회원이 있는 경우

                User user = User.builder()
                        .email(email)
                        .nickName(nickName + LocalDateTime.now())
                        .bookTemp(36.5)
                        .firstLogin(true)
                        .profileImage(picture)
                        .password(encodedPass)
                        .build();

                userRepository.save(user);
            }

        } else if (userRepository.findByEmail(email).isPresent()) {

//            else throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);

            User findUser = userService.findUserByEmail(email);

            String accessToken = jwtTokenizer.delegateAccessToken(findUser);
            String refreshToken = jwtTokenizer.delegateRefreshToken(findUser);

            res.setHeader("Authorization", "Bearer " + accessToken);

            jwtTokenizer.addRefreshToken(findUser.getEmail(), refreshToken);

            // refresh Token을 헤더에 Set-Cookie 해주기
            ResponseCookie cookie = cookieManager.createCookie("refreshToken", refreshToken);
            res.setHeader("Set-Cookie", cookie.toString());

            LoginDto.ResponseDto responseDto = userMapper.userToLoginResponse(findUser);
            String json = new Gson().toJson(responseDto);
            res.setContentType("application/json");
            res.setCharacterEncoding("UTF-8");
//        res.getWriter().write(json);

            LoginDto.ResponseDto response = userMapper.userToLoginResponse(findUser);

            return new ResponseEntity<>(
                    new SingleResponseDto<>(response), HttpStatus.OK);

        }
//        else throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);

        User findUser = userService.findUserByEmail(email);

        String accessToken = jwtTokenizer.delegateAccessToken(findUser);
        String refreshToken = jwtTokenizer.delegateRefreshToken(findUser);

        res.setHeader("Authorization", "Bearer " + accessToken);

        jwtTokenizer.addRefreshToken(findUser.getEmail(), refreshToken);

        // refresh Token을 헤더에 Set-Cookie 해주기
        ResponseCookie cookie = cookieManager.createCookie("refreshToken", refreshToken);
        res.setHeader("Set-Cookie", cookie.toString());

        LoginDto.ResponseDto responseDto = userMapper.userToLoginResponse(findUser);
        String json = new Gson().toJson(responseDto);
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
//        res.getWriter().write(json);

        LoginDto.ResponseDto response = userMapper.userToLoginResponse(findUser);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }
}
