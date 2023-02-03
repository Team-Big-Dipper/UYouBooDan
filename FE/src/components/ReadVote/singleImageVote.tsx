import React, { useState, useEffect } from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';
import { useChangeImageItems } from '../../hooks/readvote/useChangeVoteItems';

interface propsTypes {
  id: number;
  content: string;
  count: number;
  isTopicVoteItemVoted: boolean;
}

export const SingleImageVote = ({
  id,
  content,
  count,
  isTopicVoteItemVoted,
}: propsTypes) => {
  const { isAuthor, isVoted, isClosed, bestItem } = useSelector(
    (state: any) => state.currentVote,
  );

  const isChangedComponent = useChangeImageItems(
    id,
    isClosed,
    bestItem,
    isTopicVoteItemVoted,
  );

  return (
    <S.SingleImageContainer isChangedComponent={isChangedComponent}>
      <S.SingleImgItem src={content} />
      {isClosed ? <S.ImageVoteCount>{count + '%'}</S.ImageVoteCount> : null}
    </S.SingleImageContainer>
  );
};
