import * as S from './style';
import { useForm } from 'react-hook-form';
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  NICKNAME_REGEX,
} from '../../constants/regex';
import useCheckPw from '../../hooks/signup/useCheckPw';
import { useEffect, useState } from 'react';
import { DeleteSvg } from '../../assets/delete';
import { VectorSvg } from '../../assets/vector';
import { SuccessSvg } from '../../assets/success';
import { FailureSvg } from '../../assets/failure';
import { overLapEmailApi, overLapNickApi } from '../../apis/overLap';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { NoVectorSvg } from '../../assets/noVector';
import { OnCheckSvg } from '../../assets/onCheck';
import { NoCheckSvg } from '../../assets/noCheck';

const SignUp = () => {
  // nextjs 에서는 이렇게!
  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  console.log('api : ', api);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onChange', // mode: onChange 를 써줘야 아래 errors도 확인(출력) 가능!
  });
  const router = useRouter();
  // console.log('router : ', router);
  const [checkedOne, setCheckedOne] = useState<boolean>(false);
  const [checkedTwo, setCheckedTwo] = useState<boolean>(false);
  const [vectorOne, setVectorOne] = useState<boolean>(false);
  const [vectorTwo, setVectorTwo] = useState<boolean>(false);
  const [emailMsg, setEmailMsg] = useState<string>('');
  const [pwMsg, setPwMsg] = useState<string>('');
  const [nickMsg, setNickMsg] = useState<string>('');
  const [isOk, setIsOk] = useState<boolean>(false);
  const { checkPw } = useCheckPw(
    watch('password'),
    watch('passwordCheck'),
    setPwMsg,
  );

  // email 유효성 메세지 UI 나오게 하는 코드
  useEffect(() => {
    if (watch('email') && errors.email?.message) {
      setEmailMsg('이메일형식이 올바르지 않습니다.');
    } else if (watch('email') && !errors.email?.message) {
      setEmailMsg('');
    } else if (!watch('email')) {
      setEmailMsg('');
    }
  }, [watch('email')]);

  // nickname 유효성 메세지 UI 나오게 하는 코드
  useEffect(() => {
    if (watch('nickname') && errors.nickname?.message) {
      setNickMsg('닉네임형식이 올바르지 않습니다.');
    } else if (watch('nickname') && !errors.nickname?.message) {
      setNickMsg('');
    } else if (!watch('nickname')) {
      setNickMsg('');
    }
  }, [watch('nickname')]);

  // password 유효성 메세지 UI 나오게 하는 코드
  useEffect(() => {
    // console.log('useEffect들어옴');
    if (watch('passwordCheck')) {
      // password,passwordCheck 가 변한다고해서 실행되는게 아니라 비밀번호재확인이 존재할때도 조건에 추가!
      checkPw();
    } else if (!watch('password') && !watch('passwordCheck')) {
      setPwMsg('');
    }
  }, [watch('passwordCheck'), watch('password')]);

  // 전체 유효성, 중복 검사, 약관동의 체크 통과시 isOk상태 true로 해줄 코드
  useEffect(() => {
    if (
      watch('email') &&
      watch('password') &&
      watch('passwordCheck') &&
      watch('nickname') &&
      emailMsg === '사용가능한 이메일 입니다.' &&
      pwMsg === '비밀번호가 일치합니다.' &&
      nickMsg === '사용가능한 닉네임 입니다.' &&
      !errors.password?.message &&
      checkedOne &&
      checkedTwo
    ) {
      setIsOk(true);
    } else {
      setIsOk(false);
    }
  }, [watch(), checkedOne, checkedTwo]);

  // console.log('isOk : ', isOk);

  console.log('watch() : ', watch());
  // submit 버튼 눌렀을때 실행되는 함수
  const onValid = (data: any) => {
    delete data.passwordCheck;
    axios
      .post(`${api}/members`, data)
      .then((res: AxiosResponse) => {
        console.log('res: ', res);
        console.log('회원가입성공!');
        router.push('/auth', '/auth');
      })
      .catch((err: AxiosError) => {
        console.log('err: ', err.message);
      });
  };
  // const onInValid = (data: any): void => {
  //   alert(data);
  // };
  return (
    <S.SignUpContainer>
      <form onSubmit={handleSubmit(onValid)}>
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
              <S.EmailDeleteDiv
                onClick={() => {
                  setValue('email', '');
                }}
              >
                {watch('email') ? <DeleteSvg /> : <></>}
              </S.EmailDeleteDiv>
            </S.EmailInputDiv>
            <button
              type="button"
              onClick={() => {
                if (watch('email') && !errors.email?.message) {
                  overLapEmailApi(watch('email'), setEmailMsg);
                }
              }}
            >
              중복체크
            </button>
          </S.EmailInputBtnDiv>
          {(watch('email') && errors.email?.message && emailMsg) ||
          emailMsg === '이메일형식이 올바르지 않습니다.' ||
          emailMsg === '중복된 이메일 입니다.' ? (
            <S.EmailFailureMsg>
              <FailureSvg />
              {emailMsg}
            </S.EmailFailureMsg>
          ) : watch('email') &&
            !errors.email?.message &&
            emailMsg === '사용가능한 이메일 입니다.' ? (
            <S.EmailSuccessMsg>
              <SuccessSvg />
              {emailMsg}
            </S.EmailSuccessMsg>
          ) : (
            <></>
          )}
        </S.EmailContainer>
        <S.PwContainer>
          <S.PwTitle>비밀번호</S.PwTitle>
          <S.PwInput valid={pwMsg} exist={watch('passwordCheck')}>
            <input
              type={vectorOne ? 'text' : 'password'}
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
                setVectorOne(!vectorOne);
              }}
            >
              {vectorOne ? <NoVectorSvg /> : <VectorSvg />}
              {/* <VectorSvg /> */}
            </S.PwVectorDiv>
          </S.PwInput>
          <S.PwCheckInput valid={pwMsg} exist={watch('passwordCheck')}>
            <input
              type={vectorTwo ? 'text' : 'password'}
              placeholder="비밀번호를 확인해주세요."
              {...register('passwordCheck', {
                required: '비밀번호 재확인 필수.',
                pattern: {
                  value: PASSWORD_REGEX,
                  message: '비밀번호형식이 올바르지 않습니다.',
                },
              })}
            />
            <S.PwCheckDeleteDiv
              onClick={() => {
                setValue('passwordCheck', '');
              }}
            >
              {watch('passwordCheck') ? <DeleteSvg /> : <></>}
            </S.PwCheckDeleteDiv>
            {/* {vectorTwo ?  : } */}
            <S.PwCheckVectorDiv
              onClick={() => {
                setVectorTwo(!vectorTwo);
              }}
            >
              {vectorTwo ? <NoVectorSvg /> : <VectorSvg />}
            </S.PwCheckVectorDiv>
          </S.PwCheckInput>
          <S.Notice>
            *대소문자,숫자,특수문자 포함하여 8~15자로 작성해주세요.
          </S.Notice>
          {!errors.password?.message && pwMsg === '비밀번호가 일치합니다.' ? (
            <S.PwSuccessMsg>
              <SuccessSvg />
              {pwMsg}
            </S.PwSuccessMsg>
          ) : !errors.password?.message &&
            pwMsg === '비밀번호가 일치하지 않습니다.' ? (
            <S.PwFailureMsg>
              <FailureSvg />
              <>{pwMsg}</>
            </S.PwFailureMsg>
          ) : errors.password?.message && watch('password') ? (
            <S.PwFailureMsg>
              <FailureSvg />
              <>{errors.password?.message}</>
            </S.PwFailureMsg>
          ) : (
            <></>
          )}
        </S.PwContainer>
        <S.NickContainer>
          <S.NickTitle>닉네임</S.NickTitle>
          <S.NickInputAndBtn>
            <S.NickInputDiv>
              <input
                type="text"
                placeholder="닉네임을 입력해주세요."
                {...register('nickname', {
                  required: '닉네임 필수입력',
                  pattern: {
                    value: NICKNAME_REGEX,
                    message: '닉네임형식이 올바르지 않습니다.',
                  },
                })}
              />
            </S.NickInputDiv>
            <button
              type="button"
              onClick={() => {
                if (watch('nickname') && !errors.nickname?.message) {
                  overLapNickApi(watch('nickname'), setNickMsg);
                }
              }}
            >
              중복체크
            </button>
          </S.NickInputAndBtn>
          <S.Notice>
            *닉네임은 한글, 영문, 숫자만 가능하며 2-10자리로 작성해주세요.
          </S.Notice>
          {(watch('nickname') && errors.nick?.message && nickMsg) ||
          nickMsg === '닉네임형식이 올바르지 않습니다.' ||
          nickMsg === '중복된 닉네임 입니다.' ? (
            <S.NickFailureMsg>
              <FailureSvg />
              {nickMsg}
            </S.NickFailureMsg>
          ) : watch('nickname') &&
            !errors.Nick?.message &&
            nickMsg === '사용가능한 닉네임 입니다.' ? (
            <S.NickSuccessMsg>
              <SuccessSvg />
              {nickMsg}
            </S.NickSuccessMsg>
          ) : (
            <></>
          )}
        </S.NickContainer>
        <S.TermsContainer>
          <S.TermsTitle>약관동의</S.TermsTitle>
          <S.TermsContentOne>
            <S.TermsOneRadioAndText>
              <div
                onClick={() => {
                  setCheckedOne(!checkedOne);
                }}
              >
                {checkedOne ? <OnCheckSvg /> : <NoCheckSvg />}
              </div>
              <div>개인정보 수집 및 이용 동의(필수)</div>
              {/* <>{console.log('첫번째체크여부', checkedOne)}</> */}
            </S.TermsOneRadioAndText>
            <S.TermsOneInfo>보기</S.TermsOneInfo>
          </S.TermsContentOne>
          <S.TermsContentTwo>
            <S.TermsTwoRadioAndText>
              <div
                onClick={() => {
                  setCheckedTwo(!checkedTwo);
                }}
              >
                {checkedTwo ? <OnCheckSvg /> : <NoCheckSvg />}
              </div>
              <div>이용약관동의(필수)</div>
              {/* <>{console.log('두번째체크여부', checkedTwo)}</> */}
            </S.TermsTwoRadioAndText>
            <S.TermsTwoInfo>보기</S.TermsTwoInfo>
          </S.TermsContentTwo>
        </S.TermsContainer>
        <S.SignUpBtnContainer isOk={isOk}>
          {isOk ? (
            <button type="submit" disabled={isSubmitting}>
              회원가입
            </button>
          ) : (
            <button type="submit" disabled>
              회원가입
            </button>
          )}
        </S.SignUpBtnContainer>
      </form>
    </S.SignUpContainer>
  );
};

export default SignUp;
