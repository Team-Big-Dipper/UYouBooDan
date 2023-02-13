import React, { useEffect, useState } from 'react';
import { SearchSvg } from '../../../assets/search';
import * as S from './style';
import { MypageSvg } from '../../../assets/mypage';
import LocalStorage from '../../../constants/localstorage';
import SessionStorage from '../../../constants/sessionstorage';
import { useRouter } from 'next/router';
import axios, { AxiosError, AxiosResponse } from 'axios';

import kakaoAuth from '../../../apis/oauth/kakaoLogin';

import { LogoImg } from '../../../assets/logo';
import { Hamburger } from '../../../assets/hamburger';
import { Menu } from '../../MobileNav/Menu';

const Header = () => {
  // 로그인 여부 확인 하는 변수!
  const [isAuth, setIsAuth] = useState(false);

  // storage에 accesstoken이 있을때 useEffect실행
  useEffect(() => {
    if (
      LocalStorage.getItem('accesstoken') ||
      SessionStorage.getItem('accesstoken')
    ) {
      setIsAuth(!isAuth);
    } else {
      setIsAuth(false);
    }
    console.log('LocalStorage.getItem : ', LocalStorage.getItem('accesstoken'));
    console.log(
      'SessionStorage.getItem : ',
      SessionStorage.getItem('accesstoken'),
    );
    console.log('isAuth : ', isAuth);
  }, [
    LocalStorage.getItem('accesstoken'),
    SessionStorage.getItem('accesstoken'),
  ]);

  //모바일화면 햄버거 클릭
  const [isOpen, setIsOpen] = useState(false);

  const HandleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <S.HeaderContainer>
      <S.Logo href="/">
        <LogoImg />
      </S.Logo>
      {/* <S.HamburgerIcon onClick={() => setIsOpen(!isOpen)}><Hamburger /></S.HamburgerIcon>
       */}
      <S.HamburgerIcon
        onClick={() => setIsOpen(!isOpen)}
        className={isOpen ? 'open' : ''}
      >
        <div className="top" />
        <div className="middle" />
        <div className="bottom" />
      </S.HamburgerIcon>
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
      <S.Right>
        {isAuth ? (
          <S.Mypage href="/mypage">
            <MypageSvg />
            마이페이지
          </S.Mypage>
        ) : (
          <S.LoginSignUpDiv>
            <S.Login href="/auth">로그인</S.Login>
            <S.SignUp href="/signup">회원가입</S.SignUp>
          </S.LoginSignUpDiv>
        )}
        <S.Vote>
          <S.AllVote href="/voteList">전체 투표</S.AllVote>
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
