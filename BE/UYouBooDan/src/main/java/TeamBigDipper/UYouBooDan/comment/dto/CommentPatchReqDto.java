package TeamBigDipper.UYouBooDan.comment.dto;

import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class CommentPatchReqDto extends BaseTimeEntity {
    private String commentContent;

    public Comment toEntity(Long commentId){
        Comment comment = new Comment().builder()
                .commendId(commentId)
                .commentContent(this.commentContent)
                .build();
        comment.setModifiedAt(LocalDateTime.now());

        return comment;
    }
}
