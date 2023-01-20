package TeamBigDipper.UYouBooDan.member.service;

import TeamBigDipper.UYouBooDan.global.exception.dto.BusinessLogicException;
import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Entity 타입을 확인하기위해 서비스 로직을 작성했습니다.
 */
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    /**
     * 예시 코드
     * memberId는 DB 연동 후 조회가 가능합니다.
     * @param member : 객체명
     * @return : 객체명 (식별자 반환을 위함)
     */
    @Transactional
    public Member createMember(Member member) {
        member.defaultProfile();
        return memberRepository.save(member);
    }

}
