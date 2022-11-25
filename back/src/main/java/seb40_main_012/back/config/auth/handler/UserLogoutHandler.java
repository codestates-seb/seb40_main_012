package seb40_main_012.back.config.auth.handler;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Component;
import seb40_main_012.back.config.auth.cookie.CookieManager;
import seb40_main_012.back.config.auth.jwt.JwtTokenizer;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
public class UserLogoutHandler implements LogoutHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CookieManager cookieManager;

    @SneakyThrows
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response,
                       Authentication authentication) {
        String refreshToken = cookieManager.outCookie(request, "refreshToken");
        jwtTokenizer.removeRefreshToken(refreshToken);
        try {
            jwtTokenizer.verifySignature(refreshToken);
        } catch (ExpiredJwtException ee) {
            response.sendError(401, "Refresh Token이 만료되었습니다");
        }

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (int i = 0; i < cookies.length; i++) {
                cookies[i].setMaxAge(0); // 유효시간을 0으로 설정
                response.addCookie(cookies[i]);
            }
        }

        if(authentication != null)
            new SecurityContextLogoutHandler().logout(request, response, authentication);
    }
}
