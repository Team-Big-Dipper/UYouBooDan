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
    private String bestVote;

    public MemberTopicResDto(Topic topic) {
        this.topicId = topic.getTopicId();
        this.category = topic.getCategory().getCategoryName();
        this.title = topic.getTitle();
        this.content = topic.getContent();
        this.nickname = topic.getMember().getNickname().getName();
        this.bestVote = getBestVote(topic.getTopicVoteItems()); // 1위 투표 항목을 주입해주기 위한 생성자 필드

        super.setCreatedAt(topic.getCreatedAt());
        super.setModifiedAt(topic.getModifiedAt());

    }

    /**
     * @return 1위 투표(TopicVoteItem)
     */
    private static String getBestVote(List<TopicVoteItem> list) {
        TopicVoteItem topicVoteItem = new TopicVoteItem();
        int count = -1;
        for(TopicVoteItem item : list) {
            if(item.getTopicVotes().size()>count) {
                count = item.getTopicVotes().size();
                topicVoteItem = item;
            }
        }
        return topicVoteItem.getTopicVoteItemName();
    }
}
