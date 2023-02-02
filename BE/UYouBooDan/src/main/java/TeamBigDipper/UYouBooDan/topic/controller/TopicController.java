package TeamBigDipper.UYouBooDan.topic.controller;

import TeamBigDipper.UYouBooDan.global.dto.MultiResDto;
import TeamBigDipper.UYouBooDan.global.dto.SingleResDto;
import TeamBigDipper.UYouBooDan.global.security.util.JwtExtractUtil;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.member.service.MemberService;
import TeamBigDipper.UYouBooDan.topic.dto.TopicPageResDto;
import TeamBigDipper.UYouBooDan.topic.dto.TopicPostReqDto;
import TeamBigDipper.UYouBooDan.topic.dto.TopicPostResDto;
import TeamBigDipper.UYouBooDan.topic.dto.TopicResDto;
import TeamBigDipper.UYouBooDan.topic.entity.Topic;
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
     * @param topicId 투표 게시글의 id
     * @return 조회된 투표게시글 상세, HTTP Status
     */
    @GetMapping("/{topic-id}")
    public ResponseEntity getTopic(@PathVariable("topic-id") long topicId) {
        // topic Service에서 topic id로 투표 게시글 topic 조회
        Topic topic = topicService.findTopic(topicId);

        // 투포 게시글 topic을 Response DTO 객체로 변환
        TopicResDto topicResDto = new TopicResDto(topic);

        // 투표 게시글 topic responseDTO, HTTP Status OK 리턴
        return new ResponseEntity<>(new SingleResDto<>(topicResDto), HttpStatus.OK);
    }

    /**
     * 투표 게시글 전체 조회
     * @param pageable Pageable 객체
     * @return 투표게시글 전체 리스트, Page 관련 정보, HttpStatus
     */
    @GetMapping
    public ResponseEntity<MultiResDto> getTopics(Pageable pageable) {
        // TopicService에서 투표 게시글 Topic Page 반환
        Page<Topic> topicPage = topicService.findTopics(pageable);

        // Page Topic을 Response DTO로 변환
        Page<TopicPageResDto> topicPageResDtos = topicPage.map(TopicPageResDto::new);

        // Topic Response DTO를 리스트로 변환
        List<TopicPageResDto> topicPageResDtoList = topicPageResDtos.stream()
                                                        .collect(Collectors.toList());

        // Topic Page Response DTO, Page 정보, HTTP Status 반환
        return new ResponseEntity<>(new MultiResDto<>(topicPageResDtoList, topicPage), HttpStatus.OK);
    }

}
