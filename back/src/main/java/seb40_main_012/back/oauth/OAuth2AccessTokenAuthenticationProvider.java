package seb40_main_012.back.oauth;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import seb40_main_012.back.oauth.kakao.KakaoService;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.repository.UserRepository;

import java.util.HashMap;
import java.util.List;

@Component
@RequiredArgsConstructor
public class OAuth2AccessTokenAuthenticationProvider implements AuthenticationProvider {

    private final OAuth2PrincipalUserService oAuth2PrincipalUserService;  //restTemplate를 통해서 AccessToken을 가지고 회원의 정보를 가져오는 역할을 한다.
    private final UserRepository userRepository;//받아온 정보를 통해 DB에서 회원을 조회하는 역할을 한다.
    private final KakaoService kakaoService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    @SneakyThrows
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {//ProviderManager가 호출한다. 인증을 처리한다

        OAuth2UserDetails oAuth2UserDetails = oAuth2PrincipalUserService.getOAuth2UserDetails((OAuth2AccessToken) authentication); // 카카오 토큰으로 유저정보 얻어오기

        //OAuth2UserDetails는  UserDetails를 상속받아 구현한 클래스이다. 이후 일반 회원가입 시 UserDetails를 사용하는 부분과의 다형성을 위해 이렇게 구현하였다.
        //getOAuth2UserDetails에서는 restTemplate과 AccessToken을 가지고 회원정보를 조회해온다 (식별자 값을 가져옴)

//        String oAuth2AccessToken = oAuth2UserDetails.getAccessToken();
//        String accessToken = kakaoService.getAccessToken(oAuth2AccessToken);
//        HashMap<String, Object> userInfo = kakaoService.getUserInfo(accessToken);

        createOrReturnUser(oAuth2UserDetails); // 회원 조회 후 있으면 그대로 리턴, 없으면 회원가입 처리

//        Authentication authentication1 = OAuth2AccessToken.builder().principal(oAuth2UserDetails).authorities(oAuth2UserDetails.getAuthorities()).build();

        return OAuth2AccessToken.builder().principal(oAuth2UserDetails).authorities(oAuth2UserDetails.getAuthorities()).build();
        //AccessTokenSocialTypeToken객체를 반환한다. principal은 OAuth2UserDetails객체이다. (formLogin에서는 UserDetails를 가져와서 결국 ContextHolder에 저장하기 때문에)
        //이렇게 구현하면 UserDetails 타입으로 회원의 정보를 어디서든 조회할 수 있다.
    }

    private User createOrReturnUser(OAuth2UserDetails oAuth2UserDetails) {

        String email = oAuth2UserDetails.getUsername();
        String picture = oAuth2UserDetails.getEmail();
        String nickName = oAuth2UserDetails.getNickname();
        String encodedPass = bCryptPasswordEncoder.encode(oAuth2UserDetails.getNickname());

        return userRepository.findByEmail(email)  // 회원이 존재하면 그대로 리턴

                .orElseGet(
                        () -> userRepository.save(User.builder()
                                .email(email)
                                .nickName(nickName)
                                .bookTemp(36.5)
                                .firstLogin(true)
                                .profileImage(picture)
                                .roles(List.of("USER"))
                                .password(encodedPass)
                                .build())); // 없으면 회원가입처리
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return OAuth2AccessToken.class.isAssignableFrom(authentication); //AccessTokenSocialTypeToken타입의  authentication 객체이면 해당 Provider가 처리한다.
    }
}
