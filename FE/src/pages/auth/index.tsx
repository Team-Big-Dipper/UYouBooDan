import React from 'react';
import Login from './login';
import * as S from './style';

const auth = () => {
  return (
    <S.AuthPageContainer>
      <Login />
    </S.AuthPageContainer>
  );
};

export default auth;
