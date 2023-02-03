package TeamBigDipper.UYouBooDan.topic.entity;

import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Topic extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long topicId;                   // 투표 게시글 ID

    private String title;                    // 제목

    @ManyToOne                              // Member와는 다대일 관계
    @JoinColumn(name = "MEMBER_ID")         // 외래키는 Member의 Id
    private Member member;                  // 작성자 ID

    private String content;                 // 투표 게시글 내용

    // private Long topicVoteId;            // 투표 Id

    @Enumerated(EnumType.STRING)         // Enum을 String으로 저장
    private TopicStatus topicStatus;     // 투표 게시글 상태

    @Enumerated(EnumType.STRING)            // Enum을 String으로 저장
    private Category category;              // 카테고리

    private LocalDateTime closedAt;         // 마감 날짜 (yyyy-MM-dd HH:mm:ss ex. 2023-01-01 13:00:00)

    @OneToMany(mappedBy = "topic", cascade = CascadeType.PERSIST)       // 일대다 맵핑, PERSIST로 TopicVoteItem도 같이 저장
    private List<TopicVoteItem> topicVoteItems;      // 투표 항목

    @Transient
    private Boolean isAuthor;       // 조회하는 사람이 작성자인지 여부

    @Transient
    private Boolean isVoted;        // 조회하는 사람이 투표했는지 여부

    @Builder
    public Topic(String title, String content, String category,
                 Member member, String closedAt) {
        this.title = title;
        this.content = content;
        this.closedAt = LocalDateTime.parse(closedAt, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.category = Category.nameOf(category);
        this.member = member;
        topicVoteItems = new ArrayList<>();
    }

    /**
     * 투표 항목 추가
     * @param topicVoteItem 투표항목 클래스
     */
    public void addTopicVoteItem(TopicVoteItem topicVoteItem) {
        topicVoteItems.add(topicVoteItem);
    }

    /**
     * 투표 게시글을 활성화 상태로 전환
     */
    public void changeTopicStatusActive() {
        topicStatus = TopicStatus.ACTIVE;
    }

    /**
     * 투표 게시글을 삭제 상태로 변환
     */
    public void changeTopicStatusRemoved() {
        topicStatus = TopicStatus.REMOVED;
    }

    /**
     * 카테고리 enum 클래스
     */
    @Getter
    public enum Category {
        Food("음식")
        ;

        @Getter
        private String categoryName;

        Category(String categoryName) {
            this.categoryName = categoryName;
        }

        /**
         * 한글로된 카테고리 이름을 Category Enum 으로 변경
         * @param categoryName 한글로된 카테고리 이름
         * @return Category Enum
         */
        public static Category nameOf(String categoryName) {
            for (Category category : Category.values()) {
                if (category.getCategoryName().equals(categoryName)){
                    return category;
                }
            }
            return null;
        }
    }

    /**
     * 게시글 상태 관리
     */
    public enum TopicStatus {
        ACTIVE("활성화"),
        REMOVED("삭제된 게시글")
        ;

        @Getter
        private String message;

        TopicStatus(String message) {
            this.message = message;
        }
    }
}
