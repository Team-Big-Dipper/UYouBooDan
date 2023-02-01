package TeamBigDipper.UYouBooDan.topic.entity;

import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class TopicVoteItem extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long topicVoteItemId;       // 투표 항목 ID

    @ManyToOne                          // 투표 게시글과 다대일 관계
    @JoinColumn(name = "TOPIC_ID")      // 외래키는 Topic의 ID
    private Topic topic;                // 투표 게시글

    private String topicVoteItemName;   // 투표 항목 이름

//    @OneToMany(mappedBy = "topic")
//    private List<TopicVote> topicVotes;     // 투표항목에 누가 투표했는지

    @Transient
    private Integer numberOfVotes;             // 투표 수

    @Transient
    private Boolean isTopicVoteItemVoted;       // 조회하는 사람이 투표했는지 여부

    @Builder
    public TopicVoteItem(Topic topic, String topicVoteItemName) {
        this.topic = topic;
        this.topicVoteItemName = topicVoteItemName;
    }
}
