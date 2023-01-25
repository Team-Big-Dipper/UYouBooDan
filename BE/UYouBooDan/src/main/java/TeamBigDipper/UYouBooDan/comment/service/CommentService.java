package TeamBigDipper.UYouBooDan.comment.service;

import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import TeamBigDipper.UYouBooDan.comment.repository.CommentRepository;
import TeamBigDipper.UYouBooDan.global.exception.dto.BusinessLogicException;
import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

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
    public Comment updateComment(Comment comment){
        Comment savedComment = commentRepository.findById(comment.getCommendId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));

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
    public Comment deleteComment(Long commentId){
        Comment savedComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));
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
}
