import * as S from './style';
import { PASSWORD_REGEX } from '../../../constants/regex';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { NoVectorSvg } from '../../../assets/noVector';
import { VectorSvg } from '../../../assets/vector';
import { DeleteSvg } from '../../../assets/delete';
import { FailureSvg } from '../../../assets/failure';
import axios, { AxiosError, AxiosResponse } from 'axios';
import LocalStorage from '../../../constants/localstorage';
import SessionStorage from '../../../constants/sessionstorage';

const MyProfile = ({ setSuccessPw }: any) => {
  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onChange',
  });
  const [vector, setVector] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  useEffect(() => {
    if (!watch('password')) {
      setErr(false);
    }
  }, [watch('password')]);

  const onValid = (data: any) => {
    console.log('비밀번호 확인 data : ', data);
    axios
      .post(`${api}/members/verify`, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'ngrok-skip-browser-warning': 'any',
          Authorization:
            LocalStorage.getItem('accesstoken') !== null
              ? `Bearer ${LocalStorage.getItem('accesstoken')}`
              : SessionStorage.getItem('accesstoken') !== null
              ? `Bearer ${SessionStorage.getItem('accesstoken')}`
              : null,
        },
      })
      .then((res: AxiosResponse) => {
        console.log('비밀번호확인 성공 res : ', res);
        console.log('비밀번호 확인 성공!');
        setSuccessPw(true);
      })
      .catch((err: AxiosError) => {
        setErr(true);
        console.log('비밀번호확인 실패 err : ', err.message);
        console.log('비밀번호확인 실패!');
      });
  };

  return (
    <S.MyProfileContainer>
      <S.MyProfileTitleDiv>개인정보수정</S.MyProfileTitleDiv>
      <form onSubmit={handleSubmit(onValid)}>
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
              {vector ? <VectorSvg /> : <NoVectorSvg />}
            </S.PwVectorDiv>
          </S.PwInputDiv>
          {watch('password') && err ? (
            <S.ValidMsg>
              <FailureSvg />
              비밀번호 일치하지 않음
            </S.ValidMsg>
          ) : (
            <></>
          )}
        </S.PwContainer>
        <S.BtnDiv>
          <button type="submit" disabled={isSubmitting}>
            개인정보 수정하기
          </button>
        </S.BtnDiv>
      </form>
    </S.MyProfileContainer>
  );
};

export default MyProfile;
