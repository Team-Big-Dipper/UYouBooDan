import React, { useState, useCallback, useEffect } from 'react';
import CommentInput from './CommentInput';
import CommentCard from './CommentCard';
import * as S from './style';
import { getComments } from '../../apis/comments';

interface Props {
  data: {
    commendId: number;
    totalLike: number;
    createdAt: string;
    memberId: number;
    commentStatus: string;
    commentContent: string;
  };
}
const CommentList = ({ id }: any) => {
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [commentTotalPage, setCommentTotalPage] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [data, setData] = useState<Props[]>();
  const page = Array.from({ length: commentTotalPage }, (_, i) => i + 1);
  const handleAnsPageNum = useCallback((e: any) => {
    let num = Number(e.target.textContent);
    setPageNum(num);
  }, []);
  useEffect(() => {
    getComments(pageNum, pageSize)?.then((res) => {
      console.log(res);
      setData(res.data);
      setCommentTotalPage(res.pageInfo.totalPages);
      setTotalComments(res.pageInfo.totalElements);
    });
  }, []);

  return (
    <S.CommentListContainer>
      <S.CommentHeader>댓글 ({totalComments})</S.CommentHeader>
      <CommentInput id={id} setData={setData} />
      <>
        {data?.map((el, idx) => (
          <CommentCard
            key={el.data.commendId}
            id={el.data.commendId}
            index={idx}
            like={el.data.totalLike}
            createdAt={el.data.createdAt}
            username={el.data.memberId}
            content={el.data.commentContent}
            status={el.data.commentStatus}
          />
        ))}
      </>
      <S.CommentPageBtns>
        {page.map((el, idx) => {
          return (
            <S.CommentPage key={idx} onClick={handleAnsPageNum}>
              {el}
            </S.CommentPage>
          );
        })}
      </S.CommentPageBtns>
    </S.CommentListContainer>
  );
};

export default CommentList;
