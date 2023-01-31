package TeamBigDipper.UYouBooDan.topic.dto;

import lombok.Getter;

@Getter
public class TopicPostResDto {
    private Long topicId;       // 투표 게시글 ID

    public TopicPostResDto(long topicId) {
        this.topicId = topicId;
    }
}