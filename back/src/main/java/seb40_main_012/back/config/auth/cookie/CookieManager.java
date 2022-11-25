package seb40_main_012.back.config.auth.cookie;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.stream.Stream;

@Component
public class CookieManager {
    public ResponseCookie createCookie(String key, String value) {
        return ResponseCookie.from(key, value)
                .maxAge(24 * 60 * 60) // 하루 설정
                .path("/")
                .path("/")
                .secure(false)
                .sameSite("Lax")
                .httpOnly(true)
                .build();
    }

    public String outCookie(HttpServletRequest request, String key) {
        String[] cookies = request.getHeader("Cookie").split(";");
        Stream<String> stream = Arrays.stream(cookies)
                .map(cookie -> cookie.replace(" ", ""))
                .filter(c -> c.startsWith(key));
        String value = stream.reduce((first, second) -> second)
                .map(v -> v.replace(key + "=", ""))
                .orElse(null);

        return value;

        /*String[] cookies = request.getHeader("Cookie").split(";");
        String value = Arrays.stream(cookies)
                .map(cookie -> cookie.replace(" ", ""))
                .filter(c -> c.startsWith(key))
                .findFirst()
                .map(v -> v.replace(key + "=", ""))
                .orElse(null);

        return value;*/
    }
}
