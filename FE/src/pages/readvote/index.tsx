import React, { useEffect, useState, useCallback, useMemo } from 'react';
import * as S from './style';
import VoteTitle from '../../components/ReadVote/voteTitle';
import VoteContent from '../../components/ReadVote/voteContent';
import CommentList from '../../components/ReadVote/CommentList';
import { SingleVoteContainer } from '../../components/ReadVote/singleVoteContainer';
import { useRouter } from 'next/router';
import VoteBtn from '../../components/ReadVote/voteBtn';
import { CalcTotal } from '../../utils/calculate';
import { getReadVote } from '../../apis/readvote/readvote';
import { getComments } from '../../apis/comments/comments';
import { getToken } from '../../utils/userToken';

interface responseType {
  topicId: number;
  category: string;
  title: string;
  content: string;
  image: string;
  topicVoteItems: voteType[];
  closedAt: string;
  createdAt: string;
  author: string;
  isAuthor: boolean;
  isVoted: boolean;
  views: number | null;
  likes: number;
  isLiked: boolean;
  isClosed: boolean;
  theFirstItemNames: string[];
}

interface voteType {
  topicVoteItemName: string;
  topicVoteItemId: number;
  isTopicVoteItemVoted: boolean | null;
  numberOfVotes: number | null;
}
const ReadVote = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [data, setData] = useState<responseType>();
  const [voteBtns, setVoteBtns] = useState<voteType[]>();
  const [selectedBtn, setSelectedBtn] = useState<number[]>([]);
  const [totalCount, setTotalCount] = useState<number>(20);
  const [isLoading, setIsLoading] = useState(false);
  const handleSelectedBtn = useCallback((array: any) => {
    setSelectedBtn(array);
  }, []);
  const usertoken = useMemo(() => getToken(), []);
  useEffect(() => {
    if (pid === undefined) {
      return;
    } else {
      if (usertoken !== undefined) {
        setIsLoading(true);
        getReadVote(pid, usertoken)?.then((res) => {
          if (res === 'Err') {
            router.push('/auth');
            return;
          }
          setData({ ...res.data });
          setVoteBtns([...res.data.topicVoteItems]);
          setTotalCount(CalcTotal(res.data.topicVoteItems));
          setIsLoading(false);
        });
      } else {
        router.push('/auth');
      }
    }
  }, [pid]);

  interface Props {
    createdAt: string;
    memberId: number;
    commendId: number;
    totalLike: number;
    commentStatus: string;
    commentContent: string;
  }
  //댓글
  const [commentPageNum, setCommentPageNum] = useState(1);
  const [commentPageSize, setCommentPageSize] = useState(6);
  const [isPostComment, setIsPostComment] = useState(false);
  const [bestComment, setBestComment] = useState<Props>();
  const [totalComments, setTotalComments] = useState(0);
  const [commentData, setCommentData] = useState<Props[]>();
  const [totalPages, setTotalPages] = useState(1);
  const [commentPageBtn, setCommentPageBtn] = useState<number[]>([1]);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  useEffect(() => {
    if (usertoken !== undefined) {
      setIsCommentLoading(true);
      if (pid !== undefined) {
        getComments(commentPageNum, commentPageSize, pid)?.then((res) => {
          if (res === 'Err') {
            return;
          }
          const page = Array.from(
            { length: res?.pageInfo.totalPages },
            (_, i) => i + 1,
          );
          setCommentPageBtn(page);
          setTotalPages(res.pageInfo.totalPages);
          setCommentData(res.data);
          setBestComment(res.best[0]);
          setTotalComments(res.pageInfo.totalElements);
          setIsCommentLoading(false);
        });
      }
      return;
    } else {
      router.push('/auth');
    }
  }, [pid, commentPageNum, isPostComment]);

  return (
    <>
      <S.PageContainer>
        <S.CurrentCategoty>
          <S.LinkButton href="/">홈</S.LinkButton>
          {' > '}카테고리{' > '}게시글
        </S.CurrentCategoty>
        <>
          {isLoading ? (
            <p>로딩중...</p>
          ) : (
            <>
              <VoteTitle
                topidId={pid}
                category={data?.category}
                title={data?.title}
                createdAt={data?.createdAt}
                author={data?.author}
                closedAt={data?.closedAt}
                views={data?.views}
                likes={data?.likes}
              />
              <S.VoteContentLayout>
                {!data?.image ? (
                  <VoteContent content={data?.content} image={null} />
                ) : (
                  <VoteContent content={data?.content} image={data?.image} />
                )}
                <div>
                  {voteBtns?.map((el) => {
                    return (
                      <SingleVoteContainer
                        key={el.topicVoteItemId}
                        topicId={pid}
                        itemId={el.topicVoteItemId}
                        content={el.topicVoteItemName}
                        count={el.numberOfVotes}
                        setVoteBtns={setVoteBtns}
                        selectedBtn={selectedBtn}
                        handleSelectedBtn={handleSelectedBtn}
                        totalCount={totalCount}
                        isTopicVoteItemVoted={el.isTopicVoteItemVoted}
                        isAuthor={data?.isAuthor}
                        isVoted={data?.isVoted}
                        isClosed={data?.isClosed}
                        theFirstItemNames={data?.theFirstItemNames}
                      />
                    );
                  })}
                </div>
                <S.TotalVoteCount isClosed={data?.isClosed}>
                  {data?.isClosed && data?.isAuthor
                    ? '총투표수: ' + totalCount + '표'
                    : null}
                </S.TotalVoteCount>
                <VoteBtn isAuthor={data?.isAuthor} />
              </S.VoteContentLayout>
              <CommentList
                topicId={pid}
                isCommentLoading={isCommentLoading}
                setCommentPageNum={setCommentPageNum}
                commentPageNum={commentPageNum}
                totalPages={totalPages}
                totalComments={totalComments}
                setCommentData={setCommentData}
                setIsPostComment={setIsPostComment}
                bestComment={bestComment}
                commentData={commentData}
                commentPageBtn={commentPageBtn}
              />
            </>
          )}
        </>
      </S.PageContainer>
    </>
  );
};

export default ReadVote;
