import React from "react";
import * as style from './style';

export const LoginNav = () => {
  return(
    <style.LoginContainer>
      <a className="goLogin" href="/auth">로그인하기</a>
      <a className="SignUp" href="/signup">회원가입</a>
    </style.LoginContainer>
  )
}