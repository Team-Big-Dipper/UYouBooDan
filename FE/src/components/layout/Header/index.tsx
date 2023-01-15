import React from 'react';
import * as S from './style';

const Header = () => {
  return (
    <S.HeaderContainer>
      <S.Logo>우유부단</S.Logo>
      <S.Right>
        <S.Mypage>마이페이지</S.Mypage>
        <S.Vote>
          <S.AllVote>전체 투표</S.AllVote>
          <S.MakeVote>나만의 투표 만들기</S.MakeVote>
          <S.SearchDiv>
            <S.Search placeholder="검색어를 입력해주세요"></S.Search>
          </S.SearchDiv>
        </S.Vote>
      </S.Right>
    </S.HeaderContainer>
  );
};

export default Header;
