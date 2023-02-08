package TeamBigDipper.UYouBooDan.comment.dto;

import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class CommentPostReqDto {
    private String commentContent;

    public Comment toEntity(Long topicId, Member member){
        Comment comment = new Comment().builder()
                .memberId(member)
                .topicId(topicId)
                .commentContent(this.commentContent)
                .commentStatus(Comment.CommentStatus.ACTIVE)
                .build();
        comment.setCreatedAt(LocalDateTime.now());
        comment.setModifiedAt(LocalDateTime.now());

        return comment;
    }
}
