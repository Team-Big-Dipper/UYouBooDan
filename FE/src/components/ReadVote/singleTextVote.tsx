import React, { useState, useEffect } from 'react';
import * as S from './style';
import { ChangeTextItems } from '../../utils/changeVoteItems';
import { SmileIcon } from '../../assets/smileIcon';
import { IsVotedIcon } from '../../assets/isVotedIcon';

interface propsTypes {
  itemId: number;
  content: string;
  count: number | null;
  calculated: number;
  isTopicVoteItemVoted: boolean | null;
  isClosed: boolean | null | undefined;
  isAuthor: boolean | null | undefined;
  isTheFirstItem: boolean | undefined;
}
export const SingleTextVote = ({
  itemId,
  isAuthor,
  content,
  count,
  calculated,
  isTopicVoteItemVoted,
  isClosed,
  isTheFirstItem,
}: propsTypes) => {
  const [isChangedComponent, setIsChangedComponent] = useState<boolean>();
  useEffect(() => {
    const isChanged = ChangeTextItems(
      isClosed,
      isAuthor,
      isTheFirstItem,
      isTopicVoteItemVoted,
    );
    console.log(isChanged, '색깔');
    setIsChangedComponent(isChanged);
  }, [isTheFirstItem]);

  return (
    <S.SelectTextSingle isChangedComponent={isChangedComponent}>
      <S.VoteResultDiv>
        <span>{isTheFirstItem && isClosed ? <SmileIcon /> : null}</span>
        <span>
          {!isClosed && isTopicVoteItemVoted && !isAuthor ? (
            <IsVotedIcon />
          ) : null}
        </span>
        <S.VoteResultContent>
          <span>{content} </span>
          <span> {isAuthor && isClosed ? '(' + count + '표' + ')' : null}</span>
        </S.VoteResultContent>
      </S.VoteResultDiv>
      <S.VoteResultPercentageDiv isChangedComponent={isChangedComponent}>
        {isClosed ? calculated + '%' : null}
      </S.VoteResultPercentageDiv>
    </S.SelectTextSingle>
  );
};
