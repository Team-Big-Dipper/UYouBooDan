package TeamBigDipper.UYouBooDan.comment.controller;

import TeamBigDipper.UYouBooDan.comment.dto.*;
import TeamBigDipper.UYouBooDan.comment.entity.Comment;
import TeamBigDipper.UYouBooDan.comment.entity.CommentLike;
import TeamBigDipper.UYouBooDan.comment.service.CommentService;
import TeamBigDipper.UYouBooDan.global.dto.MultiResDto;
import TeamBigDipper.UYouBooDan.global.dto.SingleResDto;
import TeamBigDipper.UYouBooDan.global.security.util.JwtExtractUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/")
@Validated
@Slf4j
public class CommentController {
    private final CommentService commentService;
    private final JwtExtractUtil jwtExtractUtil;

    /**
     * 댓글 등록
     * @param commentPostReqDto
     * @return 201 Created
     */
    @PostMapping("topics/{topicId}/comments")
    public ResponseEntity<SingleResDto<CommentResDto>> postComment(@PathVariable(value = "topicId") Long topicId,
                                                                   HttpServletRequest request,
                                                     @RequestBody CommentPostReqDto commentPostReqDto){
        Long memberId = jwtExtractUtil.extractMemberIdFromJwt(request);
        Comment comment = commentPostReqDto.toEntity(topicId, memberId);
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
    @PatchMapping("topics/comments/{commentId}")
    public ResponseEntity<SingleResDto<CommentResDto>> patchComment(@PathVariable(value = "commentId") Long commentId,
                                                                    HttpServletRequest request,
                                                                   @RequestBody CommentPatchReqDto commentPatchReqDto){
        Long memberId = jwtExtractUtil.extractMemberIdFromJwt(request);
        Comment comment = commentPatchReqDto.toEntity(commentId);
        Comment updateComment = commentService.updateComment(comment, memberId);
        CommentResDto response = new CommentResDto(updateComment);

        return new ResponseEntity<>(new SingleResDto<>(response), HttpStatus.OK);
    }

    /**
     * 댓글 삭제 (Repository에서 실제 삭제가 아닌 상태값만 변경하므로 Patch 요청 메소드를 사용하였습니다.)
     * @param commentId
     * @return
     */
    @PatchMapping("topics/comments/{commentId}/remove")
    public ResponseEntity<SingleResDto<CommentResDto>> deleteComment(@PathVariable(value = "commentId") Long commentId,
                                                                     HttpServletRequest request){
        Long memberId = jwtExtractUtil.extractMemberIdFromJwt(request);
        Comment deleteComment = commentService.deleteComment(commentId, memberId);
        CommentResDto response = new CommentResDto(deleteComment);

        return new ResponseEntity<>(new SingleResDto<>(response), HttpStatus.OK);
    }

    /**
     * CommentId로 댓글 조회
     * @param commentId
     * @return 200 OK
     */
    @GetMapping("topics/comments/{commentId}")
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
    @GetMapping("topics/{topicId}/comments")
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
     * @param request
     * @return 200 OK
     */
    @PostMapping("topics/comments/{commentId}/like")
    public ResponseEntity<CommentLikeResDto> postCommentLike(@PathVariable(value = "commentId") Long commentId,
                                                             HttpServletRequest request){
        Long memberId = jwtExtractUtil.extractMemberIdFromJwt(request);
        CommentLike commentLike = commentService.likeComment(commentId, memberId);
        CommentLikeResDto response = new CommentLikeResDto(commentLike);

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    /**
     * 마이페이지 내 댓글 조회 기능
     * @param pageable
     * @param request
     * @return 200 OK
     */
    @GetMapping("myPage/comments")
    public ResponseEntity<MultiResDto> getMyComments(Pageable pageable,
                                                   HttpServletRequest request){
        Long memberId = jwtExtractUtil.extractMemberIdFromJwt(request);
        Page<Comment> page = commentService.getMyComments(pageable, memberId);
        Page<CommentResDto> dtoPage = page.map(CommentResDto::new);
        List<Comment> commentList = page.toList();

        return new ResponseEntity<>(new MultiResDto<>(commentList, dtoPage), HttpStatus.OK);
    }
}
