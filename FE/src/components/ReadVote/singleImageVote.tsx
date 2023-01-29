import React from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';

interface propsTypes {
  content: string;
  count: number;
  isTopicVoteItemVoted: boolean;
}

export const SingleImageVote = ({
  content,
  count,
  isTopicVoteItemVoted,
}: propsTypes) => {
  const { isAuthor, isVoted, isClosed } = useSelector(
    (state: any) => state.currentVote,
  );
  return (
    <S.SingleImageContainer isTopicVoteItemVoted={isTopicVoteItemVoted}>
      <S.SingleImgItem src={content} />
      {isClosed ? <S.ImageVoteCount>{count + '%'}</S.ImageVoteCount> : null}
    </S.SingleImageContainer>
  );
};
