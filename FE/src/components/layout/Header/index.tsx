import React, { useEffect, useState } from 'react';
import { SearchSvg } from '../../../assets/search';
import * as S from './style';
import { MypageSvg } from '../../../assets/mypage';
import LocalStorage from '../../../constants/localstorage';
import SessionStorage from '../../../constants/sessionstorage';

import { useRouter } from 'next/router';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { LogoImg } from '../../../assets/logo';
import { Hamburger } from '../../../assets/hamburger';

const Header = () => {
  // 로그인 여부 확인 하는 변수!
  const [isAuth, setIsAuth] = useState(false);
  // const api = process.env.NEXT_PUBLIC_SERVER_URL;

  // const router = useRouter();
  // const nowUrl = router.query;
  // console.log('nowUrl : ', nowUrl);
  // useEffect(() => {
  //   axios
  //     .get(`${api}/kakao/callback`, {
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //         'ngrok-skip-browser-warning': 'any',
  //       },
  //       params: nowUrl,
  //     })
  //     .then((res: AxiosResponse) => {
  //       console.log('인가코드 백으로 보내기 res : ', res);
  //       const kakao_access: any = res.headers.authorization?.split(' ')[1];
  //       const kakao_refresh: any = res.headers.refreshtoken;
  //       LocalStorage.setItem('accesstoken', kakao_access);
  //       LocalStorage.setItem('refreshtoken', kakao_refresh);
  //       router.push('/mypage');
  //     })
  //     .catch((err: AxiosError) => {
  //       console.log('err : ', err.message);
  //     });
  // }, [nowUrl]);

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

  return (
    <S.HeaderContainer>
      <S.Logo href="/"><LogoImg /></S.Logo>
      <S.HamburgerIcon><Hamburger /></S.HamburgerIcon>
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
