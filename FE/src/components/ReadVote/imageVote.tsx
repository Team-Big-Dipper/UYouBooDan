import Rreact from 'react';
import * as S from './style';

interface propsTypes {
  content: string;
  count: number;
  clicked: boolean;
}

export const ImageVote = ({ content, count, clicked }: propsTypes) => {
  return (
    <S.ImageContainer>
      <S.ImgItem src={content} clicked={clicked} />
      <S.ImageVoteCount>{count}표</S.ImageVoteCount>
    </S.ImageContainer>
  );
};
