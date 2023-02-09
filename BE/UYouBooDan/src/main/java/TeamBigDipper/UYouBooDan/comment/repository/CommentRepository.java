package TeamBigDipper.UYouBooDan.comment.repository;

import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findAllByTopicIdOrderByCreatedAtDesc(Pageable pageable, Long topicId);
    List<Comment> findTop1ByTopicIdOrderByTotalLikeDesc(Long topicId);
    @Query(value = "SELECT * FROM Comment comment WHERE comment.member_Id =:memberId ORDER BY createdAt DESC", nativeQuery = true)
    Page<Comment> findAllByMemberIdOrderByCreatedAtDesc(Pageable pageable, Long memberId);

    /**
     * *** Comment 엔티티에 member Id에 대한 매핑 필요 ***
     *
     * 내가 쓴 댓글 목록을 Pagination 적용하여 작성일 역순으로 조회
     * @param memberId 현재 로그인 한 유저의 식별자
     * @param pageable Pagination 파라미터
     * @return
     */
//    @Query(value = "SELECT * FROM Comment comment WHERE comment.member =:memberId ORDER BY createdAt DESC", nativeQuery = true)
//    Page<Comment> findAllByMemberIdOrderByCreatedAtDesc(@Param("memberId") Long memberId, Pageable pageable);

}