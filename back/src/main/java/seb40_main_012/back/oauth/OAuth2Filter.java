package seb40_main_012.back.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import seb40_main_012.back.config.SecurityConfiguration;
import seb40_main_012.back.config.auth.cookie.CookieManager;
import seb40_main_012.back.config.auth.filter.JwtAuthenticationFilter;
import seb40_main_012.back.config.auth.filter.JwtVerificationFilter;
import seb40_main_012.back.config.auth.handler.UserAuthenticationEntryPoint;
import seb40_main_012.back.config.auth.handler.UserAuthenticationFailureHandler;
import seb40_main_012.back.config.auth.handler.UserAuthenticationSuccessHandler;
import seb40_main_012.back.config.auth.jwt.JwtTokenizer;
import seb40_main_012.back.config.auth.utils.CustomAuthorityUtils;
import seb40_main_012.back.user.mapper.UserMapper;

import javax.servlet.annotation.WebFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@WebFilter(urlPatterns = "/oauth/*")
@RequiredArgsConstructor
//@EnableWebSecurity(debug = true)
//@EnableGlobalMethodSecurity(prePostEnabled = true)
public class OAuth2Filter {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final UserMapper userMapper;
    private final CookieManager cookieManager;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final Oauth2PrincipalUserService oauth2PrincipalUserService;

    @Bean
    public SecurityFilterChain oAuth2FilterChain(HttpSecurity http) throws Exception {

        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .antMatchers("/product/**", "/member/authenticate", "/auth/**", "/order/**").permitAll()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
//                .accessDeniedHandler(new UserAccessDeniedHandler())
                .and()
                .oauth2Login()
                .defaultSuccessUrl("/")
                .successHandler(oAuth2AuthenticationSuccessHandler)
                .userInfoEndpoint().userService(oauth2PrincipalUserService);

        return http.build();
    }

    // CORS 정책은 corsConfig에서 설정

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<SecurityConfiguration.CustomFilterConfigurer, HttpSecurity> {
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

