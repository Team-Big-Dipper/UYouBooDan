package TeamBigDipper.UYouBooDan.topic.controller;

import TeamBigDipper.UYouBooDan.global.dto.MultiResDto;
import TeamBigDipper.UYouBooDan.global.dto.SingleResDto;
import TeamBigDipper.UYouBooDan.global.security.util.JwtExtractUtil;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.member.service.MemberService;
import TeamBigDipper.UYouBooDan.topic.dto.*;
import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import TeamBigDipper.UYouBooDan.topic.entity.TopicLike;
import TeamBigDipper.UYouBooDan.topic.entity.TopicVote;
import TeamBigDipper.UYouBooDan.topic.entity.TopicVoteItem;
import TeamBigDipper.UYouBooDan.topic.service.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/topics")
@RequiredArgsConstructor
public class TopicController {

    private final TopicService topicService;
    private final JwtExtractUtil jwtExtractUtil;
    private final MemberService memberService;


    /**
     * 투표 게시글 작성
     * @param topicPostReqDto 투표게시글 Post Request DTO 객체
     * @param request HttpServletRequest 객체 - 토큰 확인
     * @return 투표게시글 ID, HTTP Status
     */
    @PostMapping
    public ResponseEntity<SingleResDto<TopicPostResDto>> postTopic(@RequestBody TopicPostReqDto topicPostReqDto,
                                                                   HttpServletRequest request) {
        // 요청의 token으로부터 memberId 추출해 Member 클래스 생성
        Member member = memberService.findMember(jwtExtractUtil.extractMemberIdFromJwt(request));

        // 투표 게시글 저장
        Topic topic = topicService.createTopic(topicPostReqDto.toTopic(member));

        // Topic 클래스를 ResponseDTO로 변환
        TopicPostResDto topicPostResDto = new TopicPostResDto(topic.getTopicId());

        // 투표 게시글 ID, HTTP Status Created 리턴 
        return new ResponseEntity<>(new SingleResDto<>(topicPostResDto), HttpStatus.CREATED);
    }

    /**
     * 투표 게시글 상세 조회
     * @param topicId 투표 게시글의 id long
     * @param request HttpServletRequest 객체 - 토큰 확인
     * @return 조회된 투표 게시글 상세 내용, HTTP Status
     */
    @GetMapping("/{topic-id}")
    public ResponseEntity getTopic(@PathVariable("topic-id") long topicId,
                                   HttpServletRequest request) {

        Long memberId;                                                      // 사용자 id
        if (jwtExtractUtil.isLoginUser(request)){                           // 로그인한 사용자 이면
            memberId = jwtExtractUtil.extractMemberIdFromJwt(request);      // 요청의 token으로부터 사용자 memberId 추출
        } else {            // 로그인하지않은 사용자이면
            memberId = null;
        }

        // topic Service에서 topic id로 투표 게시글 topic 조회
        Topic topic = topicService.findTopic(topicId, memberId);

        // 투포 게시글 topic을 Response DTO 객체로 변환
        TopicResDto topicResDto = new TopicResDto(topic);

        // 투표 게시글 topic responseDTO, HTTP Status OK 리턴
        return new ResponseEntity<>(new SingleResDto<>(topicResDto), HttpStatus.OK);
    }

    /**
     * 투표 게시글 목록 전체 조회
     * - filter 값을 통해서 진행중, 마감된, 마감 임박 투표 게시글 조회 가능
     * - category 값을 통해 해당 카테고리의 투표 게시글 조회 가능
     * @param pageable Pageable 객체 - size: 가져올 개수 , page : 몇번째 페이지
     * @param filter 투표 게시글 필터 : String 객체
     * @param category 투표 게시글 카테고리 : String 객체
     * @return 페이지네이션이 적용된 투표 게시글 목록 리스트, Page 관련 정보, HttpStatus
     */
    @GetMapping
    public ResponseEntity<MultiResDto> getTopics(Pageable pageable,
                                                 @RequestParam(value = "filter", required = false) String filter,
                                                 @RequestParam(value = "category", required = false) String category) {
        // TopicService에서 Pageable객체와 filter, category를 통해 투표 게시글 Topic Page 반환
        Page<Topic> topicPage = topicService.findTopics(pageable, filter, category);

        // Page Topic을 Response DTO로 변환
        Page<TopicPageResDto> topicPageResDtos = topicPage.map(TopicPageResDto::new);

        // Topic Response DTO를 리스트로 변환
        List<TopicPageResDto> topicPageResDtoList = topicPageResDtos.stream()
                                                        .collect(Collectors.toList());

        // Topic Page Response DTO, Page 정보, HTTP Status 반환
        return new ResponseEntity<>(new MultiResDto<>(topicPageResDtoList, topicPage), HttpStatus.OK);
    }

    /**
     * 투표게시글에 투표하기
     * @param topicId : 투표 게시글 ID
     * @param topicVoteReqDto : 투표 Request DTO 객체
     * @param request HttpServletRequest 객체 - 토큰 확인
     * @return 투표 게시글의 투표 항목 DTO 리스트, HTTP Status
     */
    @PatchMapping("/{topic-id}/vote")
    public ResponseEntity patchTopicVote(@PathVariable("topic-id") long topicId,
                                         @RequestBody TopicVoteReqDto topicVoteReqDto,
                                         HttpServletRequest request) {

        // 요청의 token으로부터 memberId 추출해 Member 클래스 생성
        Long memberId = jwtExtractUtil.extractMemberIdFromJwt(request);
        Member member = memberService.findMember(memberId);

        // TopicService에서 투표 게시글에 투표 메서드 진행하여 투표 게시글의 투표 항목 반환
        List<TopicVoteItem> topicVoteItems = topicService.voteTopic(member, topicId, topicVoteReqDto.getTopicVoteItemId());

        // 투표 항목 TopicVoteItem 리스트를 Dto 리스트로 변환
        List<TopicVoteResDto> topicVoteResDtos = topicVoteItems.stream()
                                        .map(TopicVoteResDto::new)
                                        .collect(Collectors.toList());

        // TopicVote Response DTO, HTTP Status 반환
        return new ResponseEntity<>(new SingleResDto<>(topicVoteResDtos), HttpStatus.OK);
    }

    /**
     * 투표 게시글에 좋아요(추천하기)
     * @param topicId 투표 게시글 ID Long
     * @param request HttpServletRequest 객체 - 토큰 확인
     * @return TopicLike Response DTO 클래스, HTTP Status 반환
     */
    @PatchMapping("/{topic-id}/like")
    public ResponseEntity postTopicLike(@PathVariable("topic-id") long topicId,
                                        HttpServletRequest request) {

        // 요청의 token으로부터 memberId 추출해 Member 클래스 생성
        Long memberId = jwtExtractUtil.extractMemberIdFromJwt(request);
        Member member = memberService.findMember(memberId);

        // Topic Service에서 투표 게시글 추천하기 후 Topic Like 객체 반환
        TopicLike topicLike = topicService.likeTopic(topicId, member);

        // 투표 게시글의 좋아요 수 반환 
        long numberOfTopicLikes = topicService.findNumberOfTopicLikes(topicId);

        // Topic Like 객체, 좋아요 수를 Response DTO 객체로 반환
        TopicLikeResDto topicLikeResDto = new TopicLikeResDto(topicLike, numberOfTopicLikes);

        // Topic Like Response DTO 객체와 HTTPStatus 반환
        return new ResponseEntity<>(new SingleResDto<>(topicLikeResDto), HttpStatus.OK);
    }

    /**
     * 투표 게시글을 수정하는 Patch 핸들러 메서드
     * @param topicId 투표 게시글 id Long
     * @param topicPatchReqDto 투표 게시글 수정용 DTO 클래스 TopicPatchReqDto
     * @param request HttpServletRequest 객체 - 토큰 확인용
     * @return TopicPostResDto 클래스에 대한 Response Entity, HTTP Status 반환
     */
    @PatchMapping("/{topic-id}")
    public ResponseEntity patchTopic(@PathVariable("topic-id") long topicId,
                                     @RequestBody TopicPatchReqDto topicPatchReqDto,
                                     HttpServletRequest request) {

        // 요청의 token으로부터 memberId 추출해 Member 클래스 생성
        Long memberId = jwtExtractUtil.extractMemberIdFromJwt(request);
        Member member = memberService.findMember(memberId);

        // 투표 게시글 저장
        Topic topic = topicService.updateTopic(topicPatchReqDto, topicId, member);

        // Topic 클래스를 ResponseDTO로 변환
        TopicPostResDto topicPostResDto = new TopicPostResDto(topic.getTopicId());

        return new ResponseEntity<> (new SingleResDto<>(topicPostResDto), HttpStatus.OK);
    }
}
