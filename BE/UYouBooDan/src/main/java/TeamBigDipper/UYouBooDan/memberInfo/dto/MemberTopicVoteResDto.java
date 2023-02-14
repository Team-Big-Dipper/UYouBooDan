package TeamBigDipper.UYouBooDan.memberInfo.dto;

import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import TeamBigDipper.UYouBooDan.topic.entity.TopicVote;
import lombok.Getter;


/**
 * 내가 선택한 TopicVote Page 조회용 DTO
 * Topic-TopicVoteItem 양방향 매핑 | TopicVoteItem-TopicVote 양방향 매핑으로인한 순환참조 이슈를 해결하기 위해,
 * DTO에 필요한 항목에 한해서 반환
 */
@Getter
public class MemberTopicVoteResDto extends BaseTimeEntity {
    private Long topicVoteId;
    private Long topicId;
    private String content;
    private Long topicVoteItemId;
    private String topicVoteItemName;
    private Long memberId;
    private String nickname;

    public MemberTopicVoteResDto(TopicVote topicVote) {
        this.topicVoteId = topicVote.getTopicVoteId();
        this.topicId = topicVote.getTopic().getTopicId();
        this.content = topicVote.getTopic().getContent();
        this.topicVoteItemId = topicVote.getTopicVoteItem().getTopicVoteItemId();
        this.topicVoteItemName = topicVote.getTopicVoteItem().getTopicVoteItemName();
        this.memberId = topicVote.getMember().getMemberId();
        this.nickname = topicVote.getMember().getNickname().getName();
        super.setCreatedAt(topicVote.getCreatedAt());
        super.setModifiedAt(topicVote.getModifiedAt());
    }

}
