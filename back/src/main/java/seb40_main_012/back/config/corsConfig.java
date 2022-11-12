package seb40_main_012.back.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class corsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000",
                        "http://main-012-client.s3-website.ap-northeast-2.amazonaws.com")
                .allowedMethods("*")
//                .exposedHeaders(Arrays.asList("Autorization"))
                .allowCredentials(true)
                .maxAge(3000);
    }
}
