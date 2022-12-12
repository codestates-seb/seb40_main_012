package seb40_main_012.back.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuth2UserService {

    public OAuth2UserDetails getOAuth2UserDetails(OAuth2AccessToken authentication)  {

        String accessToken = authentication.getAccessToken(); //PK 가져오기

        return OAuth2UserDetails.builder() //PK와 SocialType을 통해 회원 생성
                .accessToken(accessToken)
//                .roles(List.of("USER"))
                .build();
    }
}
