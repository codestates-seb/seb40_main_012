package seb40_main_012.back.oauth.kakao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.config.auth.cookie.CookieManager;
import seb40_main_012.back.config.auth.dto.LoginDto;
import seb40_main_012.back.config.auth.jwt.JwtTokenizer;
import seb40_main_012.back.dto.SingleResponseDto;
import seb40_main_012.back.oauth.NaverService;
import seb40_main_012.back.oauth.userInfo.NaverUserInfo;
import seb40_main_012.back.oauth.userInfo.OAuth2UserInfo;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.mapper.UserMapper;
import seb40_main_012.back.user.repository.UserRepository;
import seb40_main_012.back.user.service.UserService;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Validated
@Transactional
@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class KakaoController {

    private final KakaoService kakaoService;
    private final NaverService naverService;
    private final UserMapper userMapper;
    private final UserService userService;
    private final UserRepository userRepository;
    private final CookieManager cookieManager;
    private final JwtTokenizer jwtTokenizer;


    @ResponseBody
    @GetMapping("/ka")
    public ResponseEntity<Object> kakaoCallback(@RequestParam("code") String code, HttpSession session, HttpServletResponse res) throws URISyntaxException, IOException {

        String access_Token = kakaoService.getAccessToken(code);

        HashMap<String, Object> userInfo = kakaoService.getUserInfo(access_Token); // 카카오 액세스 토큰에서 유저 정보 가져다 등록

//            클라이언트의 이메일이 존재하지 않을 때 세션에 해당 이메일과 토큰 등록
//        if (userInfo.get("email") != null) {
//            session.setAttribute("userId", userInfo.get("email"));
//            session.setAttribute("access_Token", access_Token);
//        }

        String email = userInfo.get("email").toString();

        if (userRepository.findByEmail(email).isEmpty()) { // DB에 해당 메일주소로 된 회원이 없을 경우

            kakaoService.createUser(userInfo); // 유저 생성 및 회원가입 처리
        }

        User findUser = userService.findUserByEmail(email); // DB에 해당 메일주소로 된 회원이 있을 경우

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

    @ResponseBody
    @GetMapping("/naver")
    public ResponseEntity<Object> naverCallback(@RequestParam("code") String code, HttpSession session, HttpServletResponse res) throws URISyntaxException, IOException {

        String access_Token = naverService.getAccessToken(code);

        HashMap<String, Object> userInfo = naverService.getUserInfo(access_Token); // 카카오 액세스 토큰에서 유저 정보 가져다 등록

        String email = userInfo.get("email").toString();

        if (userRepository.findByEmail(email).isEmpty()) { // DB에 해당 메일주소로 된 회원이 없을 경우

            naverService.createUser(userInfo); // 유저 생성 및 회원가입 처리
        }

        User findUser = userService.findUserByEmail(email); // DB에 해당 메일주소로 된 회원이 있을 경우

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

    // 통합 리팩토링 준비
    @GetMapping("/kakao")
    @ResponseBody
    public String oAuthCallBack(Authentication authentication, @AuthenticationPrincipal OAuth2User oAuth2UserPrincipal){

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        OAuth2UserInfo oAuth2UserInfo = new NaverUserInfo(oAuth2User.getAttributes());

        String email = oAuth2UserInfo.getEmail();

        System.out.println(attributes);
        System.out.println(email);
        // PrincipalOauth2UserService의 getAttributes내용과 같음

        Map<String, Object> attributes1 = oAuth2UserPrincipal.getAttributes();
        // attributes == attributes1

        if (userRepository.findByEmail(email).isEmpty()) { // DB에 해당 메일주소로 된 회원이 없을 경우

        }

        return attributes.toString();     //세션에 담긴 user 가져오기
    }
}
