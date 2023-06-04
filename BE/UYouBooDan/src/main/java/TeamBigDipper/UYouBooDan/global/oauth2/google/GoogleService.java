package TeamBigDipper.UYouBooDan.global.oauth2.google;

import TeamBigDipper.UYouBooDan.global.security.jwt.JwtTokenizer;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.member.service.MemberService;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;

@Service
@RequiredArgsConstructor
public class GoogleService {

    @Getter
    @Value("${oauth.google.clientId}")
    private String googleClientId;
    @Getter
    @Value("${oauth.google.clientSecret}")
    private String googleClientSecret;
    @Getter
    @Value("${oauth.google.redirectUrl}")
    private String googleRedirectUrl;
    @Value("${oauth.google.scope}")
    private String scopes;
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;
    private final RedisTemplate redisTemplate;


    public String createGoogleURL () {
        StringBuffer url = new StringBuffer();
        url.append("https://accounts.google.com/o/oauth2/v2/auth?");
        url.append("client_id=" + getGoogleClientId());
        url.append("&redirect_uri=" + getGoogleRedirectUrl());
        url.append("&response_type=code");
        url.append("&scope="+ getScopeUrl());

        return url.toString();
    }

    /**
     * scope 설정용 get 메소드
     * @return scopes
     */
    private String getScopeUrl() {
        return scopes.replaceAll(",", "%20");
    }

    public void loginGoogle (String code, HttpServletResponse response) {

        // Http 통신을 위한 RestTemplate 활용
        RestTemplate restTemplate = new RestTemplate();
        GoogleLoginReqVo request = GoogleLoginReqVo.builder()
                .clientId(getGoogleClientId())
                .clientSecret(getGoogleClientSecret())
                .code(code)
                .redirectUri(getGoogleRedirectUrl())
                .grantType("authorization_code")
                .build();

        // try ~ catch 문을 통해 성공했을 경우 값을 전달받기위한 엔티티 클래스
        ResponseEntity<GoogleLoginDto> userDetailsResponse = null;
        // try ~ catch 문을 통해 성공했을 경우 토큰을 전달받기위 DTO 클래스
        ResponseEntity<String> oauthTokenResponse;
        // try ~ catch 문을 통해 성공했을 경우 로그인 Response를 전달받기 위한 VO
        GoogleLoginResVo loginResponse = null;
        // try ~ catch 문을 통해 성공했을 경우 값을 전달받기위 DTO 클래스
        GoogleLoginDto googleProfile;

        // 구글로 토큰 발급 및 계정정보 요청
        try {
            // Http Header 설정
            HttpHeaders headers  = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<GoogleLoginReqVo> googleTokenRequest = new HttpEntity<>(request, headers);

            // fetching for token
//            oauthTokenResponse = restTemplate.postForEntity("https://oauth2.googleapis.com" + "/token", googleTokenRequest, String.class); // legacy 코드
            oauthTokenResponse = restTemplate.exchange(
                    "https://oauth2.googleapis.com" + "/token",
                    HttpMethod.POST,
                    googleTokenRequest,
                    String.class
            );

            // Google token converting process
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
            objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL); // NULL이 아닌 값만 응답 받기
            loginResponse = objectMapper.readValue(oauthTokenResponse.getBody(), new TypeReference<>() {});

            String jwtToken = loginResponse.getIdToken();
            String requestUrl = UriComponentsBuilder.fromHttpUrl("https://oauth2.googleapis.com/tokeninfo").queryParam("id_token", jwtToken).toUriString();

            // fetching for profile data
            String resultJson = restTemplate.getForObject(requestUrl, String.class);

            // Google profile converting process
            if(resultJson != null) {
                GoogleLoginDto loginDto = objectMapper.readValue(resultJson, new TypeReference<>() {});
                userDetailsResponse = ResponseEntity.ok().body(loginDto);
            } else {
                throw new Exception("Google OAuth failed");
            }

        } catch (Exception e) { e.printStackTrace(); }

        // 서비스 회원 등록 위임
        googleProfile = userDetailsResponse.getBody();
        Member googleMember = memberService.createGoogleMember(googleProfile, loginResponse.getAccessToken());

        // 시큐리티 영역
        // Authentication 을 Security Context Holder 에 저장
        Authentication authentication = new UsernamePasswordAuthenticationToken(googleMember.getEmail(), googleMember.getPassword()); // password 확인
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 자체 JWT 생성 및 HttpServletResponse 의 Header 에 저장 (클라이언트 응답용)
        String accessToken = jwtTokenizer.delegateAccessToken(googleMember);
        String refreshToken = jwtTokenizer.delegateRefreshToken(googleMember);
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("RefreshToken", refreshToken);

        System.out.println(accessToken);
    }
}
