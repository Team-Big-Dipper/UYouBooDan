package TeamBigDipper.UYouBooDan.comment.dto;

import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import TeamBigDipper.UYouBooDan.comment.entity.CommentStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class CommentPostReqDto {
    private String commentContent;
    private Long memberId;
    private Long topicId;

    public Comment toEntity(Long topicId){
        Comment comment = new Comment().builder()
                .memberId(this.memberId)
                .topicId(topicId)
                .commentContent(this.commentContent)
                .commentStatus(CommentStatus.ACTIVE)
                .build();
        comment.setCreatedAt(LocalDateTime.now());
        comment.setModifiedAt(LocalDateTime.now());

        return comment;
    }
}
