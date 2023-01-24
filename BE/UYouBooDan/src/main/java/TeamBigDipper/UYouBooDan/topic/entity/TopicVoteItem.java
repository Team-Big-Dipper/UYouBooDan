package TeamBigDipper.UYouBooDan.topic.entity;

import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
public class TopicVoteItem extends BaseTimeEntity {

    @Id
    private Long topicVoteItemId;       // 투표 항목 ID

    // 외래키
    // 연관 관계
    private Long topicVoteId;           // 투표 게시글 ID

    private String topicVoteItemName;   // 투표 항목 이름
}
