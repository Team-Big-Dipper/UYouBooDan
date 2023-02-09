import React, { useEffect, useState, useCallback, useMemo } from 'react';
import * as S from './style';
import VoteTitle from '../../components/ReadVote/voteTitle';
import VoteContent from '../../components/ReadVote/voteContent';
import CommentList from '../../components/ReadVote/CommentList';
import { SingleVoteContainer } from '../../components/ReadVote/singleVoteContainer';
import { useRouter } from 'next/router';
import VoteBtn from '../../components/ReadVote/voteBtn';
import { CalcTotal } from '../../utils/calculate';
import { getReadVote } from '../../apis/readvote';
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
  const [data, setData] = useState<stateType>();
  const [voteBtns, setVoteBtns] = useState<voteType[]>();
  const [selectedBtn, setSelectedBtn] = useState<number[]>([]);
  const [totalCount, setTotalCount] = useState<number>(20);
  const [isLoading, setIsLoading] = useState(false);
  const handleSelectedBtn = useCallback((array: any) => {
    setSelectedBtn(array);
  }, []);
  //api요청
  useEffect(() => {
    console.log('pageid', pid);
    if (pid === undefined) {
      return;
    } else {
      setIsLoading(true);
      getReadVote(pid)?.then((res) => {
        setData({ ...res.data });
        setVoteBtns([...res.data.topicVoteItems]);
        setTotalCount(CalcTotal(res.data.topicVoteItems));
        dispatch(
          getCurrent({
            isAuthor: res.data.isAuthor,
            isVoted: res.data.isVoted,
            isClosed: res.data.closed,
            bestItem: res.data.bestItem,
          }),
        );
        setIsLoading(false);
      });
    }
  }, [pid]);
  // redux
  const { isClosed, isAuthor } = useSelector((state: any) => state.currentVote);

  return (
    <>
      {isLoading ? (
        <p>로딩중...</p>
      ) : (
        <>
          <S.PageContainer>
            <S.CurrentCategoty>
              <S.LinkButton href="/">홈</S.LinkButton>
              {' > '}카테고리{' > '}게시글
            </S.CurrentCategoty>
            <VoteTitle
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
                      id={el.topicVoteItemId}
                      content={el.topicVoteItemName}
                      count={el.numberOfVotes}
                      selectedBtn={selectedBtn}
                      handleSelectedBtn={handleSelectedBtn}
                      totalCount={totalCount}
                      isTopicVoteItemVoted={el.isTopicVoteItemVoted}
                    />
                  );
                })}
              </div>
              <S.TotalVoteCount isClosed={isClosed}>
                {isClosed && isAuthor ? '총투표수: ' + totalCount + '표' : null}
              </S.TotalVoteCount>
              <VoteBtn />
            </S.VoteContentLayout>
            <CommentList topicId={pid} />
          </S.PageContainer>
        </>
      )}
    </>
  );
};

export default ReadVote;
