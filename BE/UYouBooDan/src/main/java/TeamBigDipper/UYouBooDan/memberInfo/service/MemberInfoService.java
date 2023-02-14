package TeamBigDipper.UYouBooDan.memberInfo.service;

import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import TeamBigDipper.UYouBooDan.comment.repository.CommentRepository;
import TeamBigDipper.UYouBooDan.topic.entity.Topic;
import TeamBigDipper.UYouBooDan.topic.entity.TopicVote;
import TeamBigDipper.UYouBooDan.topic.repository.TopicRepository;
import TeamBigDipper.UYouBooDan.topic.repository.TopicVoteRepository;
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
    private final CommentRepository commentRepository;
    private final TopicVoteRepository topicVoteRepository;

    /**
     * 내가 쓴 글 조회용 서비스 메소드
     * @return 로그인 한 회원에 관련한 게시글을 페이지로 조회 (Id 참조 방식)
     */
    public Page<Topic> findMemberTopics(Long memberId, Pageable pageable) {
        return topicRepository.findAllByMemberIdOrderByCreatedAtDesc(memberId, pageable);
    }

    /**
     * 내가 쓴 댓글 조회용 서비스 메소드
     * @return 로그인 한 회원에 관련한 댓글을 페이지로 조회 (Id 참조 방식)
     */
    public Page<Comment> findMemberComment(Long memberId, Pageable pageable) {
        return commentRepository.findAllByMemberIdOrderByCreatedAtDesc(pageable, memberId);
    }


    /**
     * 내가 선택한 투표 조회용 서비스 메소드
     * @return 로그인 한 회원에 관련한 투표를 페이지로 조회 (Id 참조 방식)
     */
    public Page<TopicVote> findMemberVotedTopics(Long memberId, Pageable pageable) {
        return topicVoteRepository.findAllByMemberIdWithTopicAndTopicVoteItem(memberId, pageable);
    }
}
