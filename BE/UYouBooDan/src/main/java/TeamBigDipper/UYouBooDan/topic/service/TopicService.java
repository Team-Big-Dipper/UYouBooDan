package TeamBigDipper.UYouBooDan.topic.service;

import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import TeamBigDipper.UYouBooDan.topic.entity.TopicVoteItem;
import TeamBigDipper.UYouBooDan.topic.repository.TopicRepository;
import TeamBigDipper.UYouBooDan.topic.repository.TopicVoteItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
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

//    /**
//     * 투표 게시글에 대한 투표 항목 저장
//     * @param topicVoteItems 투표 항목 TopicVoteItem 엔티티 클래스를 원소로 갖는 리스트
//     * @return repository에 저장한 TopicVoteItem 클래스를 원소로 갖는 리스트
//     */
//    public List<TopicVoteItem> createTopicVoteItems(List<TopicVoteItem> topicVoteItems) {
//        return topicVoteItems.stream()
//                .map(topicVoteItem -> topicVoteItemRepository.save(topicVoteItem))
//                .collect(Collectors.toList());
//    }
}
