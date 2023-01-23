import React from 'react';
import { SearchSvg } from '../../../assets/search';
import * as S from './style';
// import { MypageSvg } from '../../../assets/mypage';
import Link from 'next/link';

const Header = () => {
  return (
    <S.HeaderContainer>
      <S.Logo href="/">우유부단</S.Logo>
      <S.Right>
        {/* <S.Mypage href="/mypage">
          <MypageSvg />
          마이페이지
        </S.Mypage> */}
        <S.LoginSignUpDiv>
          <S.Login href="/login">로그인</S.Login>
          <S.SignUp href="/signup">회원가입</S.SignUp>
        </S.LoginSignUpDiv>
        <S.Vote>
          <S.AllVote href="/votelist">전체 투표</S.AllVote>
          <S.MakeVote href="/createvote">나만의 투표 만들기</S.MakeVote>
          <S.SearchDiv>
            <S.Search placeholder="검색어를 입력해주세요"></S.Search>
            <SearchSvg />
          </S.SearchDiv>
        </S.Vote>
      </S.Right>
    </S.HeaderContainer>
  );
};

export default Header;
