import React from "react";
import * as style from './style';

export const LoginNav = () => {
  return(
    <style.LoginContainer>
      <div className="goLogin">로그인하기</div>
      <div className="SignUp">회원가입</div>
    </style.LoginContainer>
  )
}