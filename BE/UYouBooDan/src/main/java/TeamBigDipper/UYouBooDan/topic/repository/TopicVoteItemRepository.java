package TeamBigDipper.UYouBooDan.topic.repository;

import TeamBigDipper.UYouBooDan.topic.entity.TopicVoteItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TopicVoteItemRepository extends JpaRepository<TopicVoteItem, Long> {
    /**
     * 투표 게시글 ID를 이용하여 투표 게시글에 저장된 투표항목 리스트 조회
     * @param topicId 투표게시글 ID
     * @return 투표항목 TopicVoteItem 객체를 원소로하는 리스트
     */
    @Query(value = "SELECT t FROM TopicVoteItem t WHERE t.topic.id = :topicId")
    List<TopicVoteItem> findAllByTopicId(Long topicId);
}
