import * as S from './style';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants/regex';
import useOverLapCheck from '../../hooks/signup/useOverLap';
import useCheckPw from '../../hooks/signup/useCheckPw';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { emailCheckApi } from '../../apis/overLap';
import { DeleteSvg } from '../../assets/delete';
import { VectorSvg } from '../../assets/vector';
import { SuccessSvg } from '../../assets/success';
import { FailureSvg } from '../../assets/failure';
// import axios, { AxiosError, AxiosResponse } from 'axios';
// import { useEffect } from 'react';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onChange', // mode: onChange 를 써줘야 아래 errors도 확인(출력) 가능!
  });
  const { emailCheck } = useOverLapCheck();
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  const [emailMsg, setEmailMsg] = useState('사용 가능한 아이디입니다.');
  const [pwMsg, setPwMsg] = useState('');
  const [nickMsg, setNickMsg] = useState('사용가능한 닉네임입니다.');
  const { checkPw } = useCheckPw(
    watch('password'),
    watch('passwordCheck'),
    setPwMsg,
  );
  useEffect(() => {
    console.log('useEffect들어옴');
    if (watch('passwordCheck').length) {
      // password,passwordCheck 가 변한다고해서 실행되는게 아니라 비밀번호재확인이 존재할때도 조건에 추가!
      checkPw();
    }
  }, [watch('passwordCheck'), watch('password')]);
  // -> 비밀번호 1234 입력 후 재확인 비밀번호 12344 입력하면 불일치
  // -> 다시 비밀번호 1234에 4추가해주면 일치하다고 안나오던거 위 코드로 일치한다고 나옴!

  // checkPw(watch('password'), 'watch('passwordCheck')', setPwMsg);
  // useEffect(() => {
  //   axios
  //     .get('https://13a5-222-233-138-154.jp.ngrok.io/test/all?size=10&page=5', {
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //         'ngrok-skip-browser-warning': 'any',
  //       },
  //     })
  //     .then((res: AxiosResponse) => {
  //       console.log('요청 성공!', res);
  //     })
  //     .catch((err: AxiosError) => {
  //       console.log('요청 실패!', err.message);
  //     });
  // }, []);
  const [a, setA] = useState(false);
  // useEffect(() => {
  //   axios
  //     .get('/api/members/verify')
  //     .then((res) => {
  //       console.log('요청성공!', res);
  //     })
  //     .catch((err) => {
  //       console.log('요청실패!', err.message);
  //     });
  // }, [a]);

  const onValid = () => {
    return;
  };
  const onInValid = () => {
    return;
  };
  // 왜 div태그에서 에러가 나는걸까??
  // 이 JSX 태그의 'children' 속성에는 'ReactNode'
  // 형식의 자식 하나가 필요하지만, 여러 자식이 제공되었습니다. ???
  return (
    <S.SignUpContainer>
      <form onSubmit={handleSubmit(onValid, onInValid)}>
        <S.SignUpLogo>우</S.SignUpLogo>
        <S.SignUpTitle>회원가입</S.SignUpTitle>
        <S.EmailContainer>
          <S.EmailTitle>아이디</S.EmailTitle>
          <S.EmailInputBtnDiv>
            <S.EmailInputDiv>
              <input
                type="email"
                placeholder="이메일을 입력해주세요."
                {...register('email', {
                  required: '아이디 필수입력',
                  pattern: {
                    value: EMAIL_REGEX,
                    message: '이메일형식이 올바르지 않습니다.',
                  },
                })}
              />
              {/* <S.EmailInputDelete>x</S.EmailInputDelete> */}
              <S.EmailDeleteDiv>
                <DeleteSvg />
              </S.EmailDeleteDiv>
            </S.EmailInputDiv>
            <button
              type="button"
              onClick={() => {
                setA(!a);
                emailCheckApi(watch('email'));
                emailCheck(watch('email'));
              }}
            >
              중복체크
            </button>
          </S.EmailInputBtnDiv>

          {/* <>
            {console.log('watch(email) : ', watch('email'))}
            {console.log('errors.email?.message : ', errors.email?.message)}
          </> */}
          <S.EmailSuccessMsg>
            <SuccessSvg />
            {emailMsg}
          </S.EmailSuccessMsg>
          <S.EmailFailureMsg>
            <FailureSvg />
            {emailMsg}
          </S.EmailFailureMsg>
        </S.EmailContainer>
        <S.PwContainer>
          <S.PwTitle>비밀번호</S.PwTitle>
          <S.PwInput valid={pwMsg} exist={watch('passwordCheck')}>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register('password', {
                required: '비밀번호 필수입력.',
                pattern: {
                  value: PASSWORD_REGEX,
                  message: '비밀번호 형식에 맞지 않습니다.',
                },
              })}
            />
            <S.PwDeleteDiv
              onClick={() => {
                setValue('password', '');
              }}
            >
              <DeleteSvg />
            </S.PwDeleteDiv>
            <S.PwVectorDiv>
              <VectorSvg />
            </S.PwVectorDiv>
          </S.PwInput>
          <S.PwCheckInput valid={pwMsg} exist={watch('passwordCheck')}>
            <input
              type="password"
              placeholder="비밀번호를 확인해주세요."
              {...register('passwordCheck', {
                required: '비밀번호 재확인 필수.',
                pattern: {
                  value: PASSWORD_REGEX,
                  message: '비밀번호 형식에 맞지 않습니다.',
                },
              })}
            />
            <S.PwCheckDeleteDiv
              onClick={() => {
                setValue('passwordCheck', '');
              }}
            >
              <DeleteSvg />
            </S.PwCheckDeleteDiv>
            <S.PwCheckVectorDiv>
              <VectorSvg />
            </S.PwCheckVectorDiv>
          </S.PwCheckInput>
          <S.PwNotice>
            *대소문자,숫자,특수문자 포함하여 8~15자로 작성해주세요.
          </S.PwNotice>
          {/* <S.PwValidMsg>비밀번호가 일치 || 일치하지 않습니다.</S.PwValidMsg> */}
          {/* { 1,2 아무것도 없을때 -> msg 없음, 1 에러 x &&} */}
          {!errors.password?.message && pwMsg === '비밀번호가 일치합니다.' ? (
            <S.PwSuccessMsg>
              <SuccessSvg />
              {pwMsg}
            </S.PwSuccessMsg>
          ) : !errors.password?.message &&
            pwMsg === '비밀번호가 일치하지 않습니다.' ? (
            <S.PwFailureMsg>
              <FailureSvg />
              {pwMsg}
            </S.PwFailureMsg>
          ) : errors.password?.message && watch('password') ? (
            <S.PwFailureMsg>
              <FailureSvg /> <>{errors.password?.message}</>
            </S.PwFailureMsg>
          ) : (
            <></>
          )}
          {/* <S.PwSuccessMsg>
            <SuccessSvg />
            {pwMsg}
          </S.PwSuccessMsg>
          <S.PwFailureMsg>
            <FailureSvg />
            {pwMsg}
          </S.PwFailureMsg> */}
        </S.PwContainer>
        <S.NickContainer>
          <S.NickTitle>닉네임</S.NickTitle>
          <S.NickInputAndBtn>
            <S.NickInputDiv>
              <input
                type="text"
                placeholder="닉네임을 입력해주세요."
                {...register('nickname', {})}
              />
            </S.NickInputDiv>
            <button type="button">중복체크</button>
          </S.NickInputAndBtn>
          {/* <S.NickValidMsg>사용가능한 || 중인 닉네임입니다.</S.NickValidMsg> */}
          <S.NickSuccessMsg>
            <SuccessSvg />
            {nickMsg}
          </S.NickSuccessMsg>
          <S.NickFailureMsg>
            <FailureSvg />
            {nickMsg}
          </S.NickFailureMsg>
        </S.NickContainer>
        <S.TermsContainer>
          <S.TermsTitle>약관동의</S.TermsTitle>
          <S.TermsContentOne>
            <S.TermsOneRadioAndText>
              <input
                type="radio"
                checked={checkedOne}
                onClick={() => {
                  setCheckedOne(!checkedOne);
                }}
              />
              <div>개인정보 수집 및 이용 동의(필수)</div>
            </S.TermsOneRadioAndText>
            <S.TermsOneInfo>보기</S.TermsOneInfo>
          </S.TermsContentOne>
          <S.TermsContentTwo>
            <S.TermsTwoRadioAndText>
              <input
                type="radio"
                checked={checkedTwo}
                onClick={() => {
                  setCheckedTwo(!checkedTwo);
                }}
              />
              <div>이용약관동의(필수)</div>
            </S.TermsTwoRadioAndText>
            <S.TermsTwoInfo>보기</S.TermsTwoInfo>
          </S.TermsContentTwo>
        </S.TermsContainer>
        <S.SignUpBtnContainer>
          <button type="button" disabled={isSubmitting}>
            회원가입
          </button>
        </S.SignUpBtnContainer>
      </form>
    </S.SignUpContainer>
  );
};

export default SignUp;
