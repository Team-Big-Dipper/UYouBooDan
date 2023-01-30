package TeamBigDipper.UYouBooDan.member.controller;

import TeamBigDipper.UYouBooDan.global.dto.MultiResDto;
import TeamBigDipper.UYouBooDan.global.dto.SingleResDto;
import TeamBigDipper.UYouBooDan.global.security.util.JwtExtractUtil;
import TeamBigDipper.UYouBooDan.member.dto.MemberPatchReqDto;
import TeamBigDipper.UYouBooDan.member.dto.MemberPostReqDto;
import TeamBigDipper.UYouBooDan.member.dto.MemberResDto;
import TeamBigDipper.UYouBooDan.member.dto.PasswordReqDto;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    private final JwtExtractUtil jwtExtractUtil;

    /**
     * Post 요청
     * @return "data" : "String"
     */
    @PostMapping
    public ResponseEntity<SingleResDto<Long>> postMember (@RequestBody MemberPostReqDto memberPostReqDto) {
        /**
         * 추후 시큐리티 구현 후 member password 암호화 예정
         */
        Member savedMember = memberService.createMember(memberPostReqDto.toEntity());

        return new ResponseEntity<>(new SingleResDto<>(savedMember.getMemberId()), HttpStatus.CREATED);
    }


    /**
     * Patch 요청
     * @return "data" : "String"
     * @param memberPatchReqDto : 요청 Body
     * @return void
     */
    @PatchMapping("/edit")
    public ResponseEntity<SingleResDto<String>> patchMember (@RequestBody MemberPatchReqDto memberPatchReqDto,
                                                             HttpServletRequest request) {
        Long memberId = jwtExtractUtil.extractMemberIdFromJwt(request);
        memberService.modifyMember(memberPatchReqDto.toEntity(), memberId);

        return new ResponseEntity<>(new SingleResDto<>("Success Patch"), HttpStatus.OK);
    }


    /**
     * Delete 요청
     * 애너테이션은 delete 요청을 받을 것이므로, DeleteMapping으로 받음
     * 상태변환을 할 예정이므로, HttpStatus는 NO_CONTENT가 아닌 OK로 함
     * 회원탈퇴(withdraw) 후 성공 메세지 반환
     * @return "data" : "성공 메세지"
     */
    @DeleteMapping("/remove")
    public ResponseEntity<SingleResDto<String>> withdrawMember (HttpServletRequest request) {
        memberService.withdrawMember(jwtExtractUtil.extractMemberIdFromJwt(request));

        return new ResponseEntity<>(new SingleResDto<>("Success Withdraw"), HttpStatus.OK);
    }


    /**
     * 회원 삭제 메소드
     * @return 삭제 성공 메세지
     */
    @DeleteMapping("/delete")
    public ResponseEntity<SingleResDto<String>> deleteMember (HttpServletRequest request) {
        memberService.removeMember(jwtExtractUtil.extractMemberIdFromJwt(request));

        return new ResponseEntity<>(new SingleResDto<>("Success Delete"), HttpStatus.OK);
    }


    /**
     * 단일 Get 요청
     * @return "data" : "단일 객체에 대한 응답정보"
     */
    @GetMapping("/find")
    public ResponseEntity<SingleResDto<MemberResDto>> getMember (HttpServletRequest request) {
        Member member = memberService.findMember(jwtExtractUtil.extractMemberIdFromJwt(request));
        MemberResDto response = new MemberResDto(member);

        return new ResponseEntity<>(new SingleResDto<>(response), HttpStatus.OK);
    }


    /**
     * Page Get 요청
     * @return "data" : "String"
     */
    @GetMapping("/find-all")
    public ResponseEntity<MultiResDto<MemberResDto>> getMembers (Pageable pageable) {
        Page<Member> page = memberService.findMembers(pageable);
        Page<MemberResDto> response = page.map(MemberResDto::new);
        List<MemberResDto> list = response.stream().collect(Collectors.toList());

        return new ResponseEntity<>(new MultiResDto<>(list, page), HttpStatus.OK);
    }


    /**
     * password 확인 : 성공시 String 메세지, 실패시 BusinessLoginException 발생
     * 추후 Password 인코더 구현 시 추가 작업 예정
     */
    @PostMapping("/verify")
    public ResponseEntity<SingleResDto<String>> checkPassword(@RequestBody PasswordReqDto passwordDto,
                                                              HttpServletRequest request) {
        memberService.verifyPassword(passwordDto.getPassword(), jwtExtractUtil.extractMemberIdFromJwt(request));

        return new ResponseEntity<>(new SingleResDto<>("Verify Success."),HttpStatus.OK);
    }


    /**
     * email확인 및 nickname 확인 API 다음작업시 구현예정 (현재는 Handler메소드만 구현)
     */

    /**
     * email 중복확인
     * @param email
     * @return
     */
    @GetMapping("/verify-email")
    public ResponseEntity<SingleResDto<String>> checkEmail(@RequestParam(required = false) String email) {
        memberService.verifyNotExistEmail(email);

        return new ResponseEntity<>(new SingleResDto<>("Verify Success."),HttpStatus.OK);
    }


    /**
     * 닉네임 중복확인
     * @param nickname
     * @return
     */
    @GetMapping("/verify-nickname")
    public ResponseEntity<SingleResDto<String>> checkNickname(@RequestParam(required = false) String nickname) {
        memberService.verifyNotExistNickname(nickname);

        return new ResponseEntity<>(new SingleResDto<>("Verify Success."),HttpStatus.OK);
    }

}