import React from 'react';
import * as S from './style';

interface propsTypes {
  content: string;
  count: number;
  clicked: boolean;
}

export const DupleImageVote = ({ content, count, clicked }: propsTypes) => {
  return (
    <S.DupleImageContainer>
      <S.DupleImgItem src={content} clicked={clicked} />
      <S.ImageVoteCount>{count}표</S.ImageVoteCount>
    </S.DupleImageContainer>
  );
};
