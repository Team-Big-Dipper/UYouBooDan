package TeamBigDipper.UYouBooDan.comment.controller;

import TeamBigDipper.UYouBooDan.comment.dto.*;
import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import TeamBigDipper.UYouBooDan.comment.entity.CommentLike;
import TeamBigDipper.UYouBooDan.comment.service.CommentService;
import TeamBigDipper.UYouBooDan.global.dto.MultiResDto;
import TeamBigDipper.UYouBooDan.global.dto.SingleResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/topics")
@Validated
@Slf4j
public class CommentController {
    private final CommentService commentService;

    /**
     * 댓글 등록
     * @param commentPostReqDto
     * @return 201 Created
     */
    @PostMapping("/{topicId}/comments")
    public ResponseEntity<SingleResDto<CommentResDto>> postComment(@PathVariable(value = "topicId") Long topicId,
                                                     @RequestBody CommentPostReqDto commentPostReqDto){
        Comment comment = commentPostReqDto.toEntity(topicId);
        Comment createdComment = commentService.createComment(comment);
        CommentResDto response = new CommentResDto(createdComment);

        return new ResponseEntity<>(new SingleResDto<>(response), HttpStatus.CREATED);
    }

    /**
     * 댓글 수정
     * @param commentId
     * @param commentPatchReqDto
     * @return 200 OK
     */
    @PatchMapping("/comments/{commentId}")
    public ResponseEntity<SingleResDto<CommentResDto>> patchComment(@PathVariable(value = "commentId") Long commentId,
                                                                   @RequestBody CommentPatchReqDto commentPatchReqDto){
        Comment comment = commentPatchReqDto.toEntity(commentId);
        Comment updateComment = commentService.updateComment(comment);
        CommentResDto response = new CommentResDto(updateComment);

        return new ResponseEntity<>(new SingleResDto<>(response), HttpStatus.OK);
    }

    /**
     * 댓글 삭제 (Repository에서 실제 삭제가 아닌 상태값만 변경하므로 Patch 요청 메소드를 사용하였습니다.)
     * @param commentId
     * @return
     */
    @PatchMapping("/comments/{commentId}/remove")
    public ResponseEntity<SingleResDto<CommentResDto>> deleteComment(@PathVariable(value = "commentId") Long commentId){

        Comment deleteComment = commentService.deleteComment(commentId);
        CommentResDto response = new CommentResDto(deleteComment);

        return new ResponseEntity<>(new SingleResDto<>(response), HttpStatus.OK);
    }

    /**
     * CommentId로 댓글 조회
     * @param commentId
     * @return 200 OK
     */
    @GetMapping("/comments/{commentId}")
    public ResponseEntity<SingleResDto<CommentResDto>> getComment(@PathVariable(value = "commentId") Long commentId){
        Comment comment = commentService.getComment(commentId);
        CommentResDto response = new CommentResDto(comment);

        return new ResponseEntity<>(new SingleResDto<>(response), HttpStatus.OK);
    }

    /**
     * 댓글 리스트 조회 (베스트 댓글 포함)
     * @param pageable
     * @return 200 OK
     */
    @GetMapping("/{topicId}/comments")
    public ResponseEntity<CommentMultiResDto> getComments(@PathVariable(value = "topicId") Long topicId,
                                                   Pageable pageable){
        Page<Comment> page = commentService.getComments(pageable, topicId);
        Page<CommentResDto> dtoPage = page.map(CommentResDto::new);
        List<Comment> commentList = page.toList();

        List<Comment> bestCommentList = commentService.getBestComments(topicId);
        return new ResponseEntity<>(new CommentMultiResDto<>(bestCommentList, commentList, dtoPage), HttpStatus.OK);
    }

    /**
     * 댓글 좋아요
     * @param commentId
     * @param memberId
     * @return 200 OK
     */
    @PostMapping("/comments/{commentId}/{memberId}/like")
    public ResponseEntity<CommentLikeResDto> postCommentLike(@PathVariable(value = "commentId") Long commentId,
                                                             @PathVariable(value = "memberId") Long memberId){
        CommentLike commentLike = commentService.likeComment(commentId, memberId);
        CommentLikeResDto response = new CommentLikeResDto(commentLike);

        return new ResponseEntity<>(response, HttpStatus.OK);

    }
}
