package TeamBigDipper.UYouBooDan.topic.dto;

import lombok.Getter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

/**
 * 투표시 Request DTO 클래스
 */
@Getter
public class TopicVoteReqDto {

    @NotBlank(message = "투표하는 투표 항목은 공백이 아니어야 합니다")
    @Min(1)
    private Long topicVoteItemId;       // 투표 항목 ID
}
