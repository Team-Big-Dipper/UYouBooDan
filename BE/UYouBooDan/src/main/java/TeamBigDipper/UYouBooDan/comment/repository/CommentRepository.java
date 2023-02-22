package TeamBigDipper.UYouBooDan.comment.repository;

import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findAllByTopicIdOrderByCreatedAtDesc(Pageable pageable, Long topicId);
    List<Comment> findTop1ByTopicIdOrderByTotalLikeDesc(Long topicId);
    @Query(value = "SELECT * FROM Comment WHERE member_Id =:memberId ORDER BY createdAt DESC", nativeQuery = true)
    Page<Comment> findAllByMemberIdOrderByCreatedAtDesc(Pageable pageable, Long memberId);

}