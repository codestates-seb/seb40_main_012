package seb40_main_012.back.config.auth.handler;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Component;
import seb40_main_012.back.config.auth.jwt.JwtTokenizer;
import seb40_main_012.back.user.entity.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class UserLogoutHandler implements LogoutHandler {
    private final JwtTokenizer jwtTokenizer;

    @SneakyThrows
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response,
                       Authentication authentication) {
        String refreshToken = jwtTokenizer.outCookie(request);
        jwtTokenizer.removeRefreshToken(refreshToken);
        try {
            jwtTokenizer.verifySignature(refreshToken);
        } catch (ExpiredJwtException ee) {
            response.sendError(401, "Refresh Token이 만료되었습니다");
        }

        if(authentication != null)
            new SecurityContextLogoutHandler().logout(request, response, authentication);
    }
}
