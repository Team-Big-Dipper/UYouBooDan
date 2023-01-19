import * as S from './style';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from '../../constants/regex';
// import axios, { AxiosError, AxiosResponse } from 'axios';
// import { useEffect } from 'react';

const SignUp = () => {
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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onChange', // mode: onChange 를 써줘야 아래 errors도 확인(출력) 가능!
  });

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
                placeholder="이메일을 입력하세요."
                {...register('email', {
                  required: '아이디 필수입력',
                  pattern: {
                    value: EMAIL_REGEX,
                    message: '이메일형식이 올바르지 않습니다.',
                  },
                })}
              />
              {/* <S.EmailInputDelete>x</S.EmailInputDelete> */}
            </S.EmailInputDiv>
            <button type="button">중복체크</button>
          </S.EmailInputBtnDiv>

          {console.log(watch('email'))}
          {console.log(errors.email?.message)}
          {/* {errors.email?.message} */}
          <S.EmailValidMsg>사용 가능 || 불가능 아이디입니다.</S.EmailValidMsg>
        </S.EmailContainer>
        <S.PwContainer>
          <S.PwTitle>비밀번호</S.PwTitle>
          <S.PwInput>
            <input type="password" placeholder="비밀번호를 입력하세요." />
            <S.PwDelete></S.PwDelete>
            <S.PwInputImg></S.PwInputImg>
          </S.PwInput>
          <S.PwCheckInput>
            <input type="password" placeholder="비밀번호를 확인하세요." />
            <S.PwCheckDelete></S.PwCheckDelete>
            <S.PwCheckImg></S.PwCheckImg>
          </S.PwCheckInput>
          <S.PwNotice>
            *대소문자,숫자,특수문자 포함하여 8~15자로 작성해주세요.
          </S.PwNotice>
          <S.PwValidMsg>비밀번호가 일치 || 일치하지 않습니다.</S.PwValidMsg>
        </S.PwContainer>
        <S.NickContainer>
          <S.NickTitle>닉네임</S.NickTitle>
          <S.NickInputAndBtn>
            <S.NickInputDiv>
              <input type="text" />
            </S.NickInputDiv>
            <button type="button">중복체크</button>
          </S.NickInputAndBtn>
          <S.NickValidMsg>사용가능한 || 중인 닉네임입니다.</S.NickValidMsg>
        </S.NickContainer>
        <S.TermsContainer>
          <S.TermsTitle>약관동의</S.TermsTitle>
          <div>
            <input type="radio" />
            <span>개인정보 수집 및 이용 동의(필수)</span>
            <span>보기</span>
          </div>
          <div>
            <input type="radio" />
            <span>이용약관동의(필수)</span>
            <span>보기</span>
          </div>
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
