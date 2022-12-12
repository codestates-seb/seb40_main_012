package seb40_main_012.back.oauth;

import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class OAuth2AuthenticationFilter extends AbstractAuthenticationProcessingFilter {

//    public OAuth2AuthenticationFilter() {
//        super(new AntPathRequestMatcher("/oauth/kakao", "GET"));
//    }

    public OAuth2AuthenticationFilter(OAuth2AccessTokenAuthenticationProvider oAuth2AccessTokenAuthenticationProvider,   //Provider를 등록해주었다. 이는 조금 이따 설명하겠다.
                                                 OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler,  //로그인 성공 시 처리할  handler이다
                                      OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler) { //로그인 실패 시 처리할 handler이다.

        super(new AntPathRequestMatcher("/oauth/*", "GET"));   // 위에서 설정한  /oauth2/login/* 의 요청에, GET으로 온 요청을 처리하기 위해 설정한다.

        this.setAuthenticationManager(new ProviderManager(oAuth2AccessTokenAuthenticationProvider));
        //AbstractAuthenticationProcessingFilter를 커스터마이징 하려면  ProviderManager를 꼭 지정해 주어야 한다(안그러면 예외남!!!)

        this.setAuthenticationSuccessHandler(oAuth2AuthenticationSuccessHandler);
        this.setAuthenticationFailureHandler(oAuth2AuthenticationFailureHandler);

    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {

        String accessToken = request.getParameter("code");

        return this.getAuthenticationManager().authenticate(new OAuth2AccessToken(accessToken));
    }
}
