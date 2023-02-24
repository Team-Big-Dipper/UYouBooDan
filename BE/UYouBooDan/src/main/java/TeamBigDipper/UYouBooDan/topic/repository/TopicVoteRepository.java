package TeamBigDipper.UYouBooDan.topic.repository;

import TeamBigDipper.UYouBooDan.topic.entity.TopicVote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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


    /**
     * 사용자 Id와 일치하는 TopicVote를 조회하며, 해당 TopicVote에 맞는 Topic과 TopicVoteItem을 join하여 반환
     * @param memberId
     * @param pageable
     * @return TopicVote에 대한 Page 데이터 반환 (단, Topic-TopicVoteItem 양방향 매핑 | TopicVoteItem-TopicVote 양방향 매핑으로인한 순환참조 존재 => DTO에서 처리 )
     */
    @Query(value = "SELECT tv.* FROM TopicVote tv " +
        "INNER JOIN TopicVoteItem tvi ON tv.topic_vote_item_id = tvi.topicVoteItemId " +
        "INNER JOIN Topic t ON tv.topic_id = t.topicId " +
        "WHERE tv.member_id =:memberId", nativeQuery = true)
    Page<TopicVote> findAllByMemberIdWithTopicAndTopicVoteItem(@Param("memberId") Long memberId, Pageable pageable);

}