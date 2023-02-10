package TeamBigDipper.UYouBooDan.topic.repository;

import TeamBigDipper.UYouBooDan.topic.entity.TopicLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

/**
 * 투표 게시글 좋아요에 대한 Repository
 */
public interface TopicLikeRepository extends JpaRepository<TopicLike, Long> {
    /**
     * 투표 게시글 id, 사용자 id를 통해서 게시글에 좋아요했는지 조회
     * @param topicId 투표 게시글 id Long
     * @param memberId 사용자 id Long
     * @return TopicLike 객체에 대한 Optional 객체
     */
    @Query(value = "SELECT t FROM TopicLike t WHERE t.topic.id = :topicId AND t.member.id = :memberId")
    Optional<TopicLike> findByTopicIdAndMemberId(Long topicId, Long memberId);

}
