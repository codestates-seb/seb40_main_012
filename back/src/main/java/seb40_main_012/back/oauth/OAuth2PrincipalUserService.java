package seb40_main_012.back.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.oauth.kakao.KakaoService;
import seb40_main_012.back.oauth.userInfo.KakaoUserInfo;
import seb40_main_012.back.oauth.userInfo.NaverUserInfo;
import seb40_main_012.back.oauth.userInfo.OAuth2UserInfo;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.repository.UserRepository;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class OAuth2PrincipalUserService extends DefaultOAuth2UserService {

    private final KakaoService kakaoService;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        OAuth2UserInfo oAuth2UserInfo = null;    //추가
        String provider = userRequest.getClientRegistration().getRegistrationId();

//        if(provider.equals("google")){
//            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
//        }
//        else
        if (provider.equals("naver")) {
            oAuth2UserInfo = new NaverUserInfo(oAuth2User.getAttributes());
        } else if(provider.equals("kakao")){	//추가
            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
        }

        String providerId = oAuth2UserInfo.getProviderId();
        String nickName = provider + "_" + providerId;

        String uuid = UUID.randomUUID().toString().substring(0, 6);
        String password = bCryptPasswordEncoder.encode("비밀번호" + uuid);

        String email = oAuth2UserInfo.getEmail();

        List<String> roles = List.of("USER");

        String picture = oAuth2UserInfo.getProfileImage();

        User findUser = userRepository.findByNickName(nickName);

        if (findUser == null) { //DB에 없는 사용자라면 회원가입처리
            findUser = User.builder()
                    .email(email)
                    .nickName(nickName)
                    .bookTemp(36.5)
                    .firstLogin(true)
                    .profileImage(picture)
                    .roles(roles)
                    .password(password)
                    .build();
            userRepository.save(findUser);
        }

        return new OAuth2PrincipalDetails(findUser, oAuth2UserInfo);
    }

    public OAuth2UserDetails getOAuth2UserDetails(OAuth2AccessToken authentication)  {

        String accessToken = authentication.getAccessToken();//PK 가져오기

        String userInfoToken = kakaoService.getAccessToken(accessToken);

        HashMap<String, Object> userInfo = kakaoService.getUserInfo(userInfoToken);

        return OAuth2UserDetails.builder() //PK와 SocialType을 통해 회원 생성
                .accessToken(accessToken)
                .email(userInfo.get("email").toString())
                .nickname(userInfo.get("nickname").toString())
                .thumbnail_image(userInfo.get("thumbnail_image").toString())
//                .roles(List.of("USER"))
                .build();
    }

}
