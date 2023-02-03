import * as S from './style';
import MyPageHeader from './MyPageHeader';
import LocalStorage from '../../constants/localstorage';
import SessionStorage from '../../constants/sessionstorage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { MakeVote } from '../../assets/makeVote';
import axios, { AxiosError, AxiosResponse } from 'axios';

const MyPage = () => {
  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();
  // 기본 값 내가 쓴 게시글
  const [selectCategory, setSelectCategory] =
    useState<string>('내가 쓴 게시글');

  const logoutHandler = () => {
    LocalStorage.removeItem('accesstoken');
    LocalStorage.removeItem('refreshtoken');
    SessionStorage.removeItem('accesstoken');
    router.push('/main', '/main');
  };

  useEffect(() => {
    axios
      .get(`${api}/members/find`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'ngrok-skip-browser-warning': 'any',
          Authorization: LocalStorage.getItem('accesstoken'),
        },
      })
      .then((res: AxiosResponse) => {
        console.log('mypage 정보요청 res : ', res);
      })
      .catch((err: AxiosError) => {
        console.log('err : ', err.message);
      });
  }, []);

  return (
    <S.MyPageContainer>
      <S.SideBarContainer>
        <S.SideBarRouteText>
          홈 {'>'} 마이페이지 {'>'} 내가 쓴 댓글
        </S.SideBarRouteText>
        <S.SibeBarCategotyDiv>
          <S.SideBarUserInfoDiv>
            <S.UserNickDiv>#띨렁이</S.UserNickDiv>
            <S.EditBtnDiv>개인정보수정</S.EditBtnDiv>
            <S.CreateVoteBtnDiv href="/createvote">
              <MakeVote />
            </S.CreateVoteBtnDiv>
          </S.SideBarUserInfoDiv>
          <S.CategoryDiv>
            <S.CategoryTitle>게시글관리</S.CategoryTitle>
            <S.UnderlineDiv></S.UnderlineDiv>
            <S.CategoryListDiv>
              <div
                onClick={() => {
                  setSelectCategory('내가 쓴 게시글');
                }}
              >
                내가 쓴 게시글
              </div>
              <div
                onClick={() => {
                  setSelectCategory('내가 쓴 댓글');
                }}
              >
                내가 쓴 댓글
              </div>
              <div
                onClick={() => {
                  setSelectCategory('나의 선택');
                }}
              >
                나의 선택
              </div>
            </S.CategoryListDiv>
          </S.CategoryDiv>
          <S.CategoryDiv>
            <S.CategoryTitle>정보관리</S.CategoryTitle>
            <S.UnderlineDiv></S.UnderlineDiv>
            <S.CategoryListDiv>
              <div>회원탈퇴</div>
              <div onClick={logoutHandler}>로그아웃</div>
            </S.CategoryListDiv>
          </S.CategoryDiv>
        </S.SibeBarCategotyDiv>
      </S.SideBarContainer>
      <S.MyPageRightContainer>
        <MyPageHeader category={selectCategory} />
      </S.MyPageRightContainer>
    </S.MyPageContainer>
  );
};

export default MyPage;
