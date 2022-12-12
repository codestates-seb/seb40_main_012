package seb40_main_012.back.oauth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import seb40_main_012.back.config.auth.utils.ErrorResponder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class OAuth2AuthenticationFailureHandler implements AuthenticationFailureHandler {
    // 로그인 인증 실패 시
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {
        log.error("# Authentication failed: {}", exception.getMessage());

        ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);
    }
}