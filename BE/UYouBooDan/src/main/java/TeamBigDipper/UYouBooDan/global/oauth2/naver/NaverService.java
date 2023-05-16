package TeamBigDipper.UYouBooDan.global.oauth2.naver;

import TeamBigDipper.UYouBooDan.member.service.MemberService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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

        return url.toString();
    }

}
