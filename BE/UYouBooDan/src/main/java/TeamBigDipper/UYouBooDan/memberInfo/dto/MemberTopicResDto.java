package TeamBigDipper.UYouBooDan.memberInfo.dto;

import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import TeamBigDipper.UYouBooDan.topic.entity.TopicVoteItem;
import lombok.Getter;

import java.util.List;

@Getter
public class MemberTopicResDto extends BaseTimeEntity {

    private Long topicId;
    private String category;
    private String title;
    private String content;
    private String nickname;
    private String bestVote;  // 현재는 null반환, 추후 TopicVote구현 완료 후 값이 할당될 예정

    public MemberTopicResDto(Topic topic) {
        this.topicId = topic.getTopicId();
        this.category = topic.getCategory().getCategoryName();
        this.title = topic.getTitle();
        this.content = topic.getContent();
        this.nickname = topic.getMember().getNickname().getName();
//        this.bestVote = getBestVote(topic.getTopicVoteItems()).getTopicVoteItemName(); // 1위 투표 항목을 주입해주기 위한 생성자 필드

        super.setCreatedAt(topic.getCreatedAt());
        super.setModifiedAt(topic.getModifiedAt());

    }

    /**
     * @return 1위 투표(TopicVoteItem)
     */
//    private static TopicVoteItem getBestVote(List<TopicVoteItem> list) {
//        int temp = list.stream().mapToInt(a -> a.getTopicVote()).max().getAsInt();
//
//        return list.get(temp);
//    }
}
