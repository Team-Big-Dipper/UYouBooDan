package TeamBigDipper.UYouBooDan.topic.service;

import TeamBigDipper.UYouBooDan.global.exception.dto.BusinessLogicException;
import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import TeamBigDipper.UYouBooDan.topic.entity.TopicLike;
import TeamBigDipper.UYouBooDan.topic.entity.TopicVote;
import TeamBigDipper.UYouBooDan.topic.entity.TopicVoteItem;
import TeamBigDipper.UYouBooDan.topic.repository.TopicLikeRepository;
import TeamBigDipper.UYouBooDan.topic.repository.TopicRepository;
import TeamBigDipper.UYouBooDan.topic.repository.TopicVoteItemRepository;
import TeamBigDipper.UYouBooDan.topic.repository.TopicVoteRepository;
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
    private final TopicVoteRepository topicVoteRepository;

    private final TopicLikeRepository topicLikeRepository;

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
    public Topic findTopic(long topicId, Long memberId) {

        Topic verifiedTopic = findVerifiedTopic(topicId);   // 유효한 투표 게시글 Topic 조회

        verifiedTopic.findTopicIsVoted(memberId);        // 투표 게시글의 투표 항목에 대해 사용자가 투표했는지 확인

        verifiedTopic.findIsAuthor(memberId);           // 조회하는 사람이 투표 게시글 작성자인지 확인

        verifiedTopic.findIsLiked(memberId);            // 조회하는 사람이 좋아요 했는지 여부 확인

        return verifiedTopic;       // 투표 게시글 Topic 객체 반환
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
     * 투표하기 메서드 - TopicVote 객체 를 수정하거나 생성
     * @param member 투표하고자 하는 사용자
     * @param topicId 투표하고자 하는 투표 게시글
     * @param topicVoteItemId 투표하고자 하는 투표 항목
     * @return 투표항목 TopicVoteItem를 원소로 갖는 리스트트
    */
    public List<TopicVoteItem> voteTopic(Member member, long topicId, long topicVoteItemId) {
        // 유효한 게시글인지 확인
        Topic verifiedTopic = findVerifiedTopic(topicId);

        // 유효한 투표 항목 인지 확인
        TopicVoteItem verifiedTopicVoteItem = findVerifiedTopicVoteItem(topicVoteItemId);

        // 투표 게시글에 이미 투표를 한적이 있는지 확인 - TopicVote Repository에서 member id, topic id로 투표했는지 확인
        Optional<TopicVote> optionalTopicVote =
                topicVoteRepository.findByMemberIdAndTopicId(member.getMemberId(), verifiedTopic.getTopicId());

        // 투표 게시글에 이미 투표했을 경우
        if (optionalTopicVote.isPresent()){
            // Optional TopicVote 객체를 투표 객체 TopicVote로 변환
            TopicVote verifiedTopicVote = optionalTopicVote.get();

            // 이전에 투표했던 투표 항목의 ID
            Long beforeTopicVoteItemId = verifiedTopicVote.getTopicVoteItem().getTopicVoteItemId();

             // 이미 투표했던 항목에 투표 했을 경우 - 이전 투표 항목 ID와 현재 투표 항목ID가 같을 경우
             if (beforeTopicVoteItemId.equals(verifiedTopicVoteItem.getTopicVoteItemId())) {
                 // verifiedTopicVoteItem.cancelVote(verifiedTopicVote);        // 투표 항목에서 투표 취소하기
                 topicVoteRepository.delete(verifiedTopicVote);          // topicVoteRepository에서 투표 삭제
             } else {       // 다른 투표 항목에 했을 경우
                 // 투표 객체 TopicVote에서 투표 항목을 현재 투표항목 TopicVoteItem으로 변경
                 verifiedTopicVote.voteTopicVoteItem(verifiedTopicVoteItem);
                 topicVoteRepository.save(verifiedTopicVote);           // TopicVote Repository에 투표 저장
             }
        } else {    // 투표 게시글에 새로 투표할 경우
            // 새로운 투표 객체 TopicVote 생성
            TopicVote topicVote = TopicVote.builder()
                            .topic(verifiedTopic)                   // 투표 게시글
                            .member(member)                         // 투표자
                            .topicVoteItem(verifiedTopicVoteItem)   // 투표 항목
                            .build();

            // verifiedTopicVoteItem.voteTopicVoteItem(topicVote);  // 투표 항목에다 사용자가 투표

            topicVoteRepository.save(topicVote);        // topic vote repository에 투표 저장
        }

        // 투표 게시글에 있는 모든 투표 항목 조회
        List<TopicVoteItem> topicVoteItems = getTopicVoteItems(topicId, member.getMemberId());

        return topicVoteItems;      // 투표 게시글에 있는 모든 투표항목 리스트 반환
    }

    /**
     * 투표 게시글에 유효한 투표 항목들 조회
     * @param topicId 투표게시글 Topic Id
     * @param memberId 사용자 id
     * @return 투표게시글의 투표 항목 리스트
     */
    public List<TopicVoteItem> getTopicVoteItems(Long topicId, Long memberId) {
        // 투표 게시글 id topic id를 이용하여 투표 항목 TopicVoteItem 리스트 조회
        List<TopicVoteItem> topicVoteItems = topicVoteItemRepository.findAllByTopicId(topicId);
        // 각 투표 항목에 대해 사용자가 투표했는지 확인
        topicVoteItems.stream()
                .map(topicVoteItem -> topicVoteItem.isTopicVoteItemVoted(memberId))
                .collect(Collectors.toList());

        return topicVoteItems;      // 투표 항목 리스트 반환
    }

    /**
     * 투표 게시글에 좋아요 하기
     * @param topicId 투표 게시글 id Long
     * @param member 사용자 Member
     * @return 투표 게시글 좋아요 TopicLike 객체
     */
    public TopicLike likeTopic(Long topicId, Member member) {
        TopicLike topicLike;

        Topic verifiedTopic = findVerifiedTopic(topicId);       // 유효한 투표 게시글인지 확인

        // 해당 투표 게시글에 사용자가 추천하기 했는지 확인
        Optional<TopicLike> optionalTopicLike =
                topicLikeRepository.findByTopicIdAndMemberId(verifiedTopic.getTopicId(), member.getMemberId());

        if (optionalTopicLike.isPresent()) {                // 해당 투표 게시글에 대해 이전에 사용자가 추천했던 기록이 있으면
            topicLike = optionalTopicLike.get();            // Optional TopicLike 객체를 TopicLike 객체로 변환
            if(topicLike.getTopicLikeStatus()) {            // 이전에 좋아요를 했으면
                topicLike.changeTopicLikeStatusFalse();     // 투표 게시글의 좋아요 비활성화
            } else {
                topicLike.changeTopicLikeStatusTrue();      // 투표 게시글 좋아요 활성화
            }
        } else {                                        // 이전에 사용자가 추천했던 기록이 없으면
            topicLike = TopicLike.builder()             // TopicLike 객체 생성
                    .topic(verifiedTopic)
                    .member(member)
                    .build();
            topicLike.changeTopicLikeStatusTrue();      // 투표 게시글 좋아요 활성화
        }

        return topicLikeRepository.save(topicLike);     // TopicLike 저장 후 반환
    }

    /**
     *투표 게시글에 좋아요 개수 세기
     * @param topicId  투표게시글 id Long
     * @return 투표 게시글 좋아요 개수 long
     */
    public long findNumberOfTopicLikes(Long topicId) {
        Topic verifiedTopic = findVerifiedTopic(topicId);       // 유효한 투표 게시글인지 확인
        return verifiedTopic.countNumberOfTopicLike();          // 투표 게시글의 좋아요 수 확인 후 반환
    }

    /**
     * Repository에 저장되어있는 유효한 투표 항목 조회
     * @param topicVoteItemId 투표 항목 id
     * @return 유효한 투표 항목 객체
     */
    private TopicVoteItem findVerifiedTopicVoteItem(long topicVoteItemId) {
        // 투표 항목 id를 이용하여 투표항목이 존재하는지 확인
        Optional<TopicVoteItem> optionalTopicVoteItem = topicVoteItemRepository.findById(topicVoteItemId);

        // topicVoteItem id에 해당하는 투표 항목 topicVoteItem이 존재하지 않으면(null이면) 예외 처리
        TopicVoteItem findTopicVoteItem = optionalTopicVoteItem.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.VOTE_ITEM_NOT_EXIST));

        return findTopicVoteItem;   // 유효한 투표항목 반환
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
