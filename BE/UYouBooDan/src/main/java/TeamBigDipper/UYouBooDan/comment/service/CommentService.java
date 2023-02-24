package TeamBigDipper.UYouBooDan.comment.service;

import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import TeamBigDipper.UYouBooDan.comment.entity.CommentLike;
import TeamBigDipper.UYouBooDan.comment.repository.CommentLikeRepository;
import TeamBigDipper.UYouBooDan.comment.repository.CommentRepository;
import TeamBigDipper.UYouBooDan.global.exception.dto.BusinessLogicException;
import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentLikeRepository commentLikeRepository;

    /**
     * 댓글 생성
     * @param comment
     * @return
     */
    @Transactional
    public Comment createComment(Comment comment){

        return commentRepository.save(comment);
    }

    /**
     * 댓글 수정 (현재 댓글 내용만 수정할 수 있습니다.)
     * @param comment
     * @return
     */
    @Transactional
    public Comment updateComment(Comment comment, Long memberId){
        Comment savedComment = commentRepository.findById(comment.getCommendId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));
        verifyCommentStatus(savedComment);
        verifyAuthor(savedComment, memberId);
        Optional.of(comment.getCommentContent()).ifPresent(savedComment::setCommentContent);
        savedComment.setModifiedAt(LocalDateTime.now());

        return commentRepository.save(savedComment);
    }

    /**
     * 댓글 삭제 (댓글의 CommentStatus 상태를 REMOVED로 변경합니다.)
     * @param commentId
     * @return
     */
    @Transactional
    public Comment deleteComment(Long commentId, Long memberId){
        Comment savedComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));
        verifyCommentStatus(savedComment);
        verifyAuthor(savedComment, memberId);
        savedComment.setCommentStatus(Comment.CommentStatus.REMOVED);
        savedComment.setModifiedAt(LocalDateTime.now());

        return commentRepository.save(savedComment);
    }

    /**
     * 댓글 조회
     * @param commentId
     * @return
     */
    public Comment getComment(Long commentId){
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));
    }

    /**
     * 댓글 리스트 조회
     * @param pageable
     * @param topicId
     * @return
     */
    public Page<Comment> getComments(Pageable pageable, Long topicId){
        Page<Comment> page = commentRepository.findAllByTopicIdOrderByCreatedAtDesc(pageable, topicId);

        return page;
    }

    /**
     * 베스트 댓글 조회
     * @param topicId
     * @return
     */
    public List<Comment> getBestComments(Long topicId){
        List<Comment> bestComments = commentRepository.findTop1ByTopicIdOrderByTotalLikeDesc(topicId);

        return bestComments;
    }

    /**
     * 마이페이지 내 댓글 조회
     * @param pageable
     * @param memberId
     * @return
     */
    public Page<Comment> getMyComments(Pageable pageable, Long memberId){
        Page<Comment> page = commentRepository.findAllByMemberIdOrderByCreatedAtDesc(pageable, memberId);

        return page;
    }

    /**
     * 댓글 좋아요
     * @param commentId
     * @param memberId
     * @return
     */
    public CommentLike likeComment(Long commentId, Long memberId){
        Comment savedComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));
        verifyCommentStatus(savedComment);// 댓글 삭제 여부 검증
        int commentLikeNum = savedComment.getTotalLike(); // 해당 댓글 좋아요 수 조회

        if(commentLikeRepository.existsByCommentIdAndMemberId(commentId, memberId)){// commentLike 존재할 경우
            CommentLike savedCommentLike = commentLikeRepository.findByCommentIdAndMemberId(commentId, memberId);
            if(savedCommentLike.getCommentLikeStatus()){//좋아요로 되어있다면
                savedCommentLike.setCommentLikeStatus(false);// 좋아요 취소
                savedComment.setTotalLike(commentLikeNum - 1);
                savedCommentLike.setModifiedAt(LocalDateTime.now());
                commentRepository.save(savedComment);
            }else{
                savedCommentLike.setCommentLikeStatus(true);// 좋아요가 안되어있으면 좋아요
                savedComment.setTotalLike(commentLikeNum + 1);
                savedCommentLike.setModifiedAt(LocalDateTime.now());
                commentRepository.save(savedComment);
            }
            return commentLikeRepository.save(savedCommentLike);

        }else{// commentLike 없을 경우: 새로 생성
            CommentLike commentLike = new CommentLike();
            commentLike.setCommentId(commentId);
            commentLike.setMemberId(memberId);
            commentLike.setCommentLikeStatus(true);
            commentLike.setCreatedAt(LocalDateTime.now());
            commentLike.setModifiedAt(LocalDateTime.now());
            savedComment.setTotalLike(commentLikeNum + 1);
            commentRepository.save(savedComment);
            return commentLikeRepository.save(commentLike);
        }
    }

    public int getTotalLike(Long commentId){
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));
        return comment.getTotalLike();
    }

    /**
     * 댓글 수정 및 삭제 권한 확인 메서드
     * @param comment
     * @param memberId
     */
    public void verifyAuthor(Comment comment, Long memberId){
        if(memberId != comment.getMemberId()){
            throw new BusinessLogicException(ExceptionCode.NON_COMMENT_ACCESS);
        }
    }

    /**
     * 댓글의 삭제 여부 검증 메서드
     * @param comment
     */
    public void verifyCommentStatus(Comment comment){
        if(comment.getCommentStatus().equals(Comment.CommentStatus.REMOVED)){
            throw new BusinessLogicException(ExceptionCode.REMOVED_COMMENT);
        }
    }
}
