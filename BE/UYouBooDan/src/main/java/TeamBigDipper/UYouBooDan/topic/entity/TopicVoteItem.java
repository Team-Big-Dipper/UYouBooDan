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

    /**
     * TopicVoteItem 객체 생성자
     * @param topic 투표 게시글 Topic 객체
     * @param topicVoteItemName 투표 항목 이름 String 객체
     * @param topicVoteItemId 투표 항목 Id Long 객체
     */
    @Builder
    public TopicVoteItem(Topic topic, String topicVoteItemName, Long topicVoteItemId) {
        this.topic = topic;
        this.topicVoteItemName = topicVoteItemName;
        this.topicVoteItemId = topicVoteItemId;
        topicVotes = new ArrayList<>();
    }

    /**
     * 해당 투표 항목에 투표 추가
     * @param topicVote 투표 TopicVote 객체
     */

    public void voteTopicVoteItem(TopicVote topicVote) {
        topicVotes.add(topicVote);
    }

    /**
     * 투표 취소하기
     * @param topicVote 투표 TopicVote객체
     */
    public void cancelVote(TopicVote topicVote) {
        // 투표 TopicVote객체 리스트 순회하면서
        for (int i = 0; i < topicVotes.size(); i++) {
            TopicVote current = topicVotes.get(i);
            // 투표 항목에 되어있는 투표 TopicVote 의 id와 현재 투표 TopicVote id가 같으면
            if (current.getTopicVoteId().equals(topicVote.getTopicVoteId())) {
                // 투표 TopicVote 객체 리스트에서 현재 TopicVote 객체 제거
                topicVotes.remove(current);
            }
        }
    }

    /**
     * 사용자가 해당 투표 항목에 투표했는지 여부 확인
     * @param memberId 사용자 id Long
     * @return 투표했으면 true, 안했으면 false 반환
     */

    public Boolean isTopicVoteItemVoted(Long memberId) {
        // 투표 TopicVote 객체 리스트 순회하면서
        for (TopicVote topicVote : topicVotes) {
            // 투표 TopicVote 객체의 Member id와 사용자의 id가 같으면
            if (topicVote.getMember().getMemberId().equals(memberId)) {
                topicVoteItemVoted = true;      // 투표한 것으로 처리
                return true;
            }
        }
        // 리스트 다 순회하면 사용자는 투표를 하지 않음
        topicVoteItemVoted = false;
        return false;
    }

    /**
     * 투표 항목의 투표 수 계산
     * @return 투표 항목의 투표 수
     */
    public int findNumberOfVoteInItem() {
        return topicVotes.size();
    }
}
