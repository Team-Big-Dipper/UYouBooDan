package TeamBigDipper.UYouBooDan.member.dto;

import TeamBigDipper.UYouBooDan.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberReqDto {

    private String email;

    private String password;

    private String nickname;

    private String profile;

    public Member toMember() {
        Member member = new Member().builder()
                .email(this.email)
                .password(this.password)
                .nickname(this.nickname)
                .profile(this.profile)
                .build();
        return member;
    }
}
