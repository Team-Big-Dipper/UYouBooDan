package TeamBigDipper.UYouBooDan.global.security.config;

import TeamBigDipper.UYouBooDan.global.security.filter.JwtAuthenticationFilter;
import TeamBigDipper.UYouBooDan.global.security.filter.JwtVerificationFilter;
import TeamBigDipper.UYouBooDan.global.security.handler.CustomAuthenticationFailureHandler;
import TeamBigDipper.UYouBooDan.global.security.handler.CustomAuthenticationSuccessHandler;
import TeamBigDipper.UYouBooDan.global.security.jwt.JwtTokenizer;
import TeamBigDipper.UYouBooDan.global.security.util.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@RequiredArgsConstructor
public class CustomFilterConfig extends AbstractHttpConfigurer<CustomFilterConfig, HttpSecurity> {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final RedisTemplate redisTemplate;


    @Override
    @SneakyThrows
    public void configure(HttpSecurity builder) {

        AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

        // 인증 처리 필터
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, redisTemplate);
        // 로그인을 위한 URL Path 설정하는 위치
        jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
        // 구현한 AuthenticationFilter 추가하는 위치
        jwtAuthenticationFilter.setAuthenticationSuccessHandler(new CustomAuthenticationSuccessHandler());
        jwtAuthenticationFilter.setAuthenticationFailureHandler(new CustomAuthenticationFailureHandler());

        // 검증 처리 필터
        JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, customAuthorityUtils); // ,redisTemplate); // 레디스 적용시 활성화 예정
        // 생성한 필터 객체 세팅 후, builder를 이용해 필터 병합
        builder.addFilter(jwtAuthenticationFilter).addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);

    }
}
