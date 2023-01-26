package TeamBigDipper.UYouBooDan.global.security.jwt;

import TeamBigDipper.UYouBooDan.member.entity.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
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
     * 액세스 토큰을 생성하는 메소드. Payload + Signature를 전달받아 생성.
     * JWT는 크게 Header + Payload + Signature 구조이며, Payload에 claims, subject, aud, expAt, issuedAt 등이 들어간다
     * @param claims : 사용자에 대한 프로퍼티나 속성정보 (
     * @param subject : 토큰 제목
     * @param expAt : 토큰 만료일자
     * @param base64EncodedSecretKey : secret key로 해싱해주는 부분
     * @return accessKey
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


    /**
     * 리프레쉬 토큰을 생성하는 메소드. Payload + Signature값을 전달받아 생성.
     * @param subject
     * @param expAt
     * @param base64EncodedSecretKey
     * @return accessKey
     */
    public String createRefreshToken(String subject, Date expAt, String base64EncodedSecretKey) {
        Key key = getSecretKeyFromPlainSecretKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expAt)
                .signWith(key)
                .compact();
    }


    /**
     * 키 생성
     * @param base64EncodedSecretKey
     * @return Key
     */
    public Key getSecretKeyFromPlainSecretKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }


    /**
     * Jws와 키값을 받아 Claims을 파싱하는 메소드
     * @param jws
     * @param base64EncodedSecretKey
     * @return
     */
    public Jws<Claims> getClaims (String jws, String base64EncodedSecretKey) {
        Key key = getSecretKeyFromPlainSecretKey(base64EncodedSecretKey);

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }


    /**
     * 반환값 없이 단순 검증 용도
     * @param jws
     * @param base64EncodedSecretKey
     */
    public void verifySignature(String jws, String base64EncodedSecretKey) {
        Key key = getSecretKeyFromPlainSecretKey(base64EncodedSecretKey);
        Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jws);
    }


    /**
     * 액세스 토큰 형성을 위한 값을 관리하는 메소드
     * @param member
     * @return accessToken (값 지정 후, 액세스 토큰 생성 메소드 호출하여 값을 대입)
     */
    public String delegateAccessToken (Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail().getEmail());
//        claims.put("role", member.getRoles());   // 역할 부여 이후 활성화
        claims.put("id", member.getMemberId());
        String subject = String.valueOf(member.getMemberId()); // 토큰 제목
        Date expAt = getTokenExpiration(getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());

        return createAccessToken(claims, subject, expAt, base64EncodedSecretKey);
    }


    public String delegateRefreshToken (Member member) {
        String subject = String.valueOf(member.getMemberId());
        Date expAt = getTokenExpiration(getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());

        return createRefreshToken(subject, expAt, base64EncodedSecretKey);
    }


    /**
     * extAt(만료일자)를 생성해주는 메소드
     * @param expirationMinutes
     * @return expiration
     */
    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        return calendar.getTime();
    }
}
