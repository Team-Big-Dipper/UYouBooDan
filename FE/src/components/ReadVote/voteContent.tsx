import React from 'react';
import * as S from './style';
type propTypes = {
  content: string | undefined;
  image: string | undefined;
};
//질문: string타입 안에서 줄바꿈이 왜 안될까?
const VoteContent = ({ content, image }: propTypes) => {
  return (
    <S.VoteContentContainer>
      <S.VoteContent>{content}</S.VoteContent>
      <S.AddedImageContainer>
        <S.AddedImage src={image} />
      </S.AddedImageContainer>
    </S.VoteContentContainer>
  );
};

export default VoteContent;
