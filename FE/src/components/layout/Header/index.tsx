import React, { useEffect, useState, useCallback } from 'react';
import { SearchSvg } from '../../../assets/search';
import * as S from './style';
import { MypageSvg } from '../../../assets/mypage';
import LocalStorage from '../../../constants/localstorage';
import SessionStorage from '../../../constants/sessionstorage';
import { useRouter } from 'next/router';
import { LogoImg } from '../../../assets/logo';
import { Hamburger } from '../../../assets/hamburger';
import { Menu } from '../../MobileNav/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { getVoteCondition } from '../../../redux/slices/getVoteConditionSlice';
import { isAuthTrue } from '../../../redux/slices/isAuthSlice';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.isAuthTrue.isAuth);
  console.log('Header -> isAuth 전역상태 state : ', state);

  const logoutHandler = () => {
    LocalStorage.removeItem('accesstoken');
    LocalStorage.removeItem('refreshtoken');
    SessionStorage.removeItem('accesstoken');
    dispatch(isAuthTrue({ isAuth: false }));
  };

  // storage에 accesstoken이 있을때 useEffect실행
  useEffect(() => {
    if (
      LocalStorage.getItem('accesstoken') ||
      SessionStorage.getItem('accesstoken')
    ) {
      dispatch(isAuthTrue({ isAuth: true }));
    } else {
      dispatch(isAuthTrue({ isAuth: false }));
    }
    console.log('LocalStorage.getItem : ', LocalStorage.getItem('accesstoken'));
    console.log(
      'SessionStorage.getItem : ',
      SessionStorage.getItem('accesstoken'),
    );
  }, [
    [],
    LocalStorage.getItem('accesstoken'),
    SessionStorage.getItem('accesstoken'),
  ]);

  //모바일화면 햄버거 클릭
  const [isOpen, setIsOpen] = useState(false);

  const HandleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleApiCondition = useCallback(() => {
    dispatch(getVoteCondition({ mobileCondition: 'all' }));
    router.push({ pathname: '/voteList' });
  }, []);
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
        {state ? (
          <S.MyPageLogoutDiv>
            <S.Mypage href="/mypage">
              <MypageSvg />
              마이페이지
            </S.Mypage>
            <S.Logout
              href="/main"
              onClick={() => {
                logoutHandler();
              }}
            >
              로그아웃
            </S.Logout>
          </S.MyPageLogoutDiv>
        ) : (
          <S.LoginSignUpDiv>
            <S.Login href="/auth">로그인</S.Login>
            <S.SignUp href="/signup">회원가입</S.SignUp>
          </S.LoginSignUpDiv>
        )}
        <S.Vote>
          <S.AllVote onClick={handleApiCondition}>전체 투표</S.AllVote>
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
