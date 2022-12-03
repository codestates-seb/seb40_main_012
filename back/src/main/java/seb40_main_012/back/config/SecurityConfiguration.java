package seb40_main_012.back.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import seb40_main_012.back.config.auth.cookie.CookieManager;
import seb40_main_012.back.config.auth.filter.JwtAuthenticationFilter;
import seb40_main_012.back.config.auth.filter.JwtVerificationFilter;
import seb40_main_012.back.config.auth.handler.*;
import seb40_main_012.back.config.auth.jwt.JwtTokenizer;
//import seb40_main_012.back.config.auth.service.OAuth2UserServiceImpl;
import seb40_main_012.back.config.auth.utils.CustomAuthorityUtils;
import seb40_main_012.back.user.mapper.UserMapper;
//import seb40_main_012.back.user.repository.UserRepository;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity(debug = true)
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final UserMapper userMapper;
    private final CookieManager cookieManager;
//    private final OAuth2UserServiceImpl oAuth2UserService;
//    private final UserRepository userRepository;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
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
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll());
//                .oauth2Login(authorize -> { // OAuth2 반영 안함
//                    authorize.userInfoEndpoint().userService(oAuth2UserService);
//                    authorize.successHandler(new UserOAuth2SuccessHandler(jwtTokenizer, userRepository, cookieManager, userMapper));
//                });
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

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
