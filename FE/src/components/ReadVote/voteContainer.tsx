import React, { useState } from 'react';
import * as S from './style';

type propTypes = {
  content: string;
  count: number;
  selectedBtn: string[];
  handleSelectedBtn: Function;
};
export const VoteContainer = ({
  content,
  count,
  selectedBtn,
  handleSelectedBtn,
}: propTypes) => {
  const [clicked, setClicked] = useState(false);
  const handleFocus = () => {
    setClicked((prev) => !prev);
  };

  const onVote = () => {
    if (clicked) {
      handleFocus();
      let result = selectedBtn.filter((el) => el !== content);
      return handleSelectedBtn([...result]);
    } else {
      handleFocus();
      return handleSelectedBtn([...selectedBtn, content]);
    }
  };
  console.log(selectedBtn);

  return (
    <S.SelectTextBtn onClick={onVote} clicked={clicked}>
      {content}
      {count}
    </S.SelectTextBtn>
  );
};
