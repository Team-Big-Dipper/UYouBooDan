package TeamBigDipper.UYouBooDan.global.oauth2.kakao;

import TeamBigDipper.UYouBooDan.global.security.jwt.JwtTokenizer;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.member.service.MemberService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@RestController
@RequestMapping("/kakao")
public class KakaoOauthController {

    @Getter
    @Value("${oauth.kakao.appKey.restApiKey}")
    private String kakaoAppKey;
    @Getter
    @Value("${oauth.kakao.clientId}")
    private String kakaoClientId;
    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;


    /**
     * 프론트 요청 API : 인증 code 받기용
     * @return redirect url for kakao Authorization
     */
    @GetMapping("/oauth")
    public ResponseEntity<?> kakaoConnect() {
        StringBuffer url = new StringBuffer();
        url.append("https://kauth.kakao.com/oauth/authorize?");
        url.append("client_id=" + getKakaoAppKey()); // App Key
        url.append("&redirect_uri=http://www.localhost:3000/auth/kakaoredirect"); // 프론트쪽에서 인가 코드를 받을 리다이렉트 URL(카카오 리다이렉트에 등록 필요)
        url.append("&response_type=code");

        return new ResponseEntity<>(url.toString(), HttpStatus.OK); // 프론트 브라우저로 보내는 주소(프론트에서 받아서 리다이렉트 시키면, 인가코드를 받을 수 있다.)
    }


    /**
     * 카카오 callback API : 토큰 발급 및 서비스 멤버 생성
     * @param code 카카오 인증 code (프론트에서 카카오로부터 받아서 이 API에 담아서 전달해주면 됨)
     * @return Success Login message
     * @throws JsonProcessingException
     */
    @GetMapping("/callback")
    public String kakaoLogin(@RequestParam("code") String code, HttpServletResponse response) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders kakaoTokenReqHeaders = new HttpHeaders(); // springFramework.http 라이브러리
        kakaoTokenReqHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8"); // json이 아니다 (카카오 REST API 참고)

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", getKakaoAppKey());
        params.add("redirect_url", "http://localhost:8080"); // redirect url 확인하기
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, kakaoTokenReqHeaders);

        // fetching for token
        ResponseEntity<String> oauthTokenResponse = restTemplate.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // kakao token converting process
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoToken kakaoToken = null;
        try { kakaoToken = objectMapper.readValue(oauthTokenResponse.getBody(), KakaoToken.class); }
        catch (JsonMappingException je) { je.printStackTrace(); }

        RestTemplate restTemplate2 = new RestTemplate();
        HttpHeaders userDetailsReqHeaders = new HttpHeaders();
        userDetailsReqHeaders.add("Authorization", "Bearer " + kakaoToken.getAccess_token());
        userDetailsReqHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(userDetailsReqHeaders);

        // fetching for profile data
        ResponseEntity<String> userDetailsResponse = restTemplate2.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        // kakao profile converting process
        ObjectMapper objectMapper2 = new ObjectMapper();
        KakaoProfile kakaoProfile = null;
        try { kakaoProfile = objectMapper2.readValue(userDetailsResponse.getBody(), KakaoProfile.class); }
        catch (JsonMappingException je) { je.printStackTrace(); }

        // 서비스 회원 등록 위임
        Member kakaoMember = memberService.createKakaoMember(kakaoProfile);

        // 시큐리티 영역
        // Authentication 을 Security Context Holder 에 저장
        Authentication authentication = new UsernamePasswordAuthenticationToken(kakaoMember.getEmail(), kakaoMember.getPassword()); // password 확인
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 자체 JWT 생성 및 HttpServletResponse 의 Header 에 저장 (클라이언트 응답용)
        String accessToken = jwtTokenizer.delegateAccessToken(kakaoMember);
        String refreshToken = jwtTokenizer.delegateRefreshToken(kakaoMember);
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("RefreshToken", refreshToken);

        return "Success Login: User";
    }
}
