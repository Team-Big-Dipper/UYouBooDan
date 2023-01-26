package TeamBigDipper.UYouBooDan.comment.repository;

import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import TeamBigDipper.UYouBooDan.comment.entity.CommentLike;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
    CommentLike findByCommentIdAndMemberId(Long commentId, Long memberId);
    Boolean existsByCommentIdAndMemberId(Long commentId, Long memberId);
}
