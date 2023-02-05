package TeamBigDipper.UYouBooDan.memberInfo.service;

import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import TeamBigDipper.UYouBooDan.topic.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MemberInfoService {

    private final TopicRepository topicRepository;

    public Page<Topic> findMemberTopics(Long memberId, Pageable pageable) {
        return topicRepository.findAllByMemberId(memberId, pageable);
    }

}
