package TeamBigDipper.UYouBooDan.global.security.filter;

import TeamBigDipper.UYouBooDan.global.security.dto.LoginDto;
import TeamBigDipper.UYouBooDan.global.security.jwt.JwtTokenizer;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;


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

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

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
        response.setHeader("Authentication", "Bearer " + accessToken);
        response.setHeader("RefreshToken", refreshToken);
        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }


    @SneakyThrows
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                              AuthenticationException failed) {

        super.unsuccessfulAuthentication(request, response, failed);
    }

}
