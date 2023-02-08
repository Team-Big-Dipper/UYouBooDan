package TeamBigDipper.UYouBooDan.comment.entity;

import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor @AllArgsConstructor
@Entity @Getter @Setter @Builder
public class Comment extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commendId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    private Member member;

    @Column(name = "member_id")
    private Long memberId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "topic_id", insertable = false, updatable = false)
    private Topic topic;

    @Column(name = "topic_id")
    private Long topicId;

    private String commentContent;

    private CommentStatus commentStatus;

    private int totalLike;

//    public Comment(Long memberId, Long topicId){
//        this.memberId = memberId;
//        this.topicId = topicId;
//    }

    public enum CommentStatus {
        ACTIVE(0, "활성화"),
        REMOVED(1, "삭제된 댓글");

        @Getter
        private int code;
        @Getter
        private String message;

        CommentStatus(int code, String message) {
            this.code = code;
            this.message = message;
        }
    }
}
