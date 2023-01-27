package TeamBigDipper.UYouBooDan.topic.dto;

import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import TeamBigDipper.UYouBooDan.topic.entity.TopicVoteItem;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class TopicPostReqDto {
    private String category;                // 카테고리
    private String title;                   // 제목
    private String content;                 // 내용
    private LocalDateTime closedAt;         // 마감일

    private List<TopicVoteItemPostDto> topicVoteItems;    // 투표 항목

    // 투표 항목에 대한 DTO 클래스
    @Getter
    public static class TopicVoteItemPostDto {
        private Long topicVoteItemId;           // 투표 항목 ID
        private String topicVoteItemName;       // 투표 항목 이름
    }

    /**
     * 투표 게시글 Topic Entity 클래스로 변환하는 메서드
     * @param memberId 작성자 id
     * @return Topic Entity 클래스
     */
    public Topic toTopic(Long memberId) {
        Topic topic = Topic.builder()
                .title(this.title)
                .content(this.content)
                .category(this.category)
                .closedAt(this.closedAt)
                .memberId(memberId)
                .build();

        // 투표 게시글 생성 상태로 변환
        topic.changeTopicStatusActive();

        return topic;
    }

    /**
     * 투표 항목 TopicVoteItem Entity 클래스를 원소로 갖는 리스트로 변환하는 메서드
     * @param topicId 투표 게시글 ID
     * @return TopicVoteItem Entity 클래스를 원소로 갖는 리스트
     */
    public List<TopicVoteItem> toTopicVoteItems(Long topicId) {
        return topicVoteItems.stream()
                .map(topicVoteItemPostDto -> {
                    return TopicVoteItem.builder()
                            .topicId(topicId)
                            .topicVoteItemName(topicVoteItemPostDto.getTopicVoteItemName())
                            .build();
                }).collect(Collectors.toList());
    }

}
