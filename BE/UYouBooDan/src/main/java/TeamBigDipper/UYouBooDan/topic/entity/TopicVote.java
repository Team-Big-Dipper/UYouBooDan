package TeamBigDipper.UYouBooDan.topic.entity;

import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
public class TopicVote extends BaseTimeEntity {
    @Id
    private Long topicVoteId;       // 투표 ID

    // 외래 키
    // 연관 관계
    private Long topicVoteItemId;    // 투표 항목 ID

    // 외래 키
    // 연관 관계
    private Long memberId;           // 투표자 ID
}
