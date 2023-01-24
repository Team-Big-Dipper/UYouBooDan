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
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '80%',
          fontSize: '1rem',
          color: 'white',
          padding: '0.5rem 0.8rem',
          backgroundColor: '#4285f4',
          opacity: '90%',
          borderRadius: '10px',
          // display: 'flex',
        }}
      >
        {count}표
      </div>
    </S.ImageContainer>
  );
};
