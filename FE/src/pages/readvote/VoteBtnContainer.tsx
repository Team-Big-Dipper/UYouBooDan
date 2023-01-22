import React, { useState } from 'react';
import * as S from './style';

type propTypes = {
  content: string;
  count: number;
};
export const VoteBtnContainer = ({ content, count }: propTypes) => {
  const [clicked, setClicked] = useState(false);
  const handleFocus = () => {
    setClicked((prev) => !prev);
  };
  return (
    <S.SelectTextBtn onClick={handleFocus} clicked={clicked}>
      {content}
      {count}
    </S.SelectTextBtn>
  );
};
