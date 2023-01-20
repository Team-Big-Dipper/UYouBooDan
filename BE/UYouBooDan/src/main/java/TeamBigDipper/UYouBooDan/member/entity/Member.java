package TeamBigDipper.UYouBooDan.member.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
public class Member {

    @Id
    private Long memberId;
//    @Embedded
    private String email;

    private String password; // 컨트롤러에서 암호화 할 예정

    private String nickname;

    private String profile;

    /**
     * 타입별 이너 클래스들
     * : 추후 재사용성을 위해 공통 클래스로 뺄 수도 있음
     * : Hibernate가 온전히 인식을 못하는 문제가 있음
     * : 밸류에 @Embedded, 밸류 클래스에 @Embeddable로 매핑을 해줘야 한다고 하지만 안되고 있음
     */
//    @Embeddable
//    class Email { private String email; }
//    @Embeddable
//    class Password { private String password; }
//    @Embeddable
//    class Name { private String name; }
//    @Embeddable
//    class Photo { private String photo; }

    public void defaultProfile() {
        if(this.profile==null)
        this.profile = "https://scontent-gmp1-1.xx.fbcdn.net/v/t1.18169-9/527016_499021583525593_732357164_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CdbnqyyFWXkAX_obHCp&_nc_ht=scontent-gmp1-1.xx&oh=00_AfDBQSsLnCXMKoAPnGFrOeSBgvMp__vgjXLEqmtS6etfcw&oe=63F1DB6A";
    }

}
