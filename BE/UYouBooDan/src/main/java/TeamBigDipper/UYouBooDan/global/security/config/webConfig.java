package TeamBigDipper.UYouBooDan.global.security.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class webConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings (CorsRegistry registry) {

        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8080", "http://localhost:8090", "http://localhost:5173",
                        "http://localhost:63342")
                .allowedHeaders("*")
                .allowedMethods("GET", "POST", "PATCH", "DELETE")
                .maxAge(3600)
                .allowCredentials(true)
                .allowedHeaders("*")
//                .allowedOriginPatterns()
                .exposedHeaders("*");
    }
}
