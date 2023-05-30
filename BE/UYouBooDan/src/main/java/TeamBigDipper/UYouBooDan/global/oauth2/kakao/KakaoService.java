package TeamBigDipper.UYouBooDan.global.oauth2.kakao;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
public class KakaoService {

    @Getter
    @Value("${oauth.kakao.appKey.restApiKey}")
    private String kakaoAppKey;
    @Getter
    @Value("${oauth.kakao.clientId}")
    private String kakaoClientId;

    /**
     * @return 카카오 인증서버로 클라이언트가 요청을 보내기위한 Redirect Url
     */
    public String createKakaoURL () throws UnsupportedEncodingException {
        StringBuffer url = new StringBuffer();
        url.append("https://kauth.kakao.com/oauth/authorize?");
        url.append("client_id=" + getKakaoAppKey()); // App Key
        url.append("&redirect_uri=http://www.localhost:3000/auth/kakaoredirect"); // 프론트쪽에서 인가 코드를 받을 리다이렉트 URL(카카오 리다이렉트에 등록 필요)
        url.append("&response_type=code");

        return url.toString();
    }

}
