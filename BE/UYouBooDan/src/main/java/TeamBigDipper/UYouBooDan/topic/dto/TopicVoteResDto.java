package TeamBigDipper.UYouBooDan.topic.dto;

import TeamBigDipper.UYouBooDan.topic.entity.TopicVoteItem;
import lombok.Getter;

/**
 * 투표 후 Response DTO 클래스
 */
@Getter
public class TopicVoteResDto {
    private Long topicVoteItemId;       // 투표 항목 ID
    private String topicVoteItemName;   // 투표 항목 이름
    private Integer numberOfVotes;      // 투표 수
    private Boolean isTopicVoteItemVoted;   // 사용자가 해당 투표항목을 투표했는지

    /**
     * TopicVoteResDto 클래스 생성자
     * @param topicVoteItem 투표 항목 객체 TopicVoteItem
     */
    public TopicVoteResDto(TopicVoteItem topicVoteItem) {
        this.topicVoteItemId = topicVoteItem.getTopicVoteItemId();
        this.topicVoteItemName = topicVoteItem.getTopicVoteItemName();
        this.numberOfVotes = topicVoteItem.getTopicVotes().size();
        this.isTopicVoteItemVoted = topicVoteItem.getTopicVoteItemVoted();
    }
}