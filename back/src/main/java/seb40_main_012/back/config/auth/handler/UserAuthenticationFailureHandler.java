package seb40_main_012.back.config.auth.handler;

import lombok.extern.slf4j.Slf4j;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import seb40_main_012.back.advice.ErrorResponse;
import seb40_main_012.back.config.auth.utils.ErrorResponder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class UserAuthenticationFailureHandler implements AuthenticationFailureHandler {
    // 로그인 인증 실패 시
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {
        log.error("# Authentication failed: {}", exception.getMessage());

        ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);
    }
}
