import React, { useEffect, useState, useCallback, useMemo } from 'react';
import * as S from './style';
import VoteTitle from '../../components/ReadVote/voteTitle';
import VoteContent from '../../components/ReadVote/voteContent';
import CommentList from './CommentList';
import { SingleVoteContainer } from '../../components/ReadVote/singleVoteContainer';
import { useRouter } from 'next/router';
import VoteBtn from '../../components/ReadVote/voteBtn';
import { CalcTotal } from '../../utils/calculate';
import { getReadVote } from '../../apis/readvote/readvote';
import { useGetToken } from '../../hooks/userToken/useGetToken';

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
  const usertoken = useGetToken();
  const [data, setData] = useState<responseType>();
  const [voteBtns, setVoteBtns] = useState<voteType[]>();
  const [selectedBtn, setSelectedBtn] = useState<number[]>([]);
  const [totalCount, setTotalCount] = useState<number>(20);
  const [isLoading, setIsLoading] = useState(false);
  const handleSelectedBtn = useCallback((array: any) => {
    setSelectedBtn(array);
  }, []);

  useEffect(() => {
    if (pid === undefined) {
      return;
    } else {
      setIsLoading(true);
      if (usertoken !== undefined) {
        getReadVote(pid, usertoken)?.then((res) => {
          setData({ ...res.data });
          setVoteBtns([...res.data.topicVoteItems]);
          setTotalCount(CalcTotal(res.data.topicVoteItems));
          setIsLoading(false);
        });
      } else {
        alert('로그인이 필요한 서비스입니다');
      }
    }
  }, [pid]);

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
              <CommentList topicId={pid} />
            </>
          )}
        </>
      </S.PageContainer>
    </>
  );
};

export default ReadVote;
