package TeamBigDipper.UYouBooDan.topic.dto;

import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import TeamBigDipper.UYouBooDan.topic.entity.TopicVoteItem;
import lombok.Builder;
import lombok.Getter;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * 투표 게시글 상세 조회 응답 Response DTO 클래스
 */
@Getter
public class TopicResDto {

    private Long topicId;       // 투표 게시글 ID
    private String category;    // 카테고리
    private String title;       // 투표 게시글 제목
    private String content;     // 투표 게시글 내용

    private List<TopicVoteItemResDto> topicVoteItems;    // 투표 항목
    private String closedAt;    // 투표 마감일

    private String createdAt;   // 작성일

    private String author;      // 작성자
    private Boolean isAuthor;   // 조회하는 사람이 작성자인지
    private Boolean isVoted;    // 조회하는 사람이 투표했는지

    private Long views;         // 조회 수
    private Long likes;         // 좋아요 수

    /**
     * 투표 게시글 Topic 객체를 Topic Response DTO 클래스로 변환하는 생성자
     * @param topic 투표 게시글 Topic 객체
     */
    public TopicResDto(Topic topic) {
        this.topicId = topic.getTopicId();                      // 투표 게시글 ID
        this.category = topic.getCategory().getCategoryName();  // 카테고리 
        this.title = topic.getTitle();                          // 투표 게시글 제목
        this.content = topic.getContent();                      // 투표게시글 내용
        this.createdAt = topic.getCreatedAt()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));     // 작성일 
        this.closedAt = topic.getClosedAt() 
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));    // 마감일
        topicVoteItems = new ArrayList<>();     // 투표 항목 리스트 생성

        // 투표 게시글 Topic에 있는 투표 항목들을 가져와서 DTO 객체의 투표 항목에 추가
        topic.getTopicVoteItems().stream()
                .map( topicVoteItem -> {
                    TopicVoteItemResDto topicVoteItemResDto = TopicVoteItemResDto.builder()
                            .topicVoteItemId(topicVoteItem.getTopicVoteItemId())
                            .topicVoteItemName(topicVoteItem.getTopicVoteItemName())
                            .build();
                    return topicVoteItemResDto;})
                .forEach(topicVoteItemResDto -> topicVoteItems.add(topicVoteItemResDto));

        this.author = topic.getMember().getNickname().getName();    // 작성자 nickname

        // TODO: 투표 게시글을 조회하는 사람이 작성자인지 투표했는지 여부
//        this.isAuthor = topic.getIsAuthor();        // 조회하는 사람이 작성자인지 여부
//        this.isVoted = topic.getIsVoted();          // 조회하는 사람이 투표했는지 여부

        // TODO: 투표 게시글의 조회수, 좋아요 수
        // views
        // likes
    }

    /**
     * 투표 항목에 대한 DTO 클래스
     */
    @Builder
    @Getter
    public static class TopicVoteItemResDto {
        private Long topicVoteItemId;           // 투표항목 ID
        private String topicVoteItemName;       // 투표 항목 이름
        private Integer numberOfVotes;          // 투표 수
        private Boolean isTopicVoteItemVoted;   // 조회자가 투표 항목에다 투표 했는지
    }

}
