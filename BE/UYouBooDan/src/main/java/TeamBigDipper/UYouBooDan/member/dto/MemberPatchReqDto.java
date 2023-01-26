package TeamBigDipper.UYouBooDan.member.dto;

import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.member.value.Name;
import TeamBigDipper.UYouBooDan.member.value.Photo;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberPatchReqDto {

    private String password;
    private String nickname;
    private String profile;
    private Member.MemberStatus memberStatus; // MemberStatus의 에러 해결 후 활성화 예정입니다.

    /**
     * 밸류지정방식
     */
    public Member toEntity() {
        Member member = new Member().builder()
                .password(this.password)
                .nickname(new Name(this.nickname))
                .profile(new Photo(this.profile))
                .memberStatus(this.memberStatus) // MemberStatus의 에러 해결 후 활성화 예정입니다.
                .build();
        return member;
    }
}