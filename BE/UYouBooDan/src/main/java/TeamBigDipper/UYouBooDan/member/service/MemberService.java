package TeamBigDipper.UYouBooDan.member.service;

import TeamBigDipper.UYouBooDan.global.exception.dto.BusinessLogicException;
import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    /**
     * 들어오는 값에 따라, 다음의 Patch 요청을 개별적으로 관리 가능합니다. (null이 아닐경우 수정되는 방식 미적용)
     * 1. 회원 정보 변경 가능
     * 2. 회원 상태 변경 가능
     * 비즈니스 로직은 Member Entity 내에서 처리
     * @param memberId 추후 JWT에서 추출 예정
     */
    @Transactional
    public void modifyMember(Member member, Long memberId) {
        Member existMember = new Member().verifyMember(memberRepository.findById(memberId));
        Optional.ofNullable(member.getPassword()).ifPresent(existMember::modifyPassword);
        Optional.ofNullable(member.getNickname()).ifPresent(existMember::modifyNickname);
        Optional.ofNullable(member.getProfile()).ifPresent(existMember::modifyProfile);  // 현재 profile의 경우 단순 URI상태. 추후 파일로 변경 예정
        Optional.ofNullable(member.getMemberStatus()).ifPresent(existMember::modifyMemberStatus);

        memberRepository.save(existMember);
    }


    /**
     * Member 완전 삭제시 사용
     */
    @Transactional
    public void removeMember(Long memberId) {
        Member verifyMember = new Member().verifyMember(memberRepository.findById(memberId));
        memberRepository.delete(verifyMember);
    }

    /**
     * Member Entity클래스 내 구현한 회원탈퇴 메소드(withdrawMember 호출)
     */
    @Transactional
    public void withdrawMember (Long memberId) {
        Member verifyMember = new Member().verifyMember(memberRepository.findById(memberId));
        verifyMember.withdrawMember();
        memberRepository.save(verifyMember);
    }

    /**
     * 현재는 Controller에서 String 반환중
     * @param memberId  : 추후 시큐리티 구현 후 적용될 예정
     * @return : 1명의 member 정보를 반환 => 맞춰서 ResponseDto 제작 예정
     */
    public Member findMember(Long memberId) {
        Member member = new Member().verifyMember(memberRepository.findById(memberId));
        return member;
    }


    /**
     * 전체 회원 조회용 (Default는 10계정)
     * @param pageable : page, size, sort 등 사용 가능
     * @return Page 구조
     */
    public Page<Member> findMembers (Pageable pageable) {
        return memberRepository.findAll(pageable);
    }

    /**
     * password 일치 여부 조회 메소드
     * @param memberId
     */
    public void verifyPassword (String password, Long memberId) {
        Member member = new Member().verifyMember(memberRepository.findById(memberId));
        member.checkPassword(password);
    }


    public void verifyEmail (String email) {
        /**
         * 중복확인 쿼리 메서드 구현하기
          */
    }

    public void verifyNickname (String nickname) {
        /**
         * 중복확인 쿼리 메서드 구현하기
         */
    }
}
