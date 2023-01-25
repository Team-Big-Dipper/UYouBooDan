package TeamBigDipper.UYouBooDan.member.dto;

import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.member.value.Email;
import TeamBigDipper.UYouBooDan.member.value.Name;
import TeamBigDipper.UYouBooDan.member.value.Password;
import TeamBigDipper.UYouBooDan.member.value.Photo;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberPostReqDto {

    private String email;

    private String password;

    private String nickname;

    private String profile;

    public Member toEntity() {
        Member member = new Member().builder()
                .email(new Email(this.email))
                .password(new Password(this.password))
                .nickname(new Name(this.nickname))
                .profile(new Photo(this.profile))
                .memberStatus(Member.MemberStatus.MEMBER_ACTIVE)
                .build();
        return member;
    }
}