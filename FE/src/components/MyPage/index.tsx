import * as S from './style';
import MyPageHeader from './MyPageHeader';
import LocalStorage from '../../constants/localstorage';
import SessionStorage from '../../constants/sessionstorage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { MakeVote } from '../../assets/makeVote';
import axios, { AxiosError, AxiosResponse } from 'axios';
import MyProfile from './MyProfile';

const MyPage = () => {
  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();
  const defaultImg: string | undefined = process.env.NEXT_PUBLIC_DEFAULT_IMG;
  const [profile, setProfile] = useState<string>('');
  const [photo, setPhoto] = useState<string>('');
  const [editClick, setEditClick] = useState<boolean>(false);
  // 기본 값 내가 쓴 게시글
  const [selectCategory, setSelectCategory] =
    useState<string>('내가 쓴 게시글');

  const logoutHandler = () => {
    LocalStorage.removeItem('accesstoken');
    LocalStorage.removeItem('refreshtoken');
    SessionStorage.removeItem('accesstoken');
    router.push('/main', '/main');
  };

  const handleErrorImg = (e: any) => {
    e.target.src = defaultImg;
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
        setProfile(res.data.data.nickname);
        setPhoto(res.data.data.profile);
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
            <img
              width={80}
              height={80}
              src={photo}
              alt="Img"
              onError={handleErrorImg}
            />
            <S.UserNickDiv>#{profile}</S.UserNickDiv>
            <S.EditBtnDiv
              onClick={() => {
                setEditClick(true);
              }}
            >
              개인정보수정
            </S.EditBtnDiv>
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
                  setEditClick(false);
                  setSelectCategory('내가 쓴 게시글');
                  axios
                    .get(`${api}/member-info/topics?page=1&size=10`, {
                      headers: {
                        'Access-Control-Allow-Origin': '*',
                        'ngrok-skip-browser-warning': 'any',
                        Authorization: LocalStorage.getItem('accesstoken'),
                      },
                    })
                    .then((res: AxiosResponse) => {
                      console.log('res : ', res);
                    })
                    .catch((err: AxiosError) => {
                      console.log('err : ', err.message);
                    });
                }}
              >
                내가 쓴 게시글
              </div>
              <div
                onClick={() => {
                  setEditClick(false);
                  setSelectCategory('내가 쓴 댓글');
                }}
              >
                내가 쓴 댓글
              </div>
              <div
                onClick={() => {
                  setEditClick(false);
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
              <div
                onClick={() => {
                  setEditClick(false);
                }}
              >
                회원탈퇴
              </div>
              <div
                onClick={() => {
                  logoutHandler();
                  setEditClick(false);
                }}
              >
                로그아웃
              </div>
            </S.CategoryListDiv>
          </S.CategoryDiv>
        </S.SibeBarCategotyDiv>
      </S.SideBarContainer>
      <S.MyPageRightContainer>
        {editClick ? <MyProfile /> : <MyPageHeader category={selectCategory} />}
        {/* <MyPageHeader category={selectCategory} /> */}
      </S.MyPageRightContainer>
    </S.MyPageContainer>
  );
};

export default MyPage;
