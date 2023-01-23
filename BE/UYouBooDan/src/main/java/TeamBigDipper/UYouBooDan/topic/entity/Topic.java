package TeamBigDipper.UYouBooDan.topic.entity;

import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
public class Topic extends BaseTimeEntity {

    @Id
    private Long topicId;                   // 투표 게시글 ID

    private String title;                    // 제목

    // 외래키
    // 연관 관계
    private Long memberId;                  // 작성자 ID

    private String content;                 // 투표 게시글 내용

    // private Long topicVoteId;               // 투표 Id

    // private TopicStatus topicStatus;     // 투표 게시글 상태

    private Category category;              // 카테고리

    private LocalDateTime closedAt;         // 마감 날짜

    public enum Category {

    }

}
