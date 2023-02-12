import React from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';
import { useChangeTextItems } from '../../hooks/readvote/useChangeVoteItems';

interface propsTypes {
  itemId: number;
  content: string;
  count: number;
  isTopicVoteItemVoted: boolean;
}
export const SingleTextVote = ({
  itemId,
  content,
  count,
  isTopicVoteItemVoted,
}: propsTypes) => {
  const { isAuthor, isVoted, isClosed, theFirstVoteId } = useSelector(
    (state: any) => state.currentVote,
  );
  const isChangedComponent = useChangeTextItems(
    itemId,
    isClosed,
    theFirstVoteId,
    isTopicVoteItemVoted,
  );

  return (
    <S.SelectTextSingle isChangedComponent={isChangedComponent}>
      {content} {isClosed ? count + '%' : null}
    </S.SelectTextSingle>
  );
};
