import React, { useState, useEffect } from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';
import { useChangeTextItems } from '../../hooks/readvote/useChangeVoteItems';

interface propsTypes {
  id: number;
  content: string;
  count: number;
  isTopicVoteItemVoted: boolean;
}
export const SingleTextVote = ({
  id,
  content,
  count,
  isTopicVoteItemVoted,
}: propsTypes) => {
  const { isAuthor, isVoted, isClosed, bestItem } = useSelector(
    (state: any) => state.currentVote,
  );
  const isChangedComponent = useChangeTextItems(
    id,
    isClosed,
    bestItem,
    isTopicVoteItemVoted,
  );

  return (
    <S.SelectTextSingle isChangedComponent={isChangedComponent}>
      {content} {isClosed ? count + '%' : null}
    </S.SelectTextSingle>
  );
};
