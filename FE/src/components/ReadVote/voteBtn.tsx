import React, { useState } from 'react';
import * as S from './style';

const VoteBtn = () => {
  const [login, setIsLogin] = useState(true);
  const [ended, setEnded] = useState(false);
  return (
    <S.buttonContainer>
      {login ? (
        <>
          {ended ? (
            <>
              <S.button>투표하기</S.button>
              <S.button color={'#4285f4'}>목록가기</S.button>
            </>
          ) : (
            <>
              <S.button>삭제하기</S.button>
              <S.button color={'gray'}>수정하기</S.button>
              <S.button color={'#4285f4'}>목록가기</S.button>
            </>
          )}
        </>
      ) : (
        <S.button color={'#4285f4'}>목록가기</S.button>
      )}
    </S.buttonContainer>
  );
};

export default VoteBtn;
