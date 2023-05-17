package TeamBigDipper.UYouBooDan.global.oauth2.naver;

import TeamBigDipper.UYouBooDan.global.security.jwt.JwtTokenizer;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.member.service.MemberService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.net.URLEncoder;
import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class NaverService {

    @Getter
    @Value("${oauth.naver.clientId}")
    private String naverClientId;

    @Getter
    @Value("${oauth.naver.clientSecret}")
    private String naverClientSecret;
    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;

    public String createNaverURL () throws UnsupportedEncodingException {
        StringBuffer url = new StringBuffer();

        // 카카오 API 명세에 맞춰서 작성
        String redirectURI = URLEncoder.encode("http://www.localhost:8080/naver/callback", "UTF-8"); // redirectURI 설정 부분
        SecureRandom random = new SecureRandom();
        String state = new BigInteger(130, random).toString();

        url.append("https://nid.naver.com/oauth2.0/authorize?response_type=code");
        url.append("&client_id=" + getNaverClientId());
        url.append("&state=" + state);
        url.append("&redirect_uri=" + redirectURI);

        /* 로그인 중 선택 권한 허용 URL로 redirect 문제 해결하기
           로그인 시도시, "현재 UYouBooDan은 개발 중 상태입니다. 개발 중 상태에서는 등록된 아이디만 로그인할 수 있습니다." 화면으로 가버림.
           아래와 같은 URL로 리다이렉트 되도록 유도하는 해결책 찾기
           : https://nid.naver.com/oauth2.0/authorize?client_id=avgLtiDUfWMFfHpplTZh&redirect_uri=https://developers.naver.com/proxyapi/forum/auth/oAuth2&response_type=code&state=RZ760w
         */

        return url.toString();
    }

    public void loginNaver (String code, String state, HttpServletResponse response) throws JsonProcessingException {
        // 네이버 로그인 Token 발급 API 요청을 위한 header/parameters 설정 부분
        RestTemplate token_rt = new RestTemplate(); // REST API 요청용 Template

        HttpHeaders naverTokenRequestHeadres = new HttpHeaders();  // Http 요청을 위한 헤더 생성
        naverTokenRequestHeadres.add("Content-type", "application/x-www-form-urlencoded"); // application/json 했다가 grant_type missing 오류남 (출력포맷만 json이라는 거엿음)

        // 파라미터들을 담아주기위한 맵 (파라미터용이기 때문에, 따로 앞에 ?나 &나 =같은 부호를 입력해주지 않아도 됨. 오히려 넣으면 인식못함)
        // 네이버 가이드에서 요청하는 파라미터들 (Developers 참고)
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", getNaverClientId());
        params.add("client_secret", getNaverClientSecret());
        params.add("code", code);
        params.add("state", state);

        HttpEntity<MultiValueMap<String, String>> naverTokenRequest =
                new HttpEntity<>(params, naverTokenRequestHeadres);

        // 서비스 서버에서 네이버 인증 서버로 요청 전송(POST 또는 GET이라고 공식문서에 있음), 응답은 Json으로 제공됨
        ResponseEntity<String> oauthTokenResponse = token_rt.exchange(
                "https://nid.naver.com/oauth2.0/token",
                HttpMethod.POST,
                naverTokenRequest,
                String.class
        );

        // body로 access_token, refresh_token, token_type:bearer, expires_in:3600 온 상태
        System.out.println(oauthTokenResponse);

        // oauthTokenResponse로 받은 토큰정보 객체화
        ObjectMapper token_om = new ObjectMapper();
        NaverTokenVo naverToken = null;
        try {
            naverToken = token_om.readValue(oauthTokenResponse.getBody(), NaverTokenVo.class);
        } catch (JsonMappingException je) {
            je.printStackTrace();
        }

        // 토큰을 이용해 정보를 받아올 API 요청을 보낼 로직 작성하기
        RestTemplate profile_rt = new RestTemplate();
        HttpHeaders userDetailReqHeaders = new HttpHeaders();
        userDetailReqHeaders.add("Authorization", "Bearer " + naverToken.getAccess_token());
        userDetailReqHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
        HttpEntity<MultiValueMap<String, String>> naverProfileRequest = new HttpEntity<>(userDetailReqHeaders);

        // 서비스서버 - 네이버 인증서버 : 유저 정보 받아오는 API 요청
        ResponseEntity<String> userDetailResponse = profile_rt.exchange(
                "https://openapi.naver.com/v1/nid/me",
                HttpMethod.POST,
                naverProfileRequest,
                String.class
        );

        // 요청 응답 확인
        System.out.println(userDetailResponse);

        // 네이버로부터 받은 정보를 객체화
        // *이때, 공식문서에는 응답 파라미터에 mobile 밖에없지만, 국제전화 표기로 된 mobile_e164도 같이 옴. 따라서 NaverProfileVo에 mobile_e164 필드도 있어야 정상적으로 객체가 생성됨
        ObjectMapper profile_om = new ObjectMapper();
        NaverProfileVo naverProfile = null;
        try {
            naverProfile = profile_om.readValue(userDetailResponse.getBody(), NaverProfileVo.class);
        } catch (JsonMappingException je) {
            je.printStackTrace();
        }

        // 받아온 정보로 서비스 로직에 적용하기
        Member naverMember = memberService.createNaverMember(naverProfile, naverToken.getAccess_token());

        // 시큐리티 영역
        // Authentication 을 Security Context Holder 에 저장
        Authentication authentication = new UsernamePasswordAuthenticationToken(naverMember.getEmail(), naverMember.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 자체 JWT 생성 및 HttpServletResponse 의 Header 에 저장 (클라이언트 응답용)
        String accessToken = jwtTokenizer.delegateAccessToken(naverMember);
        String refreshToken = jwtTokenizer.delegateRefreshToken(naverMember);
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("RefreshToken", refreshToken);

        /* RefreshToken을 Redis에 넣어주는 과정 필요  */

        System.out.println(accessToken);
    }
}
