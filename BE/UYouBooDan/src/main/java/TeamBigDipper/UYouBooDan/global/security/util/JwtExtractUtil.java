package TeamBigDipper.UYouBooDan.global.security.util;

import TeamBigDipper.UYouBooDan.global.exception.dto.BusinessLogicException;
import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import TeamBigDipper.UYouBooDan.global.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RequiredArgsConstructor @Component
public class JwtExtractUtil {

    private final JwtTokenizer jwtTokenizer;

    public Long extractMemberIdFromJwt (HttpServletRequest request) {
        try {
            String jws = request.getHeader("Authorization").replace("Bearer ", "");
            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
            Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
            Object value = claims.get("memberId");

            if( value == null ) return extractById(claims);

            Long memberId = Long.valueOf(String.valueOf(value));

            return memberId;
        }
        catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.LOGIN_REQUIRED);
        }
    }

    public String extractEmailFromJwt (HttpServletRequest request) {
        try {
            String jws = request.getHeader("Authorization").replace("Bearer ", "");
            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
            Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
            Object value = claims.get("email");

            if ( value == null ) return extractByUsername(claims);

            String email = String.valueOf(String.valueOf(value));

            return email;
        }
        catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.LOGIN_REQUIRED);
        }
    }


    private Long extractById (Map<String, Object> claims) {
        try {
            Object value = claims.get("id");
            Long memberId = Long.valueOf(String.valueOf(value));
            return memberId;
        }
        catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.LOGIN_REQUIRED);
        }
    }


    private String extractByUsername (Map<String, Object> claims) {
        try {
            Object value = claims.get("username");
            String email = String.valueOf(String.valueOf(value));
            return email;
        }
        catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.LOGIN_REQUIRED);
        }
    }
}

