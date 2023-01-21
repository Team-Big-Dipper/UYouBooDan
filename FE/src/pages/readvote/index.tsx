import React from 'react';
import * as S from './style';
import VoteTitle from './voteTitle';
import VoteContent from './voteContent';
import AnswerList from './answerList';
import { VoteContainer } from './VoteContainer';

const ReadVote = () => {
  const data = {
    category: '음식',
    title: '디카페인 vs 카페인',
    created_at: 20220101,
    author: '김밥',
    content: '안녕하세요',
    image:
      'https://cdn.pixabay.com/photo/2023/01/01/23/37/woman-7691013_640.jpg',
    vote: [
      { content: '카페인', count: 3 },
      { content: '디카페인', count: 4 },
    ],
    closedAt: 20220111,
    views: 10,
    likes: 5,
  };

  return (
    <S.PageContainer>
      <p>
        홈{'>'}카테고리{'>'}게시글
      </p>
      <VoteTitle
        category={data.category}
        title={data.title}
        createdAt={data.created_at}
        author={data.author}
        image={data.image}
        closedAt={data.closedAt}
        views={data.views}
        likes={data.likes}
      />
      <VoteContent content={data.content} />
      <>
        {data.vote.map((el, idx) => (
          <VoteContainer key={idx} vote={el} />
        ))}
      </>
      <AnswerList />
    </S.PageContainer>
  );
};

export default ReadVote;
