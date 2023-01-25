package TeamBigDipper.UYouBooDan.member.dto;

import TeamBigDipper.UYouBooDan.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberResDto {

    private String email;

    private String nickname;

    private String profile;

    private String memberStatus;


    public MemberResDto(Member member) {
        this.email = member.getEmail().getEmail();
        this.nickname = member.getNickname().getName();
        this.profile = member.getProfile().getPhoto();
        this.memberStatus = member.getMemberStatus().getStatus();
    }
}


