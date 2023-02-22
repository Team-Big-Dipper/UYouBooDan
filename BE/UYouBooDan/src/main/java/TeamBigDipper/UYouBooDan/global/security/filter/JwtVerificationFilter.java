package TeamBigDipper.UYouBooDan.global.security.filter;

import TeamBigDipper.UYouBooDan.global.security.jwt.JwtTokenizer;
import TeamBigDipper.UYouBooDan.global.security.util.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;


    @Override
    @SneakyThrows
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) {
        try {
            Map<String, Object> claims = verifyJwt(request); // 토큰 검증
            setSecurityContext(claims);

            // JwtExctractUtil을 사용하지 않을 경우, 인가 권한 검증을 위한 로직이 들어가야 할 부분.(with Redis)

            filterChain.doFilter(request, response);

        } catch (ExpiredJwtException ee) {
            request.setAttribute("Exception", ee);
        } catch (SignatureException se) {
            request.setAttribute("Exception", se);
        } catch (RuntimeException re) {
            request.setAttribute("Exception", re);
        }

        filterChain.doFilter(request, response);
    }


    @Override
    @SneakyThrows
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");

        return authorization == null || authorization.startsWith("Bearer");
    }


    /**
     * JWT 파싱단계
     * @param request
     * @return
     */
    private Map<String, Object> verifyJwt(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", ""); // JWT의 헤더를 떼냄
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());  // 파싱을 위한 secretKey생성

        return jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();  // Claims의 바디 부분을 파싱해서 받아옴. Map<String, Object> claims 형태
    }


    /**
     * 인증된 유저와 역할을 SecurituContextHolder에 넣어주는 메소드
     * @param claims
     */
    private void setSecurityContext(Map<String, Object> claims) {
        String username = claims.get("username").toString();
        List<GrantedAuthority> authorityList = customAuthorityUtils.createAuthorities((List) claims.get("roles"));

        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorityList);
        SecurityContextHolder.getContext().setAuthentication(authentication); // SecurityContextHolder에 인증정보(Context) 업데이트해줌
    }

}
