package TeamBigDipper.UYouBooDan.member.service;

import TeamBigDipper.UYouBooDan.global.exception.dto.BusinessLogicException;
import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


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


    @Transactional
    public void modifyMember(Member member, Long memberId) {
        Member existMember = (memberRepository.findById(memberId)).get();
        Optional.ofNullable(member.getPassword()).ifPresent(existMember::modifyPassword);
        Optional.ofNullable(member.getNickname()).ifPresent(existMember::modifyNickname);
        Optional.ofNullable(member.getProfile()).ifPresent(existMember::modifyProfile);  // 현재 profile의 경우 단순 URI상태. 추후 파일로 변경 예정

        memberRepository.save(existMember);
    }


    /**
     * 추후 구현할 기본 메서드
     * 1. removeMember => 상태 ENUM 문제 해결 후 구현 예정
     * 2. findMembers => DB 구성 완료 후 구현 예정 (현재는 Controller 내 더미데이터 반환)
     */


    /**
     * 현재는 Controller에서 String 반환중
     * @param memberId  : 추후 시큐리티 구현 후 적용될 예정
     * @return : 1명의 member 정보를 반환 => 맞춰서 ResponseDto 제작 예정
     */
    public Member findMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return member;
    }

}
