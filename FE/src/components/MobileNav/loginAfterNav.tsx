import React from "react";
import * as style from './style';
import { MakeVote } from '../../assets/makeVote';
import { ProfileImage2 } from "../../assets/profileImage2";

export const LogInAfterNav = () => {
  return(
    <style.LoginAfterContainer>
      <style.Hello>반가워요!</style.Hello>
      <style.Hello>투표를 진행해보세요!</style.Hello>
      <style.MakeVoteContainer>
        <MakeVote />
      </style.MakeVoteContainer>
      <style.userInformContainer>
        <style.Image><ProfileImage2 /></style.Image>
        <style.UserInform>
          <div className="username">user &gt;</div>
          <style.MypageLogoutContainer>
            <style.Mypage>마이페이지</style.Mypage>
            <div>&nbsp;|&nbsp;</div>
            <style.Logout>로그아웃</style.Logout>
          </style.MypageLogoutContainer>
        </style.UserInform>
      </style.userInformContainer>
    </style.LoginAfterContainer>
  )
}