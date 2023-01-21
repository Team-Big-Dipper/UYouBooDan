import React from 'react';
import Sidebar from './sidebar';
import ListPage from './listPage';
import * as S from './style';

const VoteList = () => {
  return (
    <S.PageContainer>
      <Sidebar />
      <ListPage />
    </S.PageContainer>
  );
};

export default VoteList;
