package TeamBigDipper.UYouBooDan.global.oauth2.naver;

import lombok.Data;

@Data
public class NaverProfileVo {
    private String resultcode;
    private String message;
    private response response; // Json 형태로 주어지는 정보들을 담아줄 객체필드 생성 필수

    // Json 형태로 담길 데이터를 받을 클래스(실질적인 정보들이다)
    @Data
    public class response {
        private String id;
        private String nickname;
        private String name;
        private String email;
        private String gender;
        private String age;
        private String birthday;
        private String profile_image;
        private String birthyear;
        private String mobile;
        private String mobile_e164;
    }
}