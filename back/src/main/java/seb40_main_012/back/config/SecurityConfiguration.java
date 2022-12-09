package seb40_main_012.back.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import seb40_main_012.back.config.auth.cookie.CookieManager;
import seb40_main_012.back.config.auth.filter.JwtAuthenticationFilter;
import seb40_main_012.back.config.auth.filter.JwtVerificationFilter;
import seb40_main_012.back.config.auth.handler.*;
import seb40_main_012.back.config.auth.jwt.JwtTokenizer;
import seb40_main_012.back.config.auth.utils.CustomAuthorityUtils;
import seb40_main_012.back.oauth.OAuth2AuthenticationSuccessHandler;
import seb40_main_012.back.oauth.OAuth2PrincipalUserService;
import seb40_main_012.back.oauth.kakao.KakaoAuthenticationSuccessHandler;
import seb40_main_012.back.user.mapper.UserMapper;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity(debug = true)
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final UserMapper userMapper;
    private final CookieManager cookieManager;
    private final OAuth2PrincipalUserService oAuth2PrincipalUserService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> {
//            web.ignoring().antMatchers("/oauth/**");
//        };
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

//                .and()
//                .oauth2Login(authorize -> {
//                    authorize.loginPage("/login").defaultSuccessUrl("/");
//                    authorize.userInfoEndpoint().userService(oAuth2PrincipalUserService); // OAuth 성공 후처리
//                })

                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
                .accessDeniedHandler(new UserAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .logout()
                .logoutUrl("/api/logout")
                .addLogoutHandler(new UserLogoutHandler(jwtTokenizer, cookieManager))
                .logoutSuccessHandler(new UserLogoutSuccessHandler())
                .deleteCookies("refreshToken")
                .deleteCookies("visit_cookie")
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll())
//                .and()//추가
//                .addFilterBefore(new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, userMapper, cookieManager),
//                        UsernamePasswordAuthenticationFilter.class)
                .oauth2Login() // OAuth2기반의 로그인인 경우
                .loginPage("/kakao")
//                .successHandler(oAuth2AuthenticationSuccessHandler)
                // 인증이 필요한 URL에 접근하면 /loginForm으로 이동
                .userInfoEndpoint(userInfo -> userInfo			// 로그인 성공 후 사용자정보를 가져온다
                .userService(oAuth2PrincipalUserService))
                ;
//                .oauth2Login(authorize -> { // OAuth2 반영 안함
//                    authorize.userInfoEndpoint().userService(oAuth2UserService);
//                    authorize.successHandler(new UserOAuth2SuccessHandler(jwtTokenizer, userRepository, cookieManager, userMapper));
//                });
        return http.build();
    }

//    @Bean
//    public BCryptPasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }

    // CORS 정책은 corsConfig에서 설정

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter =
                    new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, userMapper, cookieManager);
            jwtAuthenticationFilter.setFilterProcessesUrl("/api/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
