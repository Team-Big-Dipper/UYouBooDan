package TeamBigDipper.UYouBooDan.memberInfo.controller;

import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import TeamBigDipper.UYouBooDan.global.dto.MultiResDto;
import TeamBigDipper.UYouBooDan.global.security.util.JwtExtractUtil;
import TeamBigDipper.UYouBooDan.memberInfo.service.MemberInfoService;
import TeamBigDipper.UYouBooDan.topic.dto.TopicPageResDto;
import TeamBigDipper.UYouBooDan.topic.entity.Topic;
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
     * @param request 로그인 한 memberId를 받기 위함
     * @param pageable pageable처리를 위함
     * @return 내가 쓴 게시글 조회
     */
    @GetMapping("/topics")
    public ResponseEntity<MultiResDto> getMemberTopics (HttpServletRequest request, Pageable pageable) {
        Long memberId = jwtExtractUtil.extractMemberIdFromJwt(request);
        Page<Topic> page = memberInfoService.findMemberTopics(memberId, pageable);
        Page<TopicPageResDto> resDtos = page.map(TopicPageResDto::new);
        List<TopicPageResDto> list = resDtos.stream().collect(Collectors.toList());

        return new ResponseEntity<>(new MultiResDto(list, page), HttpStatus.OK);
    }

    @GetMapping("/comments")
    public ResponseEntity<MultiResDto> getMemberComments (HttpServletRequest request, Pageable pageable) {
        Long memberId = jwtExtractUtil.extractMemberIdFromJwt(request);
        Page<Comment> page = memberInfoService.findMemberComment(memberId, pageable);

        return new ResponseEntity<>(new MultiResDto(null, null), HttpStatus.OK);
    }

}
