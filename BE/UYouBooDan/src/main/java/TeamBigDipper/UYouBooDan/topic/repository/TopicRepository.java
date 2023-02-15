package TeamBigDipper.UYouBooDan.topic.repository;

import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    /**
     * 투표 게시글 전체 목록을 Pagination 이용해서 작성 날짜 역순으로 조회
     * @param pageable Pageable 객체
     * @return Pagination 적용된 Page Topic 객체
     */
    Page<Topic> findAllByOrderByCreatedAtDesc(Pageable pageable);

    /**
     * 진행 중인 투표 게시글 목록을 Pagination 적용해서 작성일 내림차순으로 조회
     * @param now 현재 날짜 : LocalDateTime 객체
     * @param pageable pagination 객체
     * @return Pagination 적용된 Topic 객체
     */
    Page<Topic> findAllByClosedAtIsAfterOrderByCreatedAtDesc(LocalDateTime now, Pageable pageable);

    /**
     * 마감 임박 투표 게시글 목록을 Pagination 적용해서 현재날짜와 마감 임박까지 마감일 오름차순으로 조회
     * @param start 현재 날짜 : LocalDateTime 객체
     * @param end 현재 날짜로부터 마감임박 제한 날짜 : LocalDateTime 객체
     * @param pageable Pagination 객체
     * @return Pagination 적용된 Topic 객체
     */
    Page<Topic> findAllByClosedAtBetweenOrderByClosedAtAsc(LocalDateTime start, LocalDateTime end, Pageable pageable);

    /**
     * 전체 진행 중인 게시글 중에서 추천이 많이 된 게시글 목록을 추천 수 내림차순으로 조회
     * @param pageable Pagination Pageable 객체
     * @return Pagination이 적용된 Topic 객체
     */
    @Query(value = "SELECT t " +
            "FROM Topic t, TopicLike l " +
            "where l.topicLikeStatus = 1 and t.id = l.topic.id and t.topicStatus IN ('ACTIVE', 'PROGRESS') " +
            "GROUP BY l.topic.id " +
            "ORDER BY COUNT(l.member.id) desc")
    Page<Topic> findAllByHot(Pageable pageable);

    /**
     * 투표 마감된 투표 게시글 목록을 Pagination 적용해서 작성일 내림차순으로 조회
     * @param now 현재 날짜 : LocalDateTime 객체
     * @param pageable Pagination 객체
     * @return Pagination 적용된 Topic 객체
     */
    Page<Topic> findAllByClosedAtIsBeforeOrderByCreatedAtDesc(LocalDateTime now, Pageable pageable);

    /**
     * 내가 쓴 투표 게시글 목록을 Pagination 적용하여 작성일 역순으로 조회
     * @param memberId 현재 로그인 한 유저의 식별자
     * @param pageable Pagination 파라미터
     * @return
     */
    @Query(value = "SELECT * FROM Topic topic WHERE topic.MEMBER_ID =:memberId Order By createdAt Desc", nativeQuery = true)
    Page<Topic> findAllByMemberIdOrderByCreatedAtDesc(@Param("memberId") Long memberId, Pageable pageable);

}
