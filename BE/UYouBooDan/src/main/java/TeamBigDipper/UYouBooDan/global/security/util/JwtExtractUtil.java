package TeamBigDipper.UYouBooDan.global.security.util;

import TeamBigDipper.UYouBooDan.global.exception.dto.BusinessLogicException;
import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import TeamBigDipper.UYouBooDan.global.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;


/**
 * Header로 입력받은 Jwt의 Payloads 내 Claims를 파싱하여 Claims에 담겨있는 memberId(식별자) 혹은 email을 추출하는 유틸
 * 각 도메인 내 메소드에서 로그인 한 유저정보로 검증이 필요할 경우 DI를 통해 호출해서 사용할 수 있습니다.
 * feat. memberId, email은 JwtTokenizer를 통해 JWT 생성 시 Claims에 넣어주었기에 있습니다. 만약 JWT를 생성할 때 담아주지 않는다면 사용불가능 합니다.
 * 반대로, JWT 생성 당시 더 많은 정보를 넣어준다면, 해당 정보도 추출해 낼 수 있습니다.
 * feat. 필요시, payloads에 있는 subject로부터 파싱해서 정보를 추출하는 메소드도 구현 가능합니다.
 */
@RequiredArgsConstructor @Component
public class JwtExtractUtil {

    private final JwtTokenizer jwtTokenizer;

    /**
     * memberId(Entity 식별자)를 얻는 파싱 메소드
      * @param request HttpServlet에 담겨오는 HttpHeader를 받기위함
     * @return 회원 식별자
     */
    public Long extractMemberIdFromJwt (HttpServletRequest request) {

        try {
            String jws = request.getHeader("Authorization").replace("Bearer ", "");
            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
            Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
            Object value = claims.get("memberId");
//            if( value == null ) return extractById(claims); // 만약 다른 테이블에 존재하는 Id값에 대한 조회 케이스가 필요한 경우 활성화
            return Long.valueOf(String.valueOf(value));
        }

        catch (Exception e) { throw new BusinessLogicException(ExceptionCode.LOGIN_REQUIRED); }
    }


    /**
     * memberEmail을 얻는 파싱 메소드
     * @param request 위와 동일합니다.
     * @return email
     */
    public String extractEmailFromJwt (HttpServletRequest request) {
        try {
            String jws = request.getHeader("Authorization").replace("Bearer ", "");
            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
            Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
            Object value = claims.get("email");
//            if ( value == null ) return extractByUsername(claims); // 만약 다른 테이블에 존재하는 email값에 대한 조회 케이스가 필요한 경우 활성화
            return String.valueOf(String.valueOf(value));
        }

        catch (Exception e) { throw new BusinessLogicException(ExceptionCode.LOGIN_REQUIRED); }
    }


    /**
     * extractMemberIdFromJwt 내 로직에서 사용
     * 만약 Claims 안에 담겨있는 Id의 키값이 memberId가 아닌 경우. 즉, member테이블이 아닌 다른 테이블에 존재하는 객체를 조회하길 원하는 경우에 적용
     * @param claims
     * @return memberId (여기서 member는 실제 테이블에서 member는 아니다.
     */
    private Long extractById (Map<String, Object> claims) {
        try {
            Object value = claims.get("id");
            Long memberId = Long.valueOf(String.valueOf(value));
            return memberId;
        }
        catch (Exception e) { throw new BusinessLogicException(ExceptionCode.LOGIN_REQUIRED); }
    }


    /**
     * extractEmailFromJwt 내 로직에서 사용
     * 만약 Claims 안에 담겨있는 email의 키값이 member의 email이 아닌 경우. 즉, member 테이블이 아닌 다른 테이블에 존재하는 객체를 조회하길 원하는 경우에 적용
     * @param claims
     * @return email
     */
    private String extractByUsername (Map<String, Object> claims) {
        try {
            Object value = claims.get("username");
            String email = String.valueOf(String.valueOf(value));
            return email;
        }
        catch (Exception e) { throw new BusinessLogicException(ExceptionCode.LOGIN_REQUIRED); }
    }
}

