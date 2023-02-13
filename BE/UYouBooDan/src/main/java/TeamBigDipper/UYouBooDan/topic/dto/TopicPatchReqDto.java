package TeamBigDipper.UYouBooDan.topic.dto;

import lombok.Getter;

import java.util.List;

/**
 * 투표 게시글 수정에 대한 Request DTO 클래스
 */
@Getter
public class TopicPatchReqDto {
    private String category;                            // 카테고리
    private String title;                               // 제목
    private String content;                             // 내용
    private String closedAt;                            // 마감일
    private List<TopicVoteItemPatchDto> topicVoteItems; // 투표 항목

    @Getter
    public static class TopicVoteItemPatchDto {
        private String topicVoteItemName;       // 투표 항목 이름
    }
}
