import React from 'react';
import * as S from './style';
type propTypes = {
  content: string | undefined;
  image: string | undefined | null;
};
const VoteContent = ({ content, image }: propTypes) => {
  return (
    <S.VoteContentContainer>
      <S.VoteContent>{content}</S.VoteContent>
      {!image ? null : (
        <S.AddedImageContainer>
          <S.AddedImage src={image} />
        </S.AddedImageContainer>
      )}
    </S.VoteContentContainer>
  );
};

export default VoteContent;
