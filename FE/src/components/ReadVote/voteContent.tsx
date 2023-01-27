import React from 'react';
import * as S from './style';
type propTypes = {
  content: string | undefined;
  image: string | undefined;
};
//질문: string타입 안에서 줄바꿈이 왜 안될까?
const VoteContent = ({ content, image }: propTypes) => {
  return (
    <>
      <S.VoteContent>{content}</S.VoteContent>
      <S.AddedImage>
        <img src={image} />
      </S.AddedImage>
    </>
  );
};

export default VoteContent;
