package seb40_main_012.back.config.auth;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.config.auth.entity.RefreshToken;
import seb40_main_012.back.config.auth.jwt.JwtTokenizer;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class SecurityController {
    private final JwtTokenizer jwtTokenizer;
    private final UserService userService;

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String refreshToken = jwtTokenizer.outCookie(request);
        try {
            jwtTokenizer.verifySignature(refreshToken);

            RefreshToken findRefreshToken = jwtTokenizer.getRefreshToken(refreshToken);
            if(findRefreshToken == null)
                response.sendError(401, "사용할 수 없는 Refresh Token입니다"); //

            User user = userService.findUserByEmail(findRefreshToken.getEmail());
            String accessToken = jwtTokenizer.delegateAccessToken(user);
            response.setHeader("Authorization", "Bearer " + accessToken);
            response.setHeader("Cookie", request.getHeader("Cookie"));
        } catch (ExpiredJwtException ee) {
            jwtTokenizer.removeRefreshToken(refreshToken);
            response.sendError(401, "Refresh Token이 만료되었습니다");
        }
    }
}
