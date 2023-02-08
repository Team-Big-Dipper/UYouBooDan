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
    private int totalLike;

    public CommentResDto(Comment comment){
        this.commentId = comment.getCommendId();
        this.memberId = comment.getMemberId().getMemberId();
//        Member member = new Member();
//        member.setMemberId(comment.getMember().getMemberId());
        this.topicId = comment.getTopicId();
        this.commentContent = comment.getCommentContent();
        this.commentStatus = comment.getCommentStatus();
        this.totalLike = comment.getTotalLike();
        setCreatedAt(comment.getCreatedAt());
        setModifiedAt(comment.getModifiedAt());
    }
}
