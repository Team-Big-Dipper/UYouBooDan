package TeamBigDipper.UYouBooDan.comment.service;

import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import TeamBigDipper.UYouBooDan.comment.entity.CommentStatus;
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

    @Transactional
    public Comment createComment(Comment comment){

        return commentRepository.save(comment);
    }

    @Transactional
    public Comment updateComment(Comment comment){
        Comment savedComment = commentRepository.findById(comment.getCommendId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));

        Optional.of(comment.getCommentContent()).ifPresent(savedComment::setCommentContent);
        savedComment.setModifiedAt(LocalDateTime.now());

        return commentRepository.save(savedComment);
    }

    @Transactional
    public Comment deleteComment(Long commentId){
        Comment savedComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));
        savedComment.setCommentStatus(CommentStatus.REMOVED);
        savedComment.setModifiedAt(LocalDateTime.now());

        return commentRepository.save(savedComment);
    }

    public Comment getComment(Long commentId){
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));
    }

    public Page<Comment> getComments(Pageable pageable, Long topicId){
        Page<Comment> page = commentRepository.findAllByTopicIdOrderByCreatedAtDesc(pageable, topicId);

        return page;
    }
}
