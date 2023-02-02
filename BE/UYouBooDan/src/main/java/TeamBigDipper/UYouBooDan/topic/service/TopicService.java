package TeamBigDipper.UYouBooDan.topic.service;

import TeamBigDipper.UYouBooDan.global.exception.dto.BusinessLogicException;
import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import TeamBigDipper.UYouBooDan.topic.entity.TopicVoteItem;
import TeamBigDipper.UYouBooDan.topic.repository.TopicRepository;
import TeamBigDipper.UYouBooDan.topic.repository.TopicVoteItemRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TopicService {

    private final TopicRepository topicRepository;
    private final TopicVoteItemRepository topicVoteItemRepository;

    /**
     * 투표 게시글 저장
     * @param topic Topic 엔티티 클래스 - 작성한 투표 게시글
     * @return Repository에 저장한 Topic 엔티티 클래스
     */
    public Topic createTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    /**
     * topic ID를 통해서 투표 게시글 조회
     * @param topicId 투표 게시글 topic id
     * @return 투표게시글 Topic 객체
     */
    public Topic findTopic(long topicId) {
        // 유효한 투표 게시글 Topic 조회해서 반환
        return findVerifiedTopic(topicId);
    }

    /**
     * topic ID를 통해서 repository에 저장된 유효한 Topic 조회
     * @param topicId 투표 게시글 topic id
     * @return 투표 게시글 Topic 객체
     */
    private Topic findVerifiedTopic(long topicId) {
        // topic id를 이용하여 topicRepository에서 존재하는지 조회
        Optional<Topic> optionalTopic = topicRepository.findById(topicId);

        // topic id에 해당하는 Topic이 존재하지 않으면(topic이 null이면) 예외처리
        Topic findTopic = optionalTopic.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.TOPIC_NOT_EXIST));

        return findTopic;
    }

    /**
     * Pagination을 적용하여 투표 게시글 전체 목록조회
     * filter 값을 통해서 진행중, 마감된, 마감 임박 투표 게시글 조회 가능
     * @param pageable Pageable 객체
     * @param topicFilter 투표 게시글 필터 : String 객체
     * @return Page<Topic> Topic 클래스 타입의 Page
     */
    public Page<Topic> findTopics(Pageable pageable, String topicFilter) {

        // 현재 시간
        LocalDateTime now = LocalDateTime.now();
        // 투표 게시글 마감 임박까지 남은 시간
        int imminentHour = 6;
        // 투표 게시글 마감 시간 - 현재 시간으로부터 투표 게시글 마감 임박까지 시간을 더함
        LocalDateTime end = LocalDateTime.now().plusHours(imminentHour);

        // 문자열로 된 topicFilter를 enum으로 변경 후 해당 Filter enum에 맞게 리턴
        switch(TopicFilter.nameOf(topicFilter)) {
            // 투표 게시글 전체 목록 조회
            case ALL:
                break;
            // 진행 중인 투표 게시글 목록 조회 - 작성일 기준 내림차순, 페이지네이션 적용
            case PROGRESS:
                return topicRepository.findAllByClosedAtIsAfterOrderByCreatedAtDesc(now, pageable);
            // 마감 임박 투표 게시글 목록 조회
            case IMMINENT:
                return topicRepository.findAllByClosedAtBetweenOrderByClosedAtAsc(now, end, pageable);
            // 전체 게시글 중 핫토픽 조회
            case HOT:
                break;
            // 투표 마감된 투표 게시글 목록 조회
            case CLOSED:
                return topicRepository.findAllByClosedAtIsBeforeOrderByCreatedAtDesc(now, pageable);
        }

        // 페이지네이션 처리된 투표 게시글 전체 목록을 작성일 내림차순으로 정렬한 Tage<Topic> 반환
        return topicRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    /**
     * TopicFilter Enum 클래스
     */
    public enum TopicFilter {

        ALL("all"),             // 전체
        PROGRESS("progress"),   // 진행 중인
        IMMINENT("imminent"),   // 마감 임박인
        HOT("hot"),             // 핫 토픽
        CLOSED("closed")         // 종료된
        ;

        @Getter
        private String topicFilterName;         // 투표 게시글 필터 이름

        /**
         * TopicFilter 생성자
         * @param topicFilterName  투표 게시글 필터 이름 : String 객체
         */
        TopicFilter(String topicFilterName) {this.topicFilterName = topicFilterName;}

        /**
         * 투표 게시글 필터 이름에 맞는 Enum 객체 찾아서 출력
         * @param topicFilterName   투표 게시글 필터 이름 : String 객체
         * @return 투표 게시글 필터 Enum 객체
         */
        public static TopicFilter nameOf(String topicFilterName) {
            // 필터가 없으면 전체 목록 조회
            if (topicFilterName == null) {
                return TopicFilter.ALL;
            }

            // TopicFilter Enum 객체 순회하면서
            for (TopicFilter topicFilter : TopicFilter.values()) {
                // 투표 게시글 필터 이름에 맞는 Enum 객체 반환
                if(topicFilter.getTopicFilterName().equals(topicFilterName)){
                    return topicFilter;
                }
            }
            // 이름이 일치하지 않으면 존재하지 않는 필터 예외 처리
            throw new BusinessLogicException(ExceptionCode.FILTER_NOT_EXIST);
        }
    }
}
