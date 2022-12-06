package seb40_main_012.back.oauth.kakao;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.config.auth.service.OAuth2UserServiceImpl;
import seb40_main_012.back.dto.SingleResponseDto;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.repository.UserRepository;
import seb40_main_012.back.user.service.UserService;

import javax.servlet.http.HttpSession;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.HashMap;

@Validated
@Transactional
@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class KakaoController {

    private final KakaoService kakaoService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @ResponseBody
    @GetMapping("/kakao")
    public ResponseEntity<Object> kakaoCallback(@RequestParam("code") String code, HttpSession session) throws URISyntaxException {

        String access_Token = kakaoService.getAccessToken(code);
        HashMap<String, Object> userInfo = kakaoService.getUserInfo(access_Token);
        System.out.println("login Controller : " + userInfo);

        //    클라이언트의 이메일이 존재할 때 세션에 해당 이메일과 토큰 등록
        if (userInfo.get("email") != null) {
            session.setAttribute("userId", userInfo.get("email"));
            session.setAttribute("access_Token", access_Token);
        }

        String email = userInfo.get("email").toString();
//        String picture = userInfo.get("profile_image").toString();
        String nickName = userInfo.get("nickname").toString();
        String password = userInfo.get("nickname").toString() + access_Token;
        String encodedPass = passwordEncoder.encode(password);

        System.out.println("------------------------------------------");
        System.out.println(email);
//        System.out.println(picture);
        System.out.println(nickName);
        System.out.println(password);
        System.out.println(encodedPass);
        System.out.println("------------------------------------------");

        if (userRepository.findByEmail(email).isEmpty()) { // DB에 해당 메일주소로 된 회원이 없을 경우

            if (userRepository.findByNickName(nickName) == null) { // + 해당 닉네임을 가진 회원이 없는 경우

                User user = User.builder()
                        .email(email)
                        .nickName(nickName)
//                        .profileImage(picture)
                        .password(encodedPass)
                        .build();

                userRepository.save(user);

            } else if (userRepository.findByNickName(nickName) != null) { // 해당 닉네임을 가진 회원이 있는 경우

                User user = User.builder()
                        .email(email)
                        .nickName(nickName + LocalDateTime.now())
//                        .profileImage(picture)
                        .password(encodedPass)
                        .build();

                userRepository.save(user);
            }

        } else throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);


//        URI redirectUri = new URI("http://www.naver.com");
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setLocation(redirectUri);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setLocation(URI.create("https://cherry-pick.co.kr"));
//
//        return new ResponseEntity<>(headers, HttpStatus.OK);

        return new ResponseEntity<>(
                new SingleResponseDto<>("SignIn Success"), HttpStatus.OK);

//        try {
//            return new ResponseEntity<>(
//                    new SingleResponseDto<>(kakaoService.getAccessToken(code)), HttpStatus.OK);
//        } catch (BusinessLogicException e) {
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
    }

}
