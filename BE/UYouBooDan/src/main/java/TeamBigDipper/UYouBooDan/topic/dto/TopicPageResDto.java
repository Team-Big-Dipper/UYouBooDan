package TeamBigDipper.UYouBooDan.topic.dto;

import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

/**
 * 투표 게시글 전체 목록 조회시 Response DTO 클래스
 */
@Getter
public class TopicPageResDto {
    private Long topicId;       // 투표 게시글 ID
    private String category;    // 카테고리
    private String title;       // 투표 게시글 제목
    private String nickName;    // 작성자
    private String createdAt;   // 작성 날짜
    private String closedAt;    // 마감날짜

    /**
     * TopicPageResDto 클래스 생성자
     * @param topic 투표 게시글 Topic 클래스
     */
    public TopicPageResDto(Topic topic) {
        this.topicId = topic.getTopicId();                          // 투표 게시글 ID
        this.category = topic.getCategory().getCategoryName();      // 카테고리
        this.title = topic.getTitle();                              // 투표 게시글 제목
        this.nickName = topic.getMember().getNickname().getName();  // 작성자 nickname
        this.createdAt = topic.getCreatedAt()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));     // 작성일
        this.closedAt = topic.getClosedAt()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));    // 마감일
    }
}
