package TeamBigDipper.UYouBooDan.comment.dto;

import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CommentResDto extends BaseTimeEntity {
    private Long commentId;
    private Long memberId;
    private Long topicId;
    private String commentContent;
    private Comment.CommentStatus commentStatus;

    public CommentResDto(Comment comment){
        this.commentId = comment.getCommendId();
        this.memberId = comment.getMemberId();
        this.topicId = comment.getTopicId();
        this.commentContent = comment.getCommentContent();
        this.commentStatus = comment.getCommentStatus();
        setCreatedAt(comment.getCreatedAt());
        setModifiedAt(comment.getModifiedAt());
    }
}
