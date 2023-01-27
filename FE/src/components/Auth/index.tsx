import React, { useState } from 'react';
import * as S from './style';
import { useForm } from 'react-hook-form';
import { DeleteSvg } from '../../assets/delete';
import { VectorSvg } from '../../assets/vector';
import { FailureSvg } from '../../assets/failure';
import { KakaoSvg } from '../../assets/kakaoSvg';
import { NaverSvg } from '../../assets/naverSvg';
import { GoogleSvg } from '../../assets/googleSvg';

const Auth = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onChange',
  });
  const [loginMsg, setLoginMsg] = useState<string>(
    '이메일 혹은 비밀번호를 확인하세요.',
  );
  const [checked, setChecked] = useState<boolean>(false);
  console.log('checked : ', checked);

  return (
    <S.AuthContainer>
      <form>
        <S.AuthLogo>우</S.AuthLogo>
        <S.LoginTitle>
          우유부단 이용을 위해 <br></br>
          <span>로그인</span>해주세요
        </S.LoginTitle>
        <S.LoginEmailContainer>
          <S.LoginEmailTitle>아이디</S.LoginEmailTitle>
          <S.LoginEmailInputDiv>
            <input
              type="text"
              placeholder="이메일을 입력해주세요."
              {...register('email')}
            />
            <S.LoginEmailDeleteDiv>
              <DeleteSvg />
            </S.LoginEmailDeleteDiv>
          </S.LoginEmailInputDiv>
        </S.LoginEmailContainer>
        <S.PwContainer>
          <S.PwTitle>비밀번호</S.PwTitle>
          <S.PwInputDiv>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register('password')}
            />
            <S.PwDeleteDiv>
              <DeleteSvg />
            </S.PwDeleteDiv>
            <S.PwVectorDiv>
              <VectorSvg />
            </S.PwVectorDiv>
          </S.PwInputDiv>
          <S.LoginValidMsg>
            {/* {등록된 이메일이 아니거나 비밀번호가 틀렸을 경우 ? <></>} */}
            <FailureSvg />
            {loginMsg}
          </S.LoginValidMsg>
        </S.PwContainer>
        <S.ContinueCheckBoxDiv>
          <input
            type="checkbox"
            onChange={() => {
              setChecked(!checked);
            }}
          />
          <div>로그인 유지</div>
        </S.ContinueCheckBoxDiv>
        <S.SearchAndSignUpDiv>
          <S.SearchDiv>
            <S.SearchId>아이디 찾기</S.SearchId>
            <S.SearchDecoDiv></S.SearchDecoDiv>
            <S.SearchPw>비밀번호 찾기</S.SearchPw>
          </S.SearchDiv>
          <S.SignUpBtnDiv href={'/signup'}>회원가입</S.SignUpBtnDiv>
        </S.SearchAndSignUpDiv>
        <S.LoginBtnDiv>
          <button type="button">로그인</button>
        </S.LoginBtnDiv>
      </form>
      <S.SnsLoginTitleDiv>
        <S.FirstDeco></S.FirstDeco>
        <S.SnsLoginTitle>SNS LOGIN</S.SnsLoginTitle>
        <S.SecondDeco></S.SecondDeco>
      </S.SnsLoginTitleDiv>
      <S.SnsLoginContainer>
        <S.KaKaoLoginDiv>
          <KakaoSvg />
        </S.KaKaoLoginDiv>
        <S.NaverLoginDiv>
          <NaverSvg />
        </S.NaverLoginDiv>
        <S.GoogleLoginDiv>
          <GoogleSvg />
        </S.GoogleLoginDiv>
      </S.SnsLoginContainer>
    </S.AuthContainer>
  );
};

export default Auth;
