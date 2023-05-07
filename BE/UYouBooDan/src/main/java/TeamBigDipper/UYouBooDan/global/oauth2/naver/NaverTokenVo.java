package TeamBigDipper.UYouBooDan.global.oauth2.naver;

import lombok.Data;

@Data
public class NaverTokenVo {
    private String access_token;
    private String refresh_token;
    private String token_type;
    private int expires_in;
}
