package TeamBigDipper.UYouBooDan.global.oauth2.google;


import TeamBigDipper.UYouBooDan.global.security.jwt.JwtTokenizer;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.member.service.MemberService;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@RestController
@RequestMapping("/google")
public class GoogleOauthController {
    @Getter
    @Value("${oauth.google.clientId}")
    private String googleClientId;
    @Getter
    @Value("${oauth.google.clientSecret}")
    private String googleClientSecret;
    @Value("${oauth.google.scope}")
    private String scopes;

    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;


    @GetMapping("/oauth")
    public ResponseEntity<?> googleConnect() {
        StringBuffer url = new StringBuffer();
        url.append("https://accounts.google.com/o/oauth2/v2/auth?");
        url.append("client_id=" + getGoogleClientId());
        url.append("&redirect_uri=http://localhost:8080/google/login/redirect");
        url.append("&response_type=code");
        url.append("&scope="+ getScopeUrl());

        return new ResponseEntity<>(url.toString(), HttpStatus.OK);
    }

    @GetMapping("/login/redirect")
    public String redirectGoogleLogin(@RequestParam("code") String code, HttpServletResponse response) throws JsonProcessingException {

        // Http 통신을 위한 RestTemplate 활용
        RestTemplate restTemplate = new RestTemplate();
        GoogleLoginRequest request = GoogleLoginRequest.builder()
                .clientId(getGoogleClientId())
                .clientSecret(getGoogleClientSecret())
                .code(code)
                .redirectUri("http://localhost:8080/google/login/redirect")
                .grantType("authorization_code")
                .build();

        ResponseEntity<GoogleLoginDto> userDetailsResponse = null;
        GoogleLoginDto googleProfile;

        try {
            // Http Header 설정
            HttpHeaders headers  = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<GoogleLoginRequest> httpReqEntity = new HttpEntity<>(request, headers);
            ResponseEntity<String> apiResJson = restTemplate.postForEntity("https://oauth2.googleapis.com" + "/token", httpReqEntity, String.class);

            // ObjectMapper를 통해 String to Object로 변환
            ObjectMapper mapper = new ObjectMapper();
            mapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
            mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL); // NULL이 아닌 값만 응답 받기
            GoogleLoginResponse loginResponse = mapper.readValue(apiResJson.getBody(), new TypeReference<>() {});

            // 사용자의 정보는 JWT Token으로 저장되어 있고, Id_Token에 값을 저장
            String jwtToken = loginResponse.getIdToken();

            // JWT Token을 전달해 JWT에 저장된 사용자 정보 확인
            String requestUrl = UriComponentsBuilder.fromHttpUrl("https://oauth2.googleapis.com/tokeninfo").queryParam("id_token", jwtToken).toUriString();

            String resultJson = restTemplate.getForObject(requestUrl, String.class);

            if(resultJson != null) {
                GoogleLoginDto loginDto = mapper.readValue(resultJson, new TypeReference<>() {});
                userDetailsResponse = ResponseEntity.ok().body(loginDto);
            } else {
                throw new Exception("Google OAuth failed");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        googleProfile = userDetailsResponse.getBody();
        Member googleMember = memberService.createGoogleMember(googleProfile);

        // 시큐리티 영역
        // Authentication 을 Security Context Holder 에 저장
        Authentication authentication = new UsernamePasswordAuthenticationToken(googleMember.getEmail(), googleMember.getPassword()); // password 확인
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 자체 JWT 생성 및 HttpServletResponse 의 Header 에 저장 (클라이언트 응답용)
        String accessToken = jwtTokenizer.delegateAccessToken(googleMember);
        String refreshToken = jwtTokenizer.delegateRefreshToken(googleMember);
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("RefreshToken", refreshToken);

        return "Success Login: User";
    }

    public String getScopeUrl() {
        return scopes.replaceAll(",", "%20");
    }
}
