package TeamBigDipper.UYouBooDan.topic.dto;

import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import TeamBigDipper.UYouBooDan.topic.entity.TopicVoteItem;
import lombok.Getter;

import java.util.List;

/**
 * 투표 게시글 수정에 대한 Request DTO 클래스
 */
@Getter
public class TopicPatchReqDto {
    private String category;                            // 카테고리
    private String title;                               // 제목
    private String content;                             // 내용
    private String closedAt;                            // 마감일
    private List<TopicVoteItemPatchDto> topicVoteItems; // 투표 항목

    @Getter
    public static class TopicVoteItemPatchDto {
        private Long topicVoteItemId;           // 투표 항목 ID
        private String topicVoteItemName;       // 투표 항목 이름
    }

    /**
     * TopicPatchReqDto 클래스를 투표 게시글 Topic Entity 클래스로 변환하는 메서드
     * @param member 작성자 Member 클래스
     * @return Topic Entity 클래스
     */
    public Topic toEntity(Member member) {
        Topic topic = Topic.builder()
                .title(this.title)
                .content(this.content)
                .category(this.category)
                .closedAt(this.closedAt)
                .member(member)
                .build();

        // 투표 게시글에 투표 항목 추가
        topicVoteItems.stream()
                .map(topicVoteItemPatchDto -> {
                    TopicVoteItem topicVoteItem = TopicVoteItem.builder()
                            .topicVoteItemId(topicVoteItemPatchDto.getTopicVoteItemId())
                            .topic(topic)
                            .topicVoteItemName(topicVoteItemPatchDto.getTopicVoteItemName())
                            .build();
                    return topicVoteItem;})
                .forEach(topicVoteItem -> topic.addTopicVoteItem(topicVoteItem));

        return topic;
    }
}
