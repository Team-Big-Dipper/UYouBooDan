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
public class TopicVote extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long topicVoteId;       // 투표 ID

    @ManyToOne                                  // 투표 항목과 다대일 관계
    @JoinColumn(name = "topic_vote_item_id")    // 외래키 - 투표 항목ID
    private TopicVoteItem topicVoteItem;        // 투표 항목

    @ManyToOne                                  // 사용자와 다대일 관계
    @JoinColumn(name = "member_id")             // 외래키 - 사용자 ID
    private Member member;                      // 투표자

    @ManyToOne                                  // 투표 게시글과 다대일 관계
    @JoinColumn(name = "topic_id")              // 외래키 - 투표 게시글ID
    private Topic topic;                        // 투표 게시글

    /**
     * TopicVote 클래스 생성자
     * @param topic 투표 게시글 객체 Topic
     * @param member 사용자 객체 Member
     * @param topicVoteItem 투표 항목 객체 TopicVoteItem
     */
    @Builder
    public TopicVote(Topic topic, Member member,
                     TopicVoteItem topicVoteItem) {
        this.topic = topic;
        this.topicVoteItem = topicVoteItem;
        this.member = member;
    }

    /**
     * 사용자가 투표 항목에 투표
     * @param topicVoteItem 투표할 투표 항목
     */
    public void voteTopicVoteItem(TopicVoteItem topicVoteItem) {
        this.topicVoteItem = topicVoteItem;
    }
}
