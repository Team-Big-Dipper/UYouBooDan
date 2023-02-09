package TeamBigDipper.UYouBooDan.topic.repository;

import TeamBigDipper.UYouBooDan.topic.entity.TopicVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TopicVoteRepository extends JpaRepository<TopicVote, Long> {

    /**
     * 사용자Id와 투표게시글ID를 통해 사용자가 투표 게시글에 투표했는지 조회
     * @param memberId 사용자 id Long
     * @param topicId 투표게시글 id Long
     * @return 투표 TopicVote 에 대한  Optional 객체
     */
    @Query(value = "SELECT t FROM TopicVote t WHERE t.topic.id = :topicId AND t.member.id = :memberId")
    Optional<TopicVote> findByMemberIdAndTopicId(@Param("memberId") Long memberId, @Param("topicId") Long topicId);
}
