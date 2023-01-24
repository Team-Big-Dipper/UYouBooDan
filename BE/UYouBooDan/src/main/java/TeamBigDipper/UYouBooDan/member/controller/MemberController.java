package TeamBigDipper.UYouBooDan.member.controller;

import TeamBigDipper.UYouBooDan.global.dto.MultiResDto;
import TeamBigDipper.UYouBooDan.global.dto.SingleResDto;
import TeamBigDipper.UYouBooDan.member.dto.MemberPatchReqDto;
import TeamBigDipper.UYouBooDan.member.dto.MemberPostReqDto;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

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
     * @param memberId : 시큐리티 구성 전 임시 Variable
     * @return void
     */
    @PatchMapping("/edit/{member_id}")
    public ResponseEntity<SingleResDto<String>> patchMember (@RequestBody MemberPatchReqDto memberPatchReqDto,
                                                             @PathVariable("member_id") Long memberId) {
        memberService.modifyMember(memberPatchReqDto.toEntity(), memberId);
        return new ResponseEntity<>(new SingleResDto<>("Success Patch"), HttpStatus.OK);
    }


    /**
     * Delete 요청
     * 애너테이션은 delete 요청을 받을 것이므로, DeleteMapping으로 받음
     * 상태변환을 할 예정이므로, HttpStatus는 NO_CONTENT가 아닌 OK로 함
     * @return "data" : "String"
     */
    @DeleteMapping("/remove")
    public ResponseEntity<SingleResDto<String>> deleteMember () {
        /**
         * 로그인한 사용자 Id값을 받아 상태 변환 예정
         */
        return new ResponseEntity<>(new SingleResDto<>("Success Delete"), HttpStatus.OK);
    }


    /**
     * 단일 Get 요청
     * @return "data" : "String"
     */
    @GetMapping("/find")
    public ResponseEntity<SingleResDto<String>> getMember () {

        return new ResponseEntity<>(new SingleResDto<>("Success Get"), HttpStatus.OK);
    }


    /**
     * Page Get 요청
     * @return "data" : "String"
     */
    @GetMapping("/find-all")
    public ResponseEntity<MultiResDto<String>> getMembers (Pageable pageable) {
        List<String> list = new ArrayList<>();
        int count = 0;
        while(count++<30) list.add("Member " + count);
        Page<String> page = new PageImpl<>(list, pageable, list.size());

        return new ResponseEntity<>(new MultiResDto<>(list, page), HttpStatus.OK);
    }

}
