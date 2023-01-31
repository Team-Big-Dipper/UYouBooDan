package TeamBigDipper.UYouBooDan.topic.controller;

import TeamBigDipper.UYouBooDan.global.dto.SingleResDto;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.topic.dto.TopicPostReqDto;
import TeamBigDipper.UYouBooDan.topic.dto.TopicPostResDto;
import TeamBigDipper.UYouBooDan.topic.dto.TopicResDto;
import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import TeamBigDipper.UYouBooDan.topic.entity.TopicVoteItem;
import TeamBigDipper.UYouBooDan.topic.service.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/topics")
@RequiredArgsConstructor
public class TopicController {

    private final TopicService topicService;


    @PostMapping
    public ResponseEntity<SingleResDto<TopicPostResDto>> postTopic(@RequestBody TopicPostReqDto topicPostReqDto) {

        // TODO: token으로부터 memberId 받아서 Member클래스로 변환
        Member member;

        // 투표 게시글 저장
        Topic topic = topicService.createTopic(topicPostReqDto.toTopic(member));

        // 투표 게시글에 대한 투표 항목 저장
//        List<TopicVoteItem> topicVoteItems = topicService.createTopicVoteItems(topicPostReqDto.toTopicVoteItems(topic.getTopicId()));

        // Topic 클래스를 ResponseDTO로 변환
        TopicPostResDto topicPostResDto = new TopicPostResDto(topic.getTopicId());

        return new ResponseEntity<>(new SingleResDto<>(topicPostResDto), HttpStatus.CREATED);
    }

}
