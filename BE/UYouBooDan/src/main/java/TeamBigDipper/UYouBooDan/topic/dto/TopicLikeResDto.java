package TeamBigDipper.UYouBooDan.topic.dto;

import TeamBigDipper.UYouBooDan.topic.entity.TopicLike;
import lombok.Getter;

/**
 * 투표 게시글에 좋아요에 대한 Response DTO 클래스
 */
@Getter
public class TopicLikeResDto {
    private Long topicId;       // 투표 게시글 id
    private Long memberId;      // 사용자 id
    private Long topicLikeId;   // 좋아요 id
    private Boolean topicLikeStatus;    // 게시글의 좋아요 상태

    private Long numberOfLikes;         // 해당 게시글의 좋아요 수

    /**
     * TopicLike Response DTO 클래스 생성자
     * @param topicLike 좋아요 엔티티 클래스 TopicLike
     * @param numberOfLikes 좋아요 수 Long
     */
    public TopicLikeResDto(TopicLike topicLike, Long numberOfLikes) {
        this.topicId = topicLike.getTopic().getTopicId();
        this.memberId = topicLike.getMember().getMemberId();
        this.topicLikeId = topicLike.getTopicLikeId();
        this.topicLikeStatus = topicLike.getTopicLikeStatus();
        this.numberOfLikes = numberOfLikes;
    }
}
