package TeamBigDipper.UYouBooDan.topic.entity;

import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class TopicLike extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long topicLikeId;       // 투표 게시글 좋아요 ID

    // 외래 키
    // 연관 관계
    @ManyToOne                      // 투표 게시글과 다대일 관계
    @JoinColumn(name = "topic_id")  // 외래키 - 투표 게시글 ID
    private Topic topic;           // 투표 게시글 ID

    @ManyToOne                      // 사용자와 다대일 관계
    @JoinColumn(name = "member_id") // 외래키 - 사용자 ID
    private Member member;          // 좋아요 한 사용자 ID

    private Boolean topicLikeStatus;        // 좋아요 여부

    /**
     * TopicLike 좋아요 객체 생성자
     * @param topic
     * @param member
     */
    @Builder
    public TopicLike(Topic topic, Member member) {
        this.topic = topic;
        this.member = member;
    }

    /**
     * 좋아요 상태로 전환
     * @return
     */
    public Boolean changeTopicLikeStatusTrue() {
        topicLikeStatus = true;
        return topicLikeStatus;
    }

    /**
     * 좋아요 취소한 사태로 전환
     * @return
     */
    public Boolean changeTopicLikeStatusFalse() {
        topicLikeStatus = false;
        return topicLikeStatus;
    }

}
