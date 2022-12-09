package seb40_main_012.back.oauth.kakao;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.web.reactive.function.client.WebClientAutoConfiguration;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import seb40_main_012.back.config.auth.cookie.CookieManager;
import seb40_main_012.back.config.auth.dto.LoginDto;
import seb40_main_012.back.config.auth.jwt.JwtTokenizer;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.mapper.UserMapper;
import seb40_main_012.back.user.repository.UserRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class KakaoAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final UserRepository userRepository;
    private final CookieManager cookieManager;
    private final UserMapper userMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        log.info("authentication.getPrincipal():" + oAuth2User);

        String registrationId = response.getHeader("registrationId");
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        log.info("oAuth2User email:" + email);

        User user = userRepository.findByEmail(email).orElse(null);
        String accessToken = jwtTokenizer.delegateAccessToken(user);
        response.setHeader("Authorization", "Bearer " + accessToken);

        // refresh Token을 헤더에 Set-Cookie 해주기
        String refreshToken = jwtTokenizer.delegateRefreshToken(user);
        jwtTokenizer.addRefreshToken(user.getEmail(), refreshToken);

        ResponseCookie cookie = cookieManager.createCookie("refreshToken", refreshToken);
        response.setHeader("Set-Cookie", cookie.toString());

        // 로그인 시 필요한 정보 담기
        LoginDto.ResponseDto responseDto = userMapper.userToLoginResponse(user);
        String json = new Gson().toJson(responseDto);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);

        // check
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("accessToken", "Bearer " + accessToken);
        queryParams.add("refreshToken", cookie.toString());
        queryParams.add("responseDto", json);

        String uri = createURI(queryParams).toString();

        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private URI createURI(MultiValueMap<String, String> queryParams) {
        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .path("/receive-token.html")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}

