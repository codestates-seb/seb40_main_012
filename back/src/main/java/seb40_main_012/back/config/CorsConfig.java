package seb40_main_012.back.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000",
                        "http://main-012-client.s3-website.ap-northeast-2.amazonaws.com")
                .allowedMethods("*")
                .exposedHeaders("Authorization")
                .allowCredentials(true)
                .maxAge(3000);
    }
}
