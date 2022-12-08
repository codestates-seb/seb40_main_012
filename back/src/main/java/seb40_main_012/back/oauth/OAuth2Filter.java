//package seb40_main_012.back.oauth;
//
//import lombok.RequiredArgsConstructor;
//import org.junit.jupiter.api.Order;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import seb40_main_012.back.config.SecurityConfiguration;
//import seb40_main_012.back.config.auth.cookie.CookieManager;
//import seb40_main_012.back.config.auth.filter.JwtAuthenticationFilter;
//import seb40_main_012.back.config.auth.handler.UserAuthenticationEntryPoint;
//import seb40_main_012.back.config.auth.jwt.JwtTokenizer;
//import seb40_main_012.back.config.auth.utils.CustomAuthorityUtils;
//import seb40_main_012.back.user.mapper.UserMapper;
//
//import javax.servlet.annotation.WebFilter;
//
//import static org.springframework.security.config.Customizer.withDefaults;
//
////@Configuration
//@WebFilter(urlPatterns = "/*")
//@RequiredArgsConstructor
////@EnableWebSecurity(debug = true)
////@EnableGlobalMethodSecurity(prePostEnabled = true)
//public class OAuth2Filter {
//
//    private final JwtTokenizer jwtTokenizer;
//    private final CustomAuthorityUtils authorityUtils;
//    private final UserMapper userMapper;
//    private final CookieManager cookieManager;
//    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
//    private final Oauth2PrincipalUserService oauth2PrincipalUserService;
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
//                .userInfoEndpoint().userService(oauth2PrincipalUserService);
//
//        http
//                .addFilterBefore(JwtAuthenticationFilter.builder().build(), UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
//}
//
