package TeamBigDipper.UYouBooDan.comment.entity;

import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor @AllArgsConstructor
@Entity @Getter @Setter @Builder
public class Comment extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commendId;

    private Long memberId;

    private Long topicId;

    private String commentContent;

    private CommentStatus commentStatus;

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
