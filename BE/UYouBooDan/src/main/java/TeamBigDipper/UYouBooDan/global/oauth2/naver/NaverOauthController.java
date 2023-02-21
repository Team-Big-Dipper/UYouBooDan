package TeamBigDipper.UYouBooDan.global.oauth2.naver;

import TeamBigDipper.UYouBooDan.global.security.jwt.JwtTokenizer;
import TeamBigDipper.UYouBooDan.global.security.util.JwtExtractUtil;
import TeamBigDipper.UYouBooDan.member.service.MemberService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.net.URLEncoder;
import java.security.SecureRandom;

@RestController
@RequiredArgsConstructor
@RequestMapping("/naver")
public class NaverOauthController {

    // application-local.yml 파일에 관련 프로퍼티를 입력해야 정상 동작하므로, 우선 주석처리해둠
//    @Getter
//    @Value("${oauth.naver.clientId}")
//    private String naverClientId;

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
        String redirectURI = URLEncoder.encode("http://www.localhost:8080", "UTF-8"); // redirectURI 설정 부분
        SecureRandom random = new SecureRandom();
        String state = new BigInteger(130, random).toString();

        url.append("https://nid.naver.com/oauth2.0/authorize?response_type=code");
//        url.append("&client_id=" + getNaverClientId());
        url.append("&redirect_uri=" + redirectURI); // getRedirectUri());
        url.append("&state=" + state);

        return new ResponseEntity<>(url.toString(), HttpStatus.OK); // 프론트 브라우저로 보내는 주소
    }


    /**
     * 실제 로그인 로직을 수행할 메소드
     * @return
     */
    @GetMapping("/callback")
    public String naverLogin() {

        // 네이버 로그인 콜백 로직

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
