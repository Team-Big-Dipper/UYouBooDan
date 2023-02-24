package TeamBigDipper.UYouBooDan.global.oauth2.kakao;

import lombok.Data;

@Data
public class KakaoProfileVo {
    private Long id;
    private String connected_at;
    private Properties properties;
    private KakaoAccount kakao_account;

    @Data
    public class Properties {
        private String nickname;
        public String profile_image;
        public String thumbnail_image;
    }

    @Data
    public class KakaoAccount {
        private Boolean profile_needs_agreement;
        private Boolean profile_nickname_needs_agreement;
        private Profile profile;
        private Boolean has_email;
        private Boolean email_needs_agreement;
        public Boolean is_email_valid;
        public Boolean is_email_verified;
        public String email;

        @Data
        public class Profile {
            private String nickname;
            public String thumbnail_image_url;
            public String Profile_image_url;
        }
    }
}