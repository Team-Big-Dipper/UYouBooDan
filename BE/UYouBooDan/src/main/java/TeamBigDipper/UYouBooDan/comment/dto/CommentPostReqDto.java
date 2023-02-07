package TeamBigDipper.UYouBooDan.comment.dto;

import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class CommentPostReqDto {
    private String commentContent;

    public Comment toEntity(Long topicId, Long memberId){
        Comment comment = new Comment().builder()
                .memberId(memberId)
                .topicId(topicId)
                .commentContent(this.commentContent)
                .commentStatus(Comment.CommentStatus.ACTIVE)
                .build();
        comment.setCreatedAt(LocalDateTime.now());
        comment.setModifiedAt(LocalDateTime.now());

        return comment;
    }
}
