import React, { useCallback } from 'react';
import CommentInput from './CommentInput';
import CommentCard from './CommentCard';
import * as S from './style';
import { RightPageButton, LeftPageButton } from '../../assets/pageButton';
interface propTypes {
  topicId: any;
  isCommentLoading: boolean;
  setCommentPageNum: Function;
  commentPageNum: number;
  totalPages: number;
  totalComments: number;
  setCommentData: Function;
  setIsPostComment: Function;
  bestComment: Props | undefined;
  commentData: Props[] | undefined;
  commentPageBtn: number[];
}
interface Props {
  createdAt: string;
  memberId: number;
  commendId: number;
  totalLike: number;
  commentStatus: string;
  commentContent: string;
}
const CommentList = ({
  topicId,
  isCommentLoading,
  setCommentPageNum,
  commentPageNum,
  totalPages,
  totalComments,
  setCommentData,
  setIsPostComment,
  bestComment,
  commentData,
  commentPageBtn,
}: propTypes) => {
  const handleCommnetPageNum = useCallback((e: any) => {
    setCommentPageNum(Number(e.target.textContent));
  }, []);
  const handlePageButton = (e: any) => {
    if (
      e.target.parentNode.id === 'comment-right-button' &&
      commentPageNum < totalPages
    ) {
      setCommentPageNum((prev: number) => prev + 1);
    } else if (
      e.target.parentNode.id === 'comment-left-button' &&
      commentPageNum > 1
    ) {
      setCommentPageNum((prev: number) => prev - 1);
    } else {
      setCommentPageNum(e);
    }
  };

  return (
    <>
      {isCommentLoading ? (
        <p>로딩중...</p>
      ) : (
        <>
          <S.CommentListContainer>
            <S.CommentHeader>댓글 ({totalComments})</S.CommentHeader>
            <CommentInput
              topicId={topicId}
              setCommentData={setCommentData}
              setIsPostComment={setIsPostComment}
            />
            <>
              <S.CommentListCondition>최신순</S.CommentListCondition>
              <CommentCard
                index={null}
                key={totalComments + 1}
                commendId={bestComment?.commendId}
                like={bestComment?.totalLike}
                createdAt={bestComment?.createdAt}
                username={bestComment?.memberId}
                content={bestComment?.commentContent}
                status={bestComment?.commentStatus}
                setIsPostComment={setIsPostComment}
              />
              {commentData?.map((el, idx) => (
                <CommentCard
                  index={idx}
                  key={el.commendId}
                  commendId={el.commendId}
                  like={el.totalLike}
                  createdAt={el.createdAt}
                  username={el.memberId}
                  content={el.commentContent}
                  status={el.commentStatus}
                  setIsPostComment={setIsPostComment}
                />
              ))}
            </>
            <S.CommentPageBtns>
              <div id="comment-left-button" onClick={handlePageButton}>
                <LeftPageButton />
              </div>
              {commentPageBtn.map((el: number, idx: number) => {
                return (
                  <S.CommentPageNum
                    key={idx}
                    isCurrentPage={commentPageNum === el ? true : false}
                    onClick={handleCommnetPageNum}
                  >
                    {el}
                  </S.CommentPageNum>
                );
              })}
              <div id="comment-right-button" onClick={handlePageButton}>
                <RightPageButton />
              </div>
            </S.CommentPageBtns>
          </S.CommentListContainer>
        </>
      )}
    </>
  );
};

export default CommentList;
