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
import { CalcDday } from '../../utils/calculate';
import { useGetToken } from '../../hooks/userToken/useGetToken';
import FindTheFirstItem from '../../utils/findtheFirstItem';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent } from '../../redux/slices/currentVoteSlice';

interface stateType {
  id: number | undefined;
  category: string | undefined;
  title: string | undefined;
  createdAt: any;
  author: string | undefined;
  content: string | undefined;
  image: string | undefined;
  vote: {
    isAuthor: boolean;
    isVoted: boolean;
    bestItem: number;
    topicVoteItems: { content: string; totalVote: number }[];
  };
  closedAt: any;
  views: number;
  likes: number;
  duplicate: boolean | undefined;
  voteType: string;
  closed: boolean;
}

interface voteType {
  topicVoteItemName: string;
  totalVote: number;
  topicVoteItemId: number;
  isTopicVoteItemVoted: boolean;
  numberOfVotes: number;
}
const ReadVote = () => {
  const router = useRouter();
  const { pid } = router.query;
  const dispatch = useDispatch();
  const usertoken = useGetToken();
  const [data, setData] = useState<stateType>();
  const [theFirstVoteItem, setTheFirstVoteItem] = useState<object>();
  const [voteBtns, setVoteBtns] = useState<voteType[]>();
  const [selectedBtn, setSelectedBtn] = useState<number[]>([]);
  const [totalCount, setTotalCount] = useState<number>(20);
  const [isLoading, setIsLoading] = useState(false);
  const handleSelectedBtn = useCallback((array: any) => {
    setSelectedBtn(array);
  }, []);
  // redux
  const { isClosed, isAuthor } = useSelector((state: any) => state.currentVote);

  useEffect(() => {
    console.log('pageid', pid);
    if (pid === undefined) {
      return;
    } else {
      setIsLoading(true);
      if (usertoken !== undefined) {
        getReadVote(pid, usertoken)?.then((res) => {
          const dday = CalcDday(res.data.closedAt);
          const theFirst = FindTheFirstItem(res.data.topicVoteItems);
          const dispatchCurrentObj = {
            isAuthor: res.data.isAuthor,
            isVoted: res.data.isVoted,
            theFirstVoteId: theFirst.numberOfVotes,
          };
          setData({ ...res.data });
          setVoteBtns([...res.data.topicVoteItems]);
          setTotalCount(CalcTotal(res.data.topicVoteItems));
          if (dday.length === 0) {
            dispatch(
              getCurrent({
                ...dispatchCurrentObj,
                isClosed: true,
              }),
            );
          } else {
            dispatch(
              getCurrent({
                ...dispatchCurrentObj,
                isClosed: false,
              }),
            );
          }
          setIsLoading(false);
        });
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
                      />
                    );
                  })}
                </div>
                <S.TotalVoteCount isClosed={isClosed}>
                  {isClosed && isAuthor
                    ? '총투표수: ' + totalCount + '표'
                    : null}
                </S.TotalVoteCount>
                <VoteBtn />
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
