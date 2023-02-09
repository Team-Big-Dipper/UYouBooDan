import React, { useState, useCallback, useEffect } from 'react';
import CommentInput from './CommentInput';
import CommentCard from './CommentCard';
import * as S from './style';
import { getComments } from '../../apis/comments';
import { RightPageButton, LeftPageButton } from '../../assets/pageButton';

interface Props {
  commendId: number;
  totalLike: number;
  createdAt: string;
  memberId: number;
  commentStatus: string;
  commentContent: string;
}
const CommentList = ({ topicId }: any) => {
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [bestComment, setBestComment] = useState<Props>();
  const [totalComments, setTotalComments] = useState(0);
  const [data, setData] = useState<Props[]>();
  const [totalPages, setTotalPages] = useState(0);
  const [commentPageBtn, setCommentPageBtn] = useState<number[]>([1]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnsPageNum = useCallback((e: any) => {
    let num = Number(e.target.textContent);
    setPageNum(num);
  }, []);
  const handlePageNumButton = (e: any) => {
    console.log(e.target.parentNode.id);
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
        { length: res.pageInfo.totalPages },
        (_, i) => i + 1,
      );
      setCommentPageBtn(page);
      setTotalPages(res.pageInfo.totalPages);
      setData([...res.data]);
      setBestComment({ ...res.best[0] });
      setTotalComments(res.pageInfo.totalElements);
      setIsLoading(false);
    });
  }, [pageNum, pageSize, topicId]);

  return (
    <>
      {isLoading ? (
        <p>로딩중...</p>
      ) : (
        <>
          <S.CommentListContainer>
            <S.CommentHeader>댓글 ({totalComments})</S.CommentHeader>
            <CommentInput topicId={topicId} setData={setData} />
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
                />
              ))}
            </>
            <S.CommentPageBtns>
              <div id="comment-left-button" onClick={handlePageNumButton}>
                <LeftPageButton />
              </div>
              {commentPageBtn.map((el, idx) => {
                return (
                  <S.CommentPageNum key={idx} onClick={handleAnsPageNum}>
                    {el}
                  </S.CommentPageNum>
                );
              })}
              <div id="comment-right-button" onClick={handlePageNumButton}>
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
