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
  const [totalCount, setTotalCount] = useState<number>(1);

  const handleSelectedBtn = useCallback((array: any) => {
    setSelectedBtn(array);
  }, []);

  //api요청
  useEffect(() => {
    if (!pid) return;
    getReadVote(Number(pid))?.then((res) => {
      console.log(res, 'pid', pid);
      setData(res.data);
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
    });
  }, [pid]);
  // redux
  const { isClosed, isAuthor } = useSelector((state: any) => state.currentVote);
  console.log(isClosed, isAuthor);
  const displayStyle = useMemo((): object => {
    if (data) {
      return {
        display: 'flex',
        flexDirection: 'column',
        margin: '10px 10px 0px 10px',
      };
    } else {
      return { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' };
    }
  }, [data]);

  return (
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

        <div style={displayStyle}>
          {voteBtns?.map((el, idx) => {
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
      <CommentList id={pid} />
    </S.PageContainer>
  );
};

export default ReadVote;
