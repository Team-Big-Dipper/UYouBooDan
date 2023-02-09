package TeamBigDipper.UYouBooDan.topic.entity;

import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class TopicVoteItem extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long topicVoteItemId;       // 투표 항목 ID

    @ManyToOne                          // 투표 게시글과 다대일 관계
    @JoinColumn(name = "topic_id")      // 외래키는 Topic의 ID
    private Topic topic;                // 투표 게시글

    private String topicVoteItemName;   // 투표 항목 이름

    @OneToMany(mappedBy = "topicVoteItem", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<TopicVote> topicVotes;         // 투표항목에 누가 투표했는지

//    @Transient
//    private Integer numberOfVotes;             // 투표 수

    @Transient
    private Boolean topicVoteItemVoted;       // 조회하는 사람이 투표했는지 여부

    @Builder
    public TopicVoteItem(Topic topic, String topicVoteItemName) {
        this.topic = topic;
        this.topicVoteItemName = topicVoteItemName;
        topicVotes = new ArrayList<>();
    }

    public void voteTopicVoteItem(TopicVote topicVote) {
        topicVotes.add(topicVote);
    }

    public void cancelVote(TopicVote topicVote) {
        for (int i = 0; i < topicVotes.size(); i++) {
            TopicVote current = topicVotes.get(i);
            if (current.getTopicVoteId().equals(topicVote.getTopicVoteId())) {
                topicVotes.remove(current);
            }
        }
    }

    public Boolean isTopicVoteItemVoted(Long memberId) {
        for (TopicVote topicVote : topicVotes) {
            if (topicVote.getMember().getMemberId().equals(memberId)) {
                topicVoteItemVoted = true;
                return true;
            }
        }
        topicVoteItemVoted = false;
        return false;
    }
}
