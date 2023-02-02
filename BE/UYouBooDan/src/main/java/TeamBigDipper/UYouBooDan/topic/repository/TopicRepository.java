package TeamBigDipper.UYouBooDan.topic.repository;

import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    // 투표 게시글 전체 목록을 Pagination 이용해서 작성 날짜 역순으로 조회
    Page<Topic> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
