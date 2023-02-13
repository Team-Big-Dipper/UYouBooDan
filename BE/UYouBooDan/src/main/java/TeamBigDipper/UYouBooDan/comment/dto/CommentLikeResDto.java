package TeamBigDipper.UYouBooDan.comment.dto;

import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import TeamBigDipper.UYouBooDan.comment.entity.CommentLike;
import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CommentLikeResDto extends BaseTimeEntity {
    private Long commentLikeId;

    private Long memberId;

    private Long commentId;

    private Boolean commentLikeStatus;

    private int totalLike;

    public CommentLikeResDto(CommentLike commentLike, int totalLike){
        this.commentLikeId = commentLike.getCommentId();
        this.memberId = commentLike.getMemberId();
        this.commentId = commentLike.getCommentId();
        this.commentLikeStatus = commentLike.getCommentLikeStatus();
        this.totalLike = totalLike;
        setCreatedAt(commentLike.getCreatedAt());
        setModifiedAt(commentLike.getModifiedAt());


    }
}
