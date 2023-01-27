import React, { useEffect, useState, useCallback, useMemo } from 'react';
import * as S from './style';
import VoteTitle from '../../components/ReadVote/voteTitle';
import VoteContent from '../../components/ReadVote/voteContent';
import AnswerList from '../../components/ReadVote/answerList';
import { DupleVoteContainer } from '../../components/ReadVote/dupleVoteContainer';
import { SingleVoteContainer } from '../../components/ReadVote/singleVoteContainer';
import { useRouter } from 'next/router';
import VoteBtn from '../../components/ReadVote/voteBtn';
import { CalcTotal } from '../../utils/calculate';
//redux
import { useDispatch } from 'react-redux';
import { getCurrent } from '../../redux/slices/currentVoteSlice';

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
  const displayStyle = useMemo((): any => {
    if (data?.voteType === 'image') {
      return { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' };
    } else {
      return;
    }
  }, [data?.voteType]);

  const handleSelectedBtn = useCallback((array: any) => {
    setSelectedBtn(array);
  }, []);
  //api요청하는 곳
  useEffect(() => {
    console.log(pid, 'api call');
    const data2 = {
      id: 1,
      category: '음식',
      title: '디카페인 vs 카페인',
      created_at: 20220101,
      author: '김밥튀김',
      content:
        '안녕하세요 점심으로 뭘 먹을지 고민중인데 골라줘!\n반짝이는 피고, 품에 오직 하는 보는 기관과 약동하다. 긴지라 어디 아니더면, 지혜는 너의 유소년에게서 것은 일월과 사막이다. 생의 우리 그것은 그리하였는가? 가슴이 같이, 이상 피부가 찾아 그리하였는가? 실현에 수 그들의 인도하겠다는 위하여서. 가진 새 청춘의 위하여, 없는 현저하게 원대하고, 인간의 철환하였는가?',
      image:
        'https://cdn.pixabay.com/photo/2023/01/01/23/37/woman-7691013_640.jpg',
      vote: {
        isAuthor: false,
        isVoted: false,
        topicVoteItems: [
          {
            id: 1,
            content: '카페인',
            totalVote: 3,
            isTopicVoteItemVoted: false,
          },
          {
            id: 2,
            content: '디카페인',
            totalVote: 5,
            isTopicVoteItemVoted: false,
          },
          {
            id: 3,
            content: '아무거나',
            totalVote: 7,
            isTopicVoteItemVoted: false,
          },
          { id: 4, content: '둘다', totalVote: 12, isTopicVoteItemVoted: true },
        ],
      },
      // vote: [
      //   {
      //     id: 1,
      //     content:
      //       'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032__480.jpg',
      //     totalVote: 3,
      //     isTopicVoteItemVoted: false,
      //   },
      //   {
      //     id: 2,
      //     content:
      //       'https://cdn.pixabay.com/photo/2017/03/23/19/57/asparagus-2169305__480.jpg',
      //     totalVote: 4,
      //     isTopicVoteItemVoted: false,
      //   },
      // {
      //   id: 3,
      //   content:
      //     'https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552__480.jpg',
      //   totalVote: 14,
      //   isTopicVoteItemVoted: true,
      // },
      // {
      //   id: 4,
      //   content:
      //     'https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523__480.jpg',
      //   totalVote: 4,
      //   isTopicVoteItemVoted: false,
      // },
      // {
      //   id: 5,
      //     content:
      //       'https://cdn.pixabay.com/photo/2018/10/14/18/29/meatloaf-3747129__480.jpg',
      //     totalVote: 9,
      //     isTopicVoteItemVoted: false,
      //   },
      //   {
      //     id: 6,
      //     content:
      //       'https://cdn.pixabay.com/photo/2018/05/01/18/21/eclair-3366430__480.jpg',
      //     totalVote: 5,
      //     isTopicVoteItemVoted: false,
      //   },
      // ],
      closedAt: 20220111,
      views: 10,
      likes: 5,
      duplicate: false,
      voteType: 'text',
      closed: false,
    };
    dispatch(
      getCurrent({
        isAuthor: data2.vote.isAuthor,
        isVoted: data2.vote.isVoted,
        isClosed: data2.closed,
      }),
    );
    setData({ ...data2 });
    setVoteBtns([...data2.vote.topicVoteItems]);
    setTotalCount(CalcTotal(data2.vote.topicVoteItems));
  }, [pid]);

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
        dday={data?.closedAt - data?.created_at}
        views={data?.views}
        likes={data?.likes}
      />
      <VoteContent content={data?.content} image={data?.image} />
      <div style={displayStyle}>
        {voteBtns?.map((el, idx) => {
          if (data?.duplicate) {
            //중복투표
            return (
              <DupleVoteContainer
                key={idx}
                id={el.id}
                content={el.content}
                count={el.totalVote}
                selectedBtn={selectedBtn}
                duplicate={data?.duplicate}
                handleSelectedBtn={handleSelectedBtn}
                voteType={data?.voteType}
                totalCount={totalCount}
                // isTopicVoteItemVoted={el.isTopicVoteItemVoted}
              />
            );
          } else {
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
          }
        })}
      </div>
      <S.TotalVoteCount>
        {data?.closed ? '총투표수: ' + totalCount + '표' : null}
      </S.TotalVoteCount>
      <VoteBtn />
      <AnswerList />
    </S.PageContainer>
  );
};

export default ReadVote;
