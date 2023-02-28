import React, { useEffect } from 'react';
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
  isChangedComponent: boolean | undefined;
  setIsChangedComponent: Function;
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
  isChangedComponent,
  setIsChangedComponent,
}: propsTypes) => {
  useEffect(() => {
    const isChanged = ChangeTextItems(
      isClosed,
      //isAuthor,
      isTheFirstItem,
      isTopicVoteItemVoted,
    );
    setIsChangedComponent(isChanged);
  }, [isClosed, isAuthor, isTheFirstItem, isTopicVoteItemVoted]);
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
        {!isClosed ? null : calculated !== 0 ? calculated + '%' : null}
      </S.VoteResultPercentageDiv>
    </S.SelectTextSingle>
  );
};
