//package seb40_main_012.back.oauth;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class OAuth2Config implements WebMvcConfigurer {
//
//
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new OAuth2Interceptor())
//                .order(1)
//                .addPathPatterns("/oauth/*")
//                .excludePathPatterns("/css/**", "/*.ico", "/error");
//    }
//
//}