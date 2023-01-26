package TeamBigDipper.UYouBooDan.member.entity;

import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import TeamBigDipper.UYouBooDan.global.exception.dto.BusinessLogicException;
import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import TeamBigDipper.UYouBooDan.member.value.Email;
import TeamBigDipper.UYouBooDan.member.value.Name;
import TeamBigDipper.UYouBooDan.member.value.Password;
import TeamBigDipper.UYouBooDan.member.value.Photo;
import lombok.*;

import javax.persistence.*;
import java.util.Optional;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Embedded
    private Email email;

    @Embedded @Setter
    private Password password; // 컨트롤러에서 암호화 할 예정

    @Embedded
    private Name nickname;

    @Embedded
    private Photo profile;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)  // 컬럼설정 지정 안할시 오류 발생 => Unable to instantiate custom type: org.hibernate.type.EnumType 에러발생
    private MemberStatus memberStatus;


    /**
     * 회원상태 Enum관리 : default값은 MEMBER_ACTIVE로 필드에서 지정
     */
    @NoArgsConstructor
    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_SLEEP("휴면계정"),
        MEMBER_QUIT("탈퇴 계정");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }


    /**
     * 기본 프로필 지정
     */
    public void defaultProfile() {
        if(this.profile.getPhoto()==null)
        this.profile = new Photo("https://scontent-gmp1-1.xx.fbcdn.net/v/t1.18169-9/527016_499021583525593_732357164_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CdbnqyyFWXkAX_obHCp&_nc_ht=scontent-gmp1-1.xx&oh=00_AfDBQSsLnCXMKoAPnGFrOeSBgvMp__vgjXLEqmtS6etfcw&oe=63F1DB6A");
    }


    /**
     * 비즈니스 로직 숨기기용도 (feat.DDD)
     */
    public Member verifyMember(Optional<Member> optMember) {
        return optMember.orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public void modifyPassword(Password password){ this.password = password; }
    public void modifyNickname(Name nickname){
        this.nickname = nickname;
    }
    public void modifyProfile(Photo profile){
        this.profile = profile;
    }
    public void modifyMemberStatus(MemberStatus status){
        this.memberStatus = status;
    }
    public void withdrawMember(){ this.memberStatus = MemberStatus.MEMBER_QUIT; }
    public void checkPassword(String password) {
        if(!this.password.getPassword().equals(password)) throw new BusinessLogicException(ExceptionCode.NON_ACCESS_MODIFY);
    }

}