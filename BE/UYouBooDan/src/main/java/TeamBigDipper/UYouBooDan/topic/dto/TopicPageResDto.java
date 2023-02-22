package TeamBigDipper.UYouBooDan.topic.dto;

import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

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

    private Boolean isClosed;   // 투표가 마감됐는지 여부

    private List<String> theFirstItemNames; // 1위 투표 항목 - 공동 1위 포함
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
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));     // 작성일
        this.closedAt = topic.getClosedAt()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));     // 마감일
        isClosed = topic.isTopicClosed(LocalDateTime.now());       // 현재 시간으로부터 투표가 마감됐는지 여부 확인

        theFirstItemNames = new ArrayList<>();                          // DTO의 1위 투표 항목 이름 리스트 생성
        topic.findTheFirstVoteItemName();                               // 투표 게시글에서 1위 투표 항목 리스트 찾기
        theFirstItemNames.addAll(topic.getTheFirstItemNames());     // DTO의 1위 투표 항목 이름 리스트에 삽입

    }
}
