import React from 'react';
import * as S from './style';

interface propsTypes {
  content: string;
  count: number;
  clicked: boolean;
}
export const TextVote = ({ content, count, clicked }: propsTypes) => {
  return (
    <S.SelectTextDuple clicked={clicked}>
      {content}
      {count}
    </S.SelectTextDuple>
  );
};
