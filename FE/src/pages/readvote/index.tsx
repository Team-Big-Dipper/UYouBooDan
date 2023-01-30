import React, { useEffect, useState, useCallback, useMemo } from 'react';
import * as S from './style';
import VoteTitle from '../../components/ReadVote/voteTitle';
import VoteContent from '../../components/ReadVote/voteContent';
import AnswerList from '../../components/ReadVote/answerList';
//import { DupleVoteContainer } from '../../components/ReadVote/dupleVoteContainer';
import { SingleVoteContainer } from '../../components/ReadVote/singleVoteContainer';
import { useRouter } from 'next/router';
import VoteBtn from '../../components/ReadVote/voteBtn';
import { CalcTotal } from '../../utils/calculate';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent } from '../../redux/slices/currentVoteSlice';
import axios from 'axios';

interface stateType {
  id: number | undefined;
  category: string | undefined;
  title: string | undefined;
  created_at: any;
  author: string | undefined;
  content: string | undefined;
  image: string | undefined;
  vote: {
    isAuthor: boolean;
    isVoted: boolean;
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
  content: string;
  totalVote: number;
  id: number;
  isTopicVoteItemVoted: boolean;
}
const ReadVote = () => {
  const router = useRouter();
  const { pid } = router.query;
  const dispatch = useDispatch();
  const [data, setData] = useState<stateType>();
  const [voteBtns, setVoteBtns] = useState<voteType[]>();
  const [selectedBtn, setSelectedBtn] = useState<number[]>([]);
  const [totalCount, setTotalCount] = useState<number>(1);

  // redux
  // const testttt = useSelector((state: any) => state.createVote);
  // console.log('여기입니다', testttt);

  const handleSelectedBtn = useCallback((array: any) => {
    setSelectedBtn(array);
  }, []);

  //api요청
  useEffect(() => {
    if (!pid) return;
    axios.get(`/api/topics/${String(pid)}`).then((res) => {
      try {
        setData({ ...res.data[0] });
        setVoteBtns([...res.data[0].vote.topicVoteItems]);
        setTotalCount(CalcTotal(res.data[0].vote.topicVoteItems));
        dispatch(
          getCurrent({
            isAuthor: res.data[0].vote.isAuthor,
            isVoted: res.data[0].vote.isVoted,
            isClosed: res.data[0].closed,
          }),
        );
      } catch (e) {
        console.log(e);
      }
    });
  }, [pid]);
  const displayStyle = useMemo((): any => {
    if (data?.voteType === 'text') {
      return;
    } else {
      return { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' };
    }
  }, [data]);

  return (
    <S.PageContainer>
      <p>
        홈{' > '}카테고리{' > '}게시글
      </p>
      <VoteTitle
        category={data?.category}
        title={data?.title}
        createdAt={data?.created_at}
        author={data?.author}
        closedAt={data?.closedAt}
        views={data?.views}
        likes={data?.likes}
      />
      <VoteContent content={data?.content} image={data?.image} />
      <div style={displayStyle}>
        {voteBtns?.map((el, idx) => {
          // if (data?.duplicate) {
          //   //중복투표
          //   return (
          //     <DupleVoteContainer
          //       key={idx}
          //       id={el.id}
          //       content={el.content}
          //       count={el.totalVote}
          //       selectedBtn={selectedBtn}
          //       duplicate={data?.duplicate}
          //       handleSelectedBtn={handleSelectedBtn}
          //       voteType={data?.voteType}
          //       totalCount={totalCount}
          //       // isTopicVoteItemVoted={el.isTopicVoteItemVoted}
          //     />
          //   );
          // } else {
          //단일투표
          return (
            <SingleVoteContainer
              key={idx}
              id={el.id}
              content={el.content}
              count={el.totalVote}
              selectedBtn={selectedBtn}
              duplicate={data?.duplicate}
              handleSelectedBtn={handleSelectedBtn}
              voteType={data?.voteType}
              totalCount={totalCount}
              isTopicVoteItemVoted={el.isTopicVoteItemVoted}
            />
          );
          // }
        })}
      </div>
      <S.TotalVoteCount>
        {data?.closed ? '총투표수: ' + totalCount + '표' : null}
      </S.TotalVoteCount>
      <VoteBtn />
      <AnswerList id={pid} />
    </S.PageContainer>
  );
};

export default ReadVote;
