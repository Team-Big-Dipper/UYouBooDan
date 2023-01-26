package TeamBigDipper.UYouBooDan.comment.repository;

import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findAllByTopicIdOrderByCreatedAtDesc(Pageable pageable, Long topicId);
    }