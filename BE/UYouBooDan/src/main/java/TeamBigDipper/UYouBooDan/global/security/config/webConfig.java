package TeamBigDipper.UYouBooDan.global.security.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class webConfig implements WebMvcConfigurer {

    /**
     * "http://localhost:3000" : 브라우저용 (www붙이면 CORS 발생)
     * "http://www.localhost:3000" : 카카오 리다이렉션용 (WWW 안붙이면 카카오에서 등록이 안됨)
     */
    @Override
    public void addCorsMappings (CorsRegistry registry) {

        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8080", "http://localhost:8090", "http://localhost:5173",
                        "http://localhost:63342", "http://www.localhost:3000", "http://localhost:3000")
                .allowedHeaders("*")
                .allowedMethods("GET", "POST", "PATCH", "DELETE")
                .maxAge(3600)
                .allowCredentials(true)
                .allowedHeaders("*")
                .allowedOriginPatterns()
                .exposedHeaders("*");
    }
}
