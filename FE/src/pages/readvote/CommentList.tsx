import React, { useState, useEffect } from 'react';
import CommentInput from '../../components/ReadVote/CommentInput';
import CommentCard from '../../components/ReadVote/CommentCard';
import * as S from '../../components/ReadVote/style';
import { getComments } from '../../apis/comments/comments';
import { RightPageButton, LeftPageButton } from '../../assets/pageButton';

interface Props {
  createdAt: string;
  memberId: number;
  commendId: number;
  totalLike: number;
  commentStatus: string;
  commentContent: string;
}

const CommentList = ({ topicId }: any) => {
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [bestComment, setBestComment] = useState<Props>();
  const [totalComments, setTotalComments] = useState(0);
  const [data, setData] = useState<Props[]>();
  const [totalPages, setTotalPages] = useState(1);
  const [commentPageBtn, setCommentPageBtn] = useState<number[]>([1]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPostComment, setIsPostComment] = useState(false);

  const handlePageNum = (e: any) => {
    setPageNum(Number(e.target.textContent));
  };
  const handlePageButton = (e: any) => {
    console.log(e.target);
    if (
      e.target.parentNode.id === 'comment-right-button' &&
      pageNum < totalPages
    ) {
      setPageNum((prev) => prev + 1);
    } else if (
      e.target.parentNode.id === 'comment-left-button' &&
      pageNum > 1
    ) {
      setPageNum((prev) => prev - 1);
    } else {
      return;
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getComments(pageNum, pageSize, topicId)?.then((res) => {
      const page = Array.from(
        { length: res?.pageInfo.totalPages },
        (_, i) => i + 1,
      );
      setCommentPageBtn(page);
      setTotalPages(res.pageInfo.totalPages);
      setData([...res.data]);
      setBestComment({ ...res.best[0] });
      setTotalComments(res.pageInfo.totalElements);
      setIsLoading(false);
    });
  }, [pageNum, topicId, isPostComment]);

  return (
    <>
      {isLoading ? (
        <p>로딩중...</p>
      ) : (
        <>
          <S.CommentListContainer>
            <S.CommentHeader>댓글 ({totalComments})</S.CommentHeader>
            <CommentInput
              topicId={topicId}
              setData={setData}
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
              {data?.map((el, idx) => (
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
              {commentPageBtn.map((el, idx) => {
                return (
                  <S.CommentPageNum
                    key={idx}
                    onClick={handlePageNum}
                    isCurrentPage={pageNum === el ? true : false}
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
