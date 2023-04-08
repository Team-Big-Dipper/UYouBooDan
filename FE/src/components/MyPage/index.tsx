import * as S from './style';
import MyPageHeader from './MyPageHeader';
import LocalStorage from '../../constants/localstorage';
import SessionStorage from '../../constants/sessionstorage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MakeVote } from '../../assets/makeVote';
import axios, { AxiosError, AxiosResponse } from 'axios';
import MyProfile from './MyProfile';
import EditProfile from './MyProfile/EditProfile';
import { FaceSvg } from '../../assets/face';

const MyPage = () => {
  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();
  // const defaultImg: string | undefined = process.env.NEXT_PUBLIC_DEFAULT_IMG;
  const [emailData, setEmailData] = useState<string>('');
  const [nickData, setNickData] = useState<string>('');
  const [photoData, setPhotoData] = useState<string>('');
  const [editClick, setEditClick] = useState<boolean>(false);
  const [successPw, setSuccessPw] = useState<boolean>(false);
  // 기본 값 내가 쓴 게시글
  const [selectCategory, setSelectCategory] =
    useState<string>('내가 쓴 게시글');

  const logoutHandler = () => {
    LocalStorage.removeItem('accesstoken');
    LocalStorage.removeItem('refreshtoken');
    SessionStorage.removeItem('accesstoken');
    router.push('/main', '/main');
  };

  // const handleErrorImg = (e: any) => {
  //   e.target.src = defaultImg;
  // };

  const [token, setToken] = useState<any>('');
  console.log('token : ', token);
  console.log('Authorization : ', token !== null ? `Bearer ${token}` : null);

  useEffect(() => {
    setToken(
      LocalStorage.getItem('accesstoken') ||
        SessionStorage.getItem('accesstoken') ||
        null,
    );
    axios
      .get(`${api}/members/find`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'ngrok-skip-browser-warning': 'any',
          Authorization: token !== null ? `Bearer ${token}` : null,
          // LocalStorage.getItem('accesstoken') !== null
          //   ? `Bearer ${LocalStorage.getItem('accesstoken')}`
          //   : SessionStorage.getItem('accesstoken') !== null
          //   ? `Bearer ${SessionStorage.getItem('accesstoken')}`
          //   : null,
        },
      })
      .then((res: AxiosResponse) => {
        console.log('mypage 정보요청 res : ', res);
        const nickname = res.data.data.nickname;
        const photo = res.data.data.profile;
        const email = res.data.data.email;
        setEmailData(email);
        setNickData(nickname);
        setPhotoData(photo);
      })
      .catch((err: AxiosError) => {
        console.log('mypage 정보요청 err : ', err.message);
      });
  }, []);

  return (
    <S.MyPageContainer>
      <S.SideBarContainer>
        <S.SideBarRouteText>
          홈 {'>'} 마이페이지 {'>'}{' '}
          {editClick ? '개인정보수정' : selectCategory}
        </S.SideBarRouteText>
        <S.SibeBarCategotyDiv>
          <S.SideBarUserInfoDiv>
            <img
              width={80}
              height={80}
              src={`blob:${photoData}`}
              onError={() => {}}
            />
            <>{console.log('photoData : ', photoData)}</>
            <S.SideBarImgDiv>
              <FaceSvg />
            </S.SideBarImgDiv>
            <S.UserNickDiv>#{nickData}</S.UserNickDiv>
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
                  setSuccessPw(false);
                  setSelectCategory('내가 쓴 게시글');
                  axios
                    .get(`${api}/member-info/topics?page=1&size=10`, {
                      headers: {
                        'Access-Control-Allow-Origin': '*',
                        'ngrok-skip-browser-warning': 'any',
                        Authorization: `Bearer ${LocalStorage.getItem(
                          'accesstoken',
                        )}`,
                      },
                    })
                    .then((res: AxiosResponse) => {
                      console.log('내가 쓴 게시글 res : ', res);
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
                  setSuccessPw(false);
                  setSelectCategory('내가 쓴 댓글');
                }}
              >
                내가 쓴 댓글
              </div>
              <div
                onClick={() => {
                  setEditClick(false);
                  setSuccessPw(false);
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
                  setSuccessPw(false);
                }}
              >
                로그아웃
              </div>
            </S.CategoryListDiv>
          </S.CategoryDiv>
        </S.SibeBarCategotyDiv>
      </S.SideBarContainer>
      <S.MyPageRightContainer>
        {editClick && !successPw ? (
          <MyProfile setSuccessPw={setSuccessPw} />
        ) : editClick && successPw ? (
          <EditProfile
            emailData={emailData}
            nickData={nickData}
            photoData={photoData}
            setEditClick={setEditClick}
            setSuccessPw={setSuccessPw}
          />
        ) : (
          <MyPageHeader category={selectCategory} />
        )}
      </S.MyPageRightContainer>
    </S.MyPageContainer>
  );
};

export default MyPage;
