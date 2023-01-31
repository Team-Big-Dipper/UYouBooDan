package TeamBigDipper.UYouBooDan.global.oauth2.kakao;

import lombok.Data;

@Data
public class KakaoToken {
    private String access_token;
    private String token_type;
    private String refresh_token;
    private int expires_in;
    private String Scope;
    private int refresh_token_expires_in;
}
