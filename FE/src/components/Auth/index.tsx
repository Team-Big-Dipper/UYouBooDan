import React, { useEffect, useState } from 'react';
import * as S from './style';
import { useForm } from 'react-hook-form';
import { DeleteSvg } from '../../assets/delete';
import { VectorSvg } from '../../assets/vector';
import { NoVectorSvg } from '../../assets/noVector';
import { FailureSvg } from '../../assets/failure';
import { KakaoSvg } from '../../assets/kakaoSvg';
import { NaverSvg } from '../../assets/naverSvg';
import { GoogleSvg } from '../../assets/googleSvg';
import { NoCheckSvg } from '../../assets/noCheck';
import { OnCheckSvg } from '../../assets/onCheck';
import axios, { AxiosResponse, AxiosError } from 'axios';
import kakaoAuth from '../../apis/oauth/kakaoLogin';
import useLogin from '../../hooks/login/useLogin';
import { useRouter } from 'next/router';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants/regex';

const Auth = () => {
  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  const { authCodeRequest } = kakaoAuth();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onChange',
  });
  const router = useRouter();
  const { checkedLogin, loginMsgFunc } = useLogin();
  const [loginMsg, setLoginMsg] = useState<string>('');
  const [vector, setVector] = useState(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  const onValid = (data: any): void => {
    if (isValid) {
      axios
        .post(`${api}/auth/login`, data)
        .then((res: AxiosResponse) => {
          console.log('로그인 성공!');
          console.log('로그인 버튼 눌렀을때 res : ', res);
          console.log(
            'res.headers.authorization : ',
            res.headers.authorization,
          );
          const access_token: any = res.headers.authorization?.split(' ')[1];
          const refresh_token: any = res.headers.refreshtoken;
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${access_token}`;
          checkedLogin(access_token, refresh_token, checked);

          console.log('res.data', res.data);
          router.push('/main');
        })
        .catch((err: AxiosError) => {
          console.log('로그인 실패!');
          console.log('err : ', err);
          console.log('err.response.data : ', err.response?.data);
          const errMsg: any = err.response?.data;
          console.log('err.message : ', err.message);
          loginMsgFunc(errMsg, setLoginMsg);
        });
    }
  };
  // 유효성메세지가 계속 나오게 하지 않기 위해
  // 유효성 에러메세지가 나온뒤 수정할때 input값을 한쪽이라도 지우면
  // 유효성 메세지 사라지게 만드는 코드
  useEffect(() => {
    if (!watch('email') || !watch('password')) {
      setLoginMsg('');
    }
  }, [watch('email'), watch('password')]);

  const onInValid = (data: any): void => {
    setLoginMsg('이메일 혹은 비밀번호 형식이 맞지않습니다.');
  };

  return (
    <S.AuthContainer>
      <form onSubmit={handleSubmit(onValid, onInValid)}>
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
              {...register('email', {
                required: '이메일 필수입력.',
                pattern: {
                  value: EMAIL_REGEX,
                  message: '이메일형식이 올바르지 않습니다.',
                },
              })}
            />
            <S.LoginEmailDeleteDiv
              onClick={() => {
                setValue('email', '');
              }}
            >
              {watch('email') ? <DeleteSvg /> : <></>}
            </S.LoginEmailDeleteDiv>
          </S.LoginEmailInputDiv>
        </S.LoginEmailContainer>
        <S.PwContainer>
          <S.PwTitle>비밀번호</S.PwTitle>
          <S.PwInputDiv>
            <input
              type={vector ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요."
              {...register('password', {
                required: '비밀번호 필수입력.',
                pattern: {
                  value: PASSWORD_REGEX,
                  message: '비밀번호형식이 올바르지 않습니다.',
                },
              })}
            />
            <S.PwDeleteDiv
              onClick={() => {
                setValue('password', '');
              }}
            >
              {watch('password') ? <DeleteSvg /> : <></>}
            </S.PwDeleteDiv>
            <S.PwVectorDiv
              onClick={() => {
                setVector(!vector);
              }}
            >
              {vector ? <NoVectorSvg /> : <VectorSvg />}
            </S.PwVectorDiv>
          </S.PwInputDiv>
          {watch('email') && watch('password') && loginMsg ? (
            <S.LoginValidMsg>
              <FailureSvg />
              {loginMsg}
            </S.LoginValidMsg>
          ) : (
            <></>
          )}
        </S.PwContainer>
        <S.ContinueCheckBoxDiv>
          <div
            onClick={() => {
              setChecked(!checked);
            }}
          >
            {checked ? <OnCheckSvg /> : <NoCheckSvg />}
          </div>
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
          <button type="submit" disabled={isSubmitting}>
            로그인
          </button>
        </S.LoginBtnDiv>
      </form>
      <S.SnsLoginTitleDiv>
        <S.FirstDeco></S.FirstDeco>
        <S.SnsLoginTitle>SNS LOGIN</S.SnsLoginTitle>
        <S.SecondDeco></S.SecondDeco>
      </S.SnsLoginTitleDiv>
      <S.SnsLoginContainer>
        <S.KaKaoLoginDiv
          onClick={() => {
            // authCodeRequest();
            axios
              .get(`${api}/kakao/oauth`, {
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'ngrok-skip-browser-warning': 'any',
                },
              })
              .then((res: AxiosResponse) => {
                console.log('res.data : ', res.data);
                router.push(res.data);
              })
              .catch((err: AxiosError) => {
                console.log('err : ', err.message);
              });
          }}
        >
          <KakaoSvg />
        </S.KaKaoLoginDiv>
        <S.NaverLoginDiv>
          <NaverSvg />
        </S.NaverLoginDiv>
        <S.GoogleLoginDiv
          onClick={() => {
            axios
              .get(`${api}/google/oauth`, {
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'ngrok-skip-browser-warning': 'any',
                },
              })
              .then((res: AxiosResponse) => {
                console.log('res', res);
                router.push(res.data);
              })
              .catch((err: AxiosError) => {
                console.log('err : ', err.message);
              });
          }}
        >
          <GoogleSvg />
        </S.GoogleLoginDiv>
      </S.SnsLoginContainer>
    </S.AuthContainer>
  );
};

export default Auth;
