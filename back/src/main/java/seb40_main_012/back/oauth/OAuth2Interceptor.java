//package seb40_main_012.back.oauth;
//
//import lombok.Builder;
//import lombok.NoArgsConstructor;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.messaging.handler.HandlerMethod;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.web.servlet.HandlerInterceptor;
//import org.springframework.web.servlet.ModelAndView;
//import seb40_main_012.back.config.auth.repository.RefreshTokenRepository;
//
//import javax.servlet.annotation.WebFilter;
//import javax.servlet.http.Cookie;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.util.Arrays;
//import java.util.List;
//import java.util.UUID;
//import java.util.stream.Collectors;
//
//@Slf4j
//@Builder
//@Configuration
//@EnableWebSecurity(debug = true)
////@WebFilter(urlPatterns = "/oauth/kakao")
//public class OAuth2Interceptor implements HandlerInterceptor {
//
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        String requestURI = request.getRequestURI();
//        String uuid = UUID.randomUUID().toString();
//
//        request.setAttribute("LOG_ID", uuid);
//        log.info("Cherry_Pick OAuth Start");
//        log.info("REQUEST [{}][{}][{}]", uuid, requestURI, handler);
//        return true;
//    }
//
//    @Override
//    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
//
////        System.out.println("----------------------------------------------------");
////        System.out.println(response.getHeader("Date"));
////        System.out.println(response.getHeader("Authorization"));
////        System.out.println(response.getHeader("Set-Cookie"));
////        System.out.println(request.getHeader("Origin"));
////        System.out.println(request.getAttribute("LOG_ID"));
////        System.out.println("----------------------------------------------------");
//
//        Cookie[] cookies = request.getCookies(); // Request Cookies
//        String token = request.getHeader("Cookie"); // Cookie에서 뜯어온 토큰들
//        List<String> refreshToken;
//        String jwtToken = null;
//        String userEmail = null; // 토큰으로 검색한 유저 이메일
//
//        if (cookies != null) {
//            refreshToken = Arrays.stream(token.split("refreshToken=")) // Refresh Token 골라내기
//                    .filter(a -> a.startsWith("ey"))
//                    .collect(Collectors.toList());
//            if (refreshToken.size() != 0) { // 골라온 토큰중에 가장 최신 토큰 가져오기
//                jwtToken = refreshToken.get(refreshToken.size() - 1);
////                userEmail = refreshTokenRepository.findUserEmailByToken(jwtToken);
//
//                System.out.println("-----------------------------------------");
//                Arrays.stream(cookies).map(Cookie::getValue).forEach(System.out::println);
//                System.out.println(userEmail);
//                System.out.println("-----------------------------------------");
//
//            }
//        }
//
//        log.info("Cherry_Pick OAuth End");
//        log.info("pohstHandler [{}]", modelAndView);
//    }
//
//
//}
