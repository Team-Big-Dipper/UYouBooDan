package TeamBigDipper.UYouBooDan.global.oauth2.naver;

import TeamBigDipper.UYouBooDan.global.security.jwt.JwtTokenizer;
import TeamBigDipper.UYouBooDan.global.security.util.JwtExtractUtil;
import TeamBigDipper.UYouBooDan.member.service.MemberService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.net.URLEncoder;
import java.security.SecureRandom;

@RestController
@RequiredArgsConstructor
@RequestMapping("/naver")
public class NaverOauthController {

    @Getter
    @Value("${oauth.naver.clientId}")
    private String naverClientId;

    @Getter
    @Value("${oauth.naver.clientSecret}")
    private String naverClientSecret;

    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;
    private final JwtExtractUtil jwtExtractUtil;

    /**
     * 프론트에 Redirect URI를 제공하기 위한 메소드
     * 프론트에서 네이버 인증 센터로 요청을 주기위한 URI를 제공하며, 이를통해 인증코드를 받아 자체 서비스 callback API 호출시 전달
     * @return redirect URI
     * @throws UnsupportedEncodingException
     */
    @GetMapping("/oauth")
    public ResponseEntity<?> naverConnect() throws UnsupportedEncodingException {
        StringBuffer url = new StringBuffer();

        // 카카오 API 명세에 맞춰서 작성
        String redirectURI = URLEncoder.encode("http://www.localhost:8080/naver/callback", "UTF-8"); // redirectURI 설정 부분
        SecureRandom random = new SecureRandom();
        String state = new BigInteger(130, random).toString();

        url.append("https://nid.naver.com/oauth2.0/authorize?response_type=code");
        url.append("&client_id=" + getNaverClientId());
        url.append("&state=" + state);
        url.append("&redirect_uri=" + redirectURI);

        return new ResponseEntity<>(url.toString(), HttpStatus.OK); // 프론트 브라우저로 보내는 주소
    }


    /**
     * 실제 로그인 로직을 수행할 메소드
     * @return
     */
    @GetMapping("/callback")
    public String naverLogin(@RequestParam("code") String code, @RequestParam("state") String state, HttpServletResponse response) throws JsonProcessingException {
        // 네이버 로그인 Token 발급 API 요청을 위한 header/parameters 설정 부분
        RestTemplate restTemplate = new RestTemplate(); // REST API 요청용 Template

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
        ResponseEntity<String> oauthTokenResponse = restTemplate.exchange(
                "https://nid.naver.com/oauth2.0/token",
                HttpMethod.POST,
                naverTokenRequest,
                String.class
        );

        // 이제 우리가 사용할 적용하는 로직 작성
        ObjectMapper objectMapper = new ObjectMapper();



        return "Success Logout: User";
    }


    /**
     * 로그아웃 API
     * @param request
     * @return
     */
    @GetMapping("/logout")
    public ResponseEntity<?> naverLogout(HttpServletRequest request) {

        // 로그아웃 로직 작성

        return new ResponseEntity<>("Success Logout: User", HttpStatus.OK);
    }

}
