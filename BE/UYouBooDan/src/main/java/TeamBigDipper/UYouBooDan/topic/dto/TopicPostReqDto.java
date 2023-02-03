package TeamBigDipper.UYouBooDan.topic.dto;

import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import TeamBigDipper.UYouBooDan.topic.entity.TopicVoteItem;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class TopicPostReqDto {
    private String category;                // 카테고리
    private String title;                   // 제목
    private String content;                 // 내용
    private String closedAt;         // 마감일

    private List<TopicVoteItemPostDto> topicVoteItems;    // 투표 항목

    // 투표 항목에 대한 DTO 클래스
    @Getter
    public static class TopicVoteItemPostDto {
        private String topicVoteItemName;       // 투표 항목 이름
    }

    /**
     * 투표 게시글 Topic Entity 클래스로 변환하는 메서드
     * @param member 작성자 Member 클래스
     * @return Topic Entity 클래스
     */
    public Topic toTopic(Member member) {
        Topic topic = Topic.builder()
                .title(this.title)
                .content(this.content)
                .category(this.category)
                .closedAt(this.closedAt)
                .member(member)
                .build();

        // 투표 게시글 생성 상태로 변환
        topic.changeTopicStatusActive();

        // 투표 게시글에 투표 항목 추가
        topicVoteItems.stream()
                .map(topicVoteItemPostDto -> {
                    TopicVoteItem topicVoteItem = TopicVoteItem.builder()
                                    .topic(topic)
                                    .topicVoteItemName(topicVoteItemPostDto.getTopicVoteItemName())
                                    .build();
                    return topicVoteItem;})
                .forEach(topicVoteItem -> topic.addTopicVoteItem(topicVoteItem));

        return topic;
    }

//    /**
//     * 투표 항목 TopicVoteItem Entity 클래스를 원소로 갖는 리스트로 변환하는 메서드
//     * @param topicId 투표 게시글 ID
//     * @return TopicVoteItem Entity 클래스를 원소로 갖는 리스트
//     */
//    public List<TopicVoteItem> toTopicVoteItems(Long topicId) {
//        return topicVoteItems.stream()
//                .map(topicVoteItemPostDto -> {
//                    return TopicVoteItem.builder()
//                            .topicId(topicId)
//                            .topicVoteItemName(topicVoteItemPostDto.getTopicVoteItemName())
//                            .build();
//                }).collect(Collectors.toList());
//    }

}
