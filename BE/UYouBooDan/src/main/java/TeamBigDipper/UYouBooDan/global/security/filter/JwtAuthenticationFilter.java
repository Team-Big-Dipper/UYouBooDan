package TeamBigDipper.UYouBooDan.global.security.filter;

import TeamBigDipper.UYouBooDan.global.security.dto.LoginDto;
import TeamBigDipper.UYouBooDan.global.security.jwt.JwtTokenizer;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    private final RedisTemplate redisTemplate;


    /**
     * 로그인 시 이메일과 패스워드를 받아서 LoginDto로 변환하고, memberRepository를 조회해서 Authentication 확인해주는 메소드
     * @param request from which to extract parameters and perform the authentication
     * @param response the response, which may be needed if the implementation has to do a redirect as part of a multi-stage authentication process (such as OpenID).
     * @return
     */
    @Override
    @SneakyThrows
    public Authentication attemptAuthentication (HttpServletRequest request, HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper();

        LoginDto loginDto;

        try {
            loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken;
        // 게스트 로그인을 위한 부분
        if(loginDto.getEmail().equals("") && loginDto.getPassword().equals(""))
            usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken("asdf1234@gmail.com","asd123!@#asd123"); // configuration으로 관리하기(@Value 어노테이션으로 받아 올 수 없기 때문)
        else usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(usernamePasswordAuthenticationToken);

    }


    /**
     * 인증된 유저에게 HttpServlerResponse를 통해 AccessToken과 RefreshToken 전달해주기 위해 토큰 생성 후 담아주는 부분
     * @param authResult
     */
    @Override
    @SneakyThrows
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain filterChain, Authentication authResult) {

        Member authenticatedMember = (Member) authResult.getPrincipal();
        String accessToken = jwtTokenizer.delegateAccessToken(authenticatedMember);
        String refreshToken = jwtTokenizer.delegateRefreshToken(authenticatedMember);
        response.setHeader("Authorization", "Bearer " + accessToken);

        // refreshToken responseCookie builder 방식
        ResponseCookie cookie = ResponseCookie.from("refreshToken",refreshToken)
//                .maxAge(7*24*60*60)
                .path("/")
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();
        response.setHeader("Set_Cookie", cookie.toString());

        // 로그인시, Redis 캐시 서버에 Refresh 토큰을 저장하는 로직 ( key:value 형식의 set방식으로 저장되며, key는 RTkey+회원 식별자, value는 refreshToken으로 저장)
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set("RTKey"+authenticatedMember.getMemberId(), refreshToken);
        log.info("redis RT : {}", valueOperations.get("RTKey"+authenticatedMember.getMemberId()));

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }


    @SneakyThrows
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                              AuthenticationException failed) {

        super.unsuccessfulAuthentication(request, response, failed);
    }

}