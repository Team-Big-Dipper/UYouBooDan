package TeamBigDipper.UYouBooDan.memberInfo.controller;

import TeamBigDipper.UYouBooDan.comment.dto.CommentResDto;
import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import TeamBigDipper.UYouBooDan.global.dto.MultiResDto;
import TeamBigDipper.UYouBooDan.global.security.util.JwtExtractUtil;
import TeamBigDipper.UYouBooDan.memberInfo.dto.MemberTopicResDto;
import TeamBigDipper.UYouBooDan.memberInfo.dto.MemberTopicVoteResDto;
import TeamBigDipper.UYouBooDan.memberInfo.service.MemberInfoService;
import TeamBigDipper.UYouBooDan.topic.dto.TopicPageResDto;
import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import TeamBigDipper.UYouBooDan.topic.entity.TopicVote;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RequestMapping("/member-info")
@RestController
public class MemberInfoController {

    private final JwtExtractUtil jwtExtractUtil;
    private final MemberInfoService memberInfoService;

    /**
     * 내가 쓴 게시글 조회
     * @param request Authorization
     * @param pageable pageable처리를 위함
     * @return 내가 쓴 게시글 조회
     */
    @GetMapping("/topics")
    public ResponseEntity<MultiResDto> getMemberTopics (HttpServletRequest request, Pageable pageable) {
        Long memberId = jwtExtractUtil.extractMemberIdFromJwt(request);
        Page<Topic> page = memberInfoService.findMemberTopics(memberId, pageable);
        Page<TopicPageResDto> resDto = page.map(TopicPageResDto::new);
        List<TopicPageResDto> list = resDto.stream().collect(Collectors.toList());

        return new ResponseEntity<>(new MultiResDto(list, page), HttpStatus.OK);
    }


    /**
     * 내가 쓴 댓글 조회
     * @param request Authorization
     * @param pageable pageable처리를 위함
     * @return 내가 쓴 댓글 조회
     */
    @GetMapping("/comments")
    public ResponseEntity<MultiResDto> getMemberComments (HttpServletRequest request, Pageable pageable) {
        Long memberId = jwtExtractUtil.extractMemberIdFromJwt(request);
        Page<Comment> page = memberInfoService.findMemberComment(memberId, pageable);
        Page<CommentResDto> resDto = page.map(CommentResDto::new);
        List<CommentResDto> list = resDto.stream().collect(Collectors.toList());

        return new ResponseEntity<>(new MultiResDto(list, page), HttpStatus.OK);
    }


    /**
     * 내가 선택한 투표 조회
     * @param request Authorization
     * @param pageable pageable처리를 위함
     * @return 투표Id, 투표 게시글 Id, 투표 게시글 내용, 투표 항목 Id, 투표 항목 이름, 투표자 Id, 투표자 이름, 생성일자, 종료일자
     */
    @GetMapping("/votes")
    public ResponseEntity<MultiResDto> getMemberVotes (HttpServletRequest request, Pageable pageable) {
        Long memberId = jwtExtractUtil.extractMemberIdFromJwt(request);
        Page<TopicVote> page = memberInfoService.findMemberVotedTopics(memberId, pageable);
        Page<MemberTopicVoteResDto> resDtos = page.map(MemberTopicVoteResDto::new);
        List<MemberTopicVoteResDto> list = resDtos.stream().collect(Collectors.toList());

        return new ResponseEntity<>(new MultiResDto(list, page), HttpStatus.OK);
    }

}
