//package seb40_main_012.back.oauth;
//
//import com.nimbusds.jwt.JWT;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.web.context.request.RequestContextHolder;
//import org.springframework.web.context.request.ServletRequestAttributes;
//import seb40_main_012.back.config.auth.filter.JwtAuthenticationFilter;
//import seb40_main_012.back.config.auth.handler.UserAuthenticationEntryPoint;
//import seb40_main_012.back.config.auth.repository.RefreshTokenRepository;
//
//import javax.servlet.*;
//import javax.servlet.annotation.WebFilter;
//import javax.servlet.http.Cookie;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.util.Arrays;
//import java.util.List;
//import java.util.regex.Pattern;
//import java.util.stream.Collectors;
//
//import static org.springframework.security.config.Customizer.withDefaults;
//
//@Slf4j
//@Configuration
//@RequiredArgsConstructor
//@EnableWebSecurity(debug = true)
//@WebFilter(urlPatterns = "/oauth/kakao")
//public class OAuth2FilterTest implements Filter {
//
//    private final RefreshTokenRepository refreshTokenRepository;
//    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
//    private final Oauth2PrincipalUserService oauth2PrincipalUserService;
//
//    public void init(FilterConfig filterConfig) throws ServletException {
//        log.info("Init OAuth2 Filter");
//    }
//
//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
//
//        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
//        HttpServletRequest req = attr.getRequest(); // Http Request
//        HttpServletResponse res = attr.getResponse();
//
//        String jwtToken = getJwtToken(req);
//
//        System.out.println("----------------------------------------------------");
//        System.out.println(request.getParameter("host"));
//        System.out.println(req.getHeader("host"));
//        System.out.println(response.getBufferSize());
//        System.out.println(res.getHeader("Date"));
//        System.out.println("----------------------------------------------------");
//
//        if (jwtToken != null) {
//
//        }
//
//        log.info("##### filter - before #####");
//        chain.doFilter(request, response);
//        log.info("##### filter - after #####");
//    }
//
//    @Bean
//    public SecurityFilterChain oAuth2FilterChain(HttpSecurity http) throws Exception {
//
//        http
//                .headers().frameOptions().sameOrigin()
//                .and()
//                .csrf().disable()
//                .cors(withDefaults())
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .formLogin().disable()
//                .httpBasic().disable()
//                .authorizeRequests()
//                .antMatchers(HttpMethod.OPTIONS).permitAll()
//                .antMatchers("/product/**", "/member/authenticate", "/oauth/**", "/order/**").permitAll()
//                .and()
//                .exceptionHandling()
//                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
////                .accessDeniedHandler(new UserAccessDeniedHandler())
//                .and()
//                .oauth2Login()
////                .defaultSuccessUrl("/")
//                .successHandler(oAuth2AuthenticationSuccessHandler)
//                .userInfoEndpoint()
//                .userService(oauth2PrincipalUserService);
//
//        http
//                .addFilterBefore(JwtAuthenticationFilter.builder().build(), UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
//
//    private String getJwtToken(HttpServletRequest request) {
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
//                userEmail = refreshTokenRepository.findUserEmailByToken(jwtToken);
//
//                System.out.println("-----------------------------------------");
//                Arrays.stream(cookies).map(Cookie::getValue).forEach(System.out::println);
//                System.out.println(userEmail);
//                System.out.println("-----------------------------------------");
//
//            }
//        }
//
//        return jwtToken;
//    }
//
//    @Override
//    public void destroy() {
//        log.info("destroy XSSFilter");
//    }
//}
