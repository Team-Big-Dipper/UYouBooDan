import React, { useEffect, useState, useCallback } from 'react';
import * as S from './style';
import VoteTitle from '../../components/ReadVote/voteTitle';
import VoteContent from '../../components/ReadVote/voteContent';
import AnswerList from '../../components/ReadVote/answerList';
import { VoteContainer } from '../../components/ReadVote/VoteContainer';
import { useRouter } from 'next/router';
import VoteBtn from '../../components/ReadVote/voteBtn';

interface stateType {
  id: number | undefined;
  category: string | undefined;
  title: string | undefined;
  created_at: any;
  author: string | undefined;
  content: string | undefined;
  image: string | undefined;
  vote: { content: string; count: number }[];
  closedAt: any;
  views: number;
  likes: number;
}

interface voteType {
  content: string;
  count: number;
}
const ReadVote = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [data, setData] = useState<stateType>();
  const [voteBtns, setVoteBtns] = useState<voteType[]>();
  const [selectedBtn, setSelectedBtn] = useState<string[]>([]);

  const handleSelectedBtn = useCallback((array: string[]) => {
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
      author: '김밥',
      content:
        '안녕하세요 점심으로 뭘 먹을지 고민중인데 골라줘!\n반짝이는 피고, 품에 오직 하는 보는 기관과 약동하다. 긴지라 어디 아니더면, 지혜는 너의 유소년에게서 것은 일월과 사막이다. 생의 우리 그것은 그리하였는가? 가슴이 같이, 이상 피부가 찾아 그리하였는가? 실현에 수 그들의 인도하겠다는 위하여서. 가진 새 청춘의 위하여, 없는 현저하게 원대하고, 인간의 철환하였는가?',
      image:
        'https://cdn.pixabay.com/photo/2023/01/01/23/37/woman-7691013_640.jpg',
      vote: [
        { content: '카페인', count: 3 },
        { content: '디카페인', count: 4 },
        { content: '아무거나', count: 4 },
        { content: '둘다', count: 4 },
      ],
      closedAt: 20220111,
      views: 10,
      likes: 5,
    };
    setData({ ...data2 });
    setVoteBtns([...data2.vote]);
  }, [pid]);

  return (
    <S.PageContainer>
      <p>
        홈{'>'}카테고리{'>'}게시글
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
      <>
        {voteBtns?.map((el, idx) => (
          <VoteContainer
            key={idx}
            content={el.content}
            count={el.count}
            selectedBtn={selectedBtn}
            handleSelectedBtn={handleSelectedBtn}
          />
        ))}
      </>
      <VoteBtn />
      <AnswerList />
    </S.PageContainer>
  );
};

export default ReadVote;
