import React from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';

interface propsTypes {
  content: string;
  count: number;
  isTopicVoteItemVoted: boolean;
}
export const SingleTextVote = ({
  content,
  count,
  isTopicVoteItemVoted,
}: propsTypes) => {
  const { isAuthor, isVoted, isClosed } = useSelector(
    (state: any) => state.currentVote,
  );

  return (
    <S.SelectTextSingle isTopicVoteItemVoted={isTopicVoteItemVoted}>
      {content} {isClosed ? count + '%' : null}
    </S.SelectTextSingle>
  );
};
