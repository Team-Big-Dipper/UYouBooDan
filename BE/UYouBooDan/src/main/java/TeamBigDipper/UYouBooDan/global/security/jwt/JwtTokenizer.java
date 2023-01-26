package TeamBigDipper.UYouBooDan.global.security.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Encoders;
import lombok.Getter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;

@Component
public class JwtTokenizer {

    /**
     * 시크릿 키를 발급받기 위해 시스템 변수로 설정해둔 값을 yml을 통해 받아오는 필드
     */
    @Getter @Value("${jwt.key.secret}")
    private String secretKey;

    @Getter @Value("${jwt.key.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter @Value("${jwt.key.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    /**
     * Base64를 이용해 SecretKey를 인코딩해주는 메서드
     * @param secretKey : 시스템 환경변수, AWS 환경변수 등을 받는 파라미터
     * @return String으로 인코딩된 값을 반환
     */
    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }


    /**
     * 액세스 토큰의 Payload + Signature 생성해주는 메소드
     *
     * JWT는 크게 Header + Payload + Signature 구조이며, Payload에 claims, subject, aud, expAt, issuedAt 등이 들어간다
     * @param claims : 사용자에 대한 프로퍼티나 속성정보 (
     * @param subject : 토큰 제목
     * @param expAt : 토큰 만료일자
     * @param base64EncodedSecretKey : secret key로 해싱해주는 부분
     * @return
     */
    public String createAccessToken(Map<String, Object> claims, String subject, Date expAt, String base64EncodedSecretKey) {
        Key key = getSecretKeyFromPlainSecretKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expAt)
                .signWith(key)
                .compact();
    }

    public String createRefreshToken(String subject, Date expAt, String base64EncodedSecretKey) {
        Key key = getSecretKeyFromPlainSecretKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expAt)
                .signWith(key)
                .compact();
    }



}
