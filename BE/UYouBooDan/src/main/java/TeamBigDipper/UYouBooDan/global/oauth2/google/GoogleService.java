package TeamBigDipper.UYouBooDan.global.oauth2.google;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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
}
