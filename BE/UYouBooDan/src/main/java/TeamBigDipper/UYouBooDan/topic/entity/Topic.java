package TeamBigDipper.UYouBooDan.topic.entity;

import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
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

    @Enumerated(EnumType.STRING)
     private TopicStatus topicStatus;     // 투표 게시글 상태

    private Category category;              // 카테고리

    private LocalDateTime closedAt;         // 마감 날짜

    @OneToMany(mappedBy = "topic", cascade = CascadeType.PERSIST)
    private List<TopicVoteItem> topicVoteItems;      // 투표 항목

    @Builder
    public Topic(String title, String content, String category,
                 Member member, LocalDateTime closedAt) {
        this.title = title;
        this.content = content;
        this.closedAt = closedAt;
        this.category = Category.valueOf(category);
        this.member = member;
        topicVoteItems = new ArrayList<>();
    }

    public void addTopicVoteItem(TopicVoteItem topicVoteItem) {
        topicVoteItems.add(topicVoteItem);
    }

    public void changeTopicStatusActive() {
        topicStatus = TopicStatus.ACTIVE;
    }
    public void changeTopicStatusRemoved() {
        topicStatus = TopicStatus.REMOVED;
    }

    public enum Category {
        Food("음식")
        ;

        @Getter
        private String categoryName;

        Category(String categoryName) {
            this.categoryName = categoryName;
        }
    }

    public enum TopicStatus {
        ACTIVE(0, "활성화"),
        REMOVED(1, "삭제된 게시글")
        ;

        @Getter
        private int code;

        @Getter
        private String message;

        TopicStatus(int code, String message) {
            this.code = code;
            this.message = message;
        }
    }

}
