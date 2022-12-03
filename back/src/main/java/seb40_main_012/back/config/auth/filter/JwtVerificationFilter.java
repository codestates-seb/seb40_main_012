package seb40_main_012.back.config.auth.filter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import seb40_main_012.back.config.auth.cookie.CookieManager;
import seb40_main_012.back.config.auth.entity.RefreshToken;
import seb40_main_012.back.config.auth.jwt.JwtTokenizer;
import seb40_main_012.back.config.auth.utils.CustomAuthorityUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final CookieManager cookieManager;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = jwtTokenizer.verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) { // AccessToken 기간 만료
            request.setAttribute("exception", ee);
            response.sendError(401, "Access Token이 만료되었습니다");
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

//        // 쿠키 검사
//        if(request.getHeader("Cookie").contains("refreshToken")) {
//            String refreshToken = cookieManager.outCookie(request, "refreshToken");
//            try {
//                RefreshToken findRefreshToken = jwtTokenizer.getRefreshToken(refreshToken);
//                if(findRefreshToken == null)
//                    response.sendError(401, "사용할 수 없는 Refresh Token입니다");
//            } catch (ExpiredJwtException ee) {
//                jwtTokenizer.removeRefreshToken(refreshToken);
//                response.sendError(401, "Refresh Token이 만료되었습니다");
//            }
//
//            if(request.getHeader("Authorization") == null) // 쿠키가 유효한데 Authorization이 없는 경우
//                response.sendError(401, "Authorization이 없습니다");
//        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");
        return authorization == null || !authorization.startsWith("Bearer")
                || request.getRequestURI().equals("/api/token/refresh"); // 토큰 재발급일 경우 로직 건너뛰기

//        String authorization = request.getHeader("Authorization");
//
//        return ((authorization == null || !authorization.startsWith("Bearer"))
//                && !request.getHeader("Cookie").contains("refreshToken"))
//                || request.getRequestURI().equals("/api/token/refresh"); // 토큰 재발급일 경우 로직 건너뛰기
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String email = (String) claims.get("email");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
