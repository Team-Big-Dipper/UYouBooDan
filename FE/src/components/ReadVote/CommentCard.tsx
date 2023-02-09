import React, { useState, useEffect, useMemo } from 'react';
import * as S from './style';
import { LikeSvg, ClickedLikeSvg } from '../../assets/likeSvg';
import { ProfileImage } from '../../assets/profileImage';
import { ChangDateFormat } from '../../utils/parseDate';
import { BestCommentItem } from '../../assets/bestCommentItem';
import { postCommentLike } from '../../apis/comments';
import { deleteComment } from '../../apis/comments';
import CommentRewriteInput from './CommentRewriteInput';

interface propTypes {
  username: number | undefined;
  content: string | undefined;
  commendId: number | undefined;
  like: number | undefined;
  createdAt: string | undefined;
  status: string | undefined;
  index: number | null;
}
const CommentCard = ({
  commendId,
  username,
  content,
  like,
  createdAt,
  status,
  index,
}: propTypes) => {
  const [createdDate, setCreatedDate] = useState('');
  const [commentContent, setCommentContent] = useState(content);
  const [isRewiteComment, setIsRewiteComment] = useState(false);
  const [commentStatus, setCommentStatus] = useState(status);
  const [commentLikeStatus, setCommentLikeStatus] = useState(false);
  useEffect(() => {
    const changedDate = ChangDateFormat(createdAt);
    setCreatedDate(changedDate);
  }, []);

  const handleDeleteComment = () => {
    deleteComment(commendId).then((res) => {
      if (res === 'REMOVED') {
        setCommentStatus(res);
        alert('댓글이 삭제되었습니다');
      }
    });
  };
  const handleRewiteComment = () => {
    setIsRewiteComment((prev) => !prev);
  };
  const handleCommentLike = () => {
    postCommentLike(commendId).then((res) => {
      setCommentLikeStatus(res?.data.commentLikeStatus);
    });
  };

  return (
    <>
      <S.CommentCard>
        {commentStatus === 'REMOVED' ? (
          <S.DeletedContent>삭제된 댓글입니다</S.DeletedContent>
        ) : (
          <>
            <S.CommentCardTop>
              <S.UserDataDiv>
                <ProfileImage />
                <S.CommentUserName>{username}</S.CommentUserName>
                {index === null ? <BestCommentItem /> : null}
              </S.UserDataDiv>
              <S.CommentLike onClick={handleCommentLike}>
                {commentLikeStatus ? <ClickedLikeSvg /> : <LikeSvg />}
                {like}
              </S.CommentLike>
            </S.CommentCardTop>
            {isRewiteComment ? (
              <CommentRewriteInput
                commentContent={commentContent}
                commentId={commendId}
                setCommentContent={setCommentContent}
                setIsRewiteComment={setIsRewiteComment}
              />
            ) : (
              <S.CommentContent>{commentContent}</S.CommentContent>
            )}
            <S.CommentCardBottomContainer>
              {isRewiteComment ? (
                <S.CommentButtons onClick={handleRewiteComment}>
                  취소
                </S.CommentButtons>
              ) : (
                <>
                  <S.CommentCreatedAt>{createdDate}</S.CommentCreatedAt>
                  <p>|</p>
                  <S.CommentButtons onClick={handleRewiteComment}>
                    수정
                  </S.CommentButtons>
                  <p>|</p>
                  <S.CommentButtons onClick={handleDeleteComment}>
                    삭제
                  </S.CommentButtons>
                </>
              )}
            </S.CommentCardBottomContainer>
          </>
        )}
      </S.CommentCard>
    </>
  );
};
export default CommentCard;
