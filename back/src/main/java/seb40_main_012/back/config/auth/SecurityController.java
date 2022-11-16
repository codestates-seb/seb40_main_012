package seb40_main_012.back.config.auth;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.config.auth.jwt.JwtTokenizer;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class SecurityController {
    private final JwtTokenizer jwtTokenizer;
    private final UserService userService;

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            String refreshToken = outCookie(request);

            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
            String email = (String) jwtTokenizer.getClaims(refreshToken, base64EncodedSecretKey).getBody().get("sub");

            User findUser = userService.findUserByEmail(email);
            String accessToken = delegateAccessToken(findUser, base64EncodedSecretKey);

            response.setHeader("Authorization", "Bearer " + accessToken);
            response.setHeader("Set-Cookie", request.getHeader("Set-Cookie"));
        } catch (ExpiredJwtException ee) {
            response.sendError(401, "Refresh Token이 만료되었습니다");
        }

    }

    private String delegateAccessToken(User user, String base64EncodedSecretKey) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail());
        claims.put("roles", user.getRoles());

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String accessToken = jwtTokenizer.generateAccessToken(claims, user.getEmail(), expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String outCookie(HttpServletRequest request) {
        String[] cookies = request.getHeader("Set-Cookie").split(";");
        String refreshToken = Arrays.stream(cookies)
                .filter(cookie -> cookie.startsWith("refreshToken"))
                .findFirst()
                .map(cookieString -> cookieString.replace("refreshToken=", ""))
                .orElse(null);

        return refreshToken;
    }
}
