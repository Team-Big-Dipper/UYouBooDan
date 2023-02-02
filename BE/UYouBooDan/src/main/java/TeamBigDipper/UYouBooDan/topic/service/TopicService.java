package TeamBigDipper.UYouBooDan.topic.service;

import TeamBigDipper.UYouBooDan.global.exception.dto.BusinessLogicException;
import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import TeamBigDipper.UYouBooDan.topic.entity.TopicVoteItem;
import TeamBigDipper.UYouBooDan.topic.repository.TopicRepository;
import TeamBigDipper.UYouBooDan.topic.repository.TopicVoteItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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
     * Pagination을 적용하여 투표 게시글 전체 목록 조회
     * @param pageable Pageable 객체
     * @return Page<Topic> Topic클래스 타입의 Page
     */
    public Page<Topic> findTopics(Pageable pageable) {
        return topicRepository.findAllByOrderByCreatedAtDesc(pageable);
    }
}
