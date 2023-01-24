package TeamBigDipper.UYouBooDan.topic.entity;

import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
public class TopicLike extends BaseTimeEntity {
    @Id
    private Long topicLikeId;       // 투표 게시글 좋아요 ID

    // 외래 키
    // 연관 관계
    private Long topicId;           // 투표 게시글 ID

    // 외래 키
    // 연관 관계
    private Long memberId;          // 좋아요 한 사용자 ID

    private Boolean topicLikeStatus;        // 좋아요 여부
}
