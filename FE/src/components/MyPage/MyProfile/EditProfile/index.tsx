import * as S from './style';
import { useForm } from 'react-hook-form';
import { FaceSvg } from '../../../../assets/face';
import { NICKNAME_REGEX } from '../../../../constants/regex';
import { useEffect, useState } from 'react';
import { DeleteSvg } from '../../../../assets/delete';
import { SuccessSvg } from '../../../../assets/success';
import { FailureSvg } from '../../../../assets/failure';
import { VectorSvg } from '../../../../assets/vector';
import { NoVectorSvg } from '../../../../assets/noVector';
import { overLapNickApi } from '../../../../apis/overLap';
import { PASSWORD_REGEX } from '../../../../constants/regex';
import useCheckPw from '../../../../hooks/signup/useCheckPw';
import axios, { AxiosError, AxiosResponse } from 'axios';
import LocalStorage from '../../../../constants/localstorage';
import SessionStorage from '../../../../constants/sessionstorage';
import { useRouter } from 'next/router';

const EditProfile = ({
  emailData,
  nickData,
  photoData,
  setEditClick,
  setSuccessPw,
}: any) => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onChange',
  });
  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  // const defaultImg = process.env.NEXT_PUBLIC_DEFAULT_IMG;
  const router = useRouter();
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [nickClick, setNickClick] = useState<boolean>(false);
  const [imgClick, setImgClick] = useState<boolean>(false);
  const [pwClick, setPwClick] = useState<boolean>(false);
  const [nickMsg, setNickMsg] = useState<string>('');
  const [nickPass, setNickPass] = useState<boolean>(false);
  const [img, setImg] = useState<string>('');
  const [pwMsg, setPwMsg] = useState<string>('');
  const [vectorOne, setVectorOne] = useState<boolean>(false);
  const [vectorTwo, setVectorTwo] = useState<boolean>(false);
  const { checkPw } = useCheckPw(
    watch('password'),
    watch('passwordCheck'),
    setPwMsg,
  );

  const avatar = watch('profile');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  useEffect(() => {
    if (watch('nickname') && errors.nickname?.message) {
      setNickMsg('닉네임형식이 올바르지 않습니다.');
    } else if (watch('nickname') && !errors.nickname?.message) {
      setNickMsg('');
    } else if (!watch('nickname')) {
      setNickMsg('');
    }
  }, [watch('nickname')]);

  useEffect(() => {
    if (watch('profile')) {
      setImg(watch('profile')[0]['name']);
    }
  }, [watch('profile')]);

  useEffect(() => {
    if (watch('passwordCheck')) {
      // password,passwordCheck 가 변한다고해서 실행되는게 아니라 비밀번호재확인이 존재할때도 조건에 추가!
      checkPw();
    } else if (!watch('password') && !watch('passwordCheck')) {
      setPwMsg('');
    }
  }, [watch('passwordCheck'), watch('password')]);

  const onValid = async (data: any) => {
    delete data.passwordCheck;
    if (watch('nickname')) {
      overLapNickApi(watch('nickname'), setNickMsg);
    }
    if (nickMsg === '중복된 닉네임 입니다.') {
      console.log('중복된 닉네임때매 수정 안됨.');
      return;
    }
    if (!data.nickname || !watch('nickname')) {
      delete data.nickname;
    }
    if (!data.password && !watch('password')) {
      delete data.password;
    }
    if (!data.profile && !watch('profile')) {
      delete data.profile;
    }
    if (avatar && avatar.length) {
      const file = avatar[0];
      data.profile = URL.createObjectURL(file).slice(5);
    }
    if (
      (data.nickname && nickMsg === '사용가능한 닉네임 입니다.') ||
      data.profile ||
      data.password
    ) {
      await axios
        .patch(`${api}/members/edit`, data, {
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
          console.log('수정완료');
          console.log('수정완료 res : ', res);
          setEditClick(false);
          setSuccessPw(false);
          router.push('main');
        })
        .catch((err: AxiosError) => {
          console.log('수정 실패 err : ', err.message);
        });
    }
  };

  // const errorImgHandler = (e: any) => {
  //   e.target.src = defaultImg;
  // };

  return (
    <S.EditContainer>
      <S.EditTitleDiv>개인정보수정</S.EditTitleDiv>
      <S.EditAdditional>변경 후 저장하기 버튼을 눌러주세요.</S.EditAdditional>
      <form onSubmit={handleSubmit(onValid)}>
        <S.ImgPreviewDiv
          onClick={() => {
            setNickClick(false);
          }}
        >
          {photoData && !watch('profile') ? (
            <img src={`blob:${photoData}`} onError={() => {}} />
          ) : (
            // <FaceSvg />
            <img src={avatarPreview} />
          )}
        </S.ImgPreviewDiv>
        <S.NickContainer>
          <S.NickTitle>닉네임</S.NickTitle>

          {nickClick ? (
            <>
              <S.NickBtnCLickAfter>
                <S.NickInputDiv>
                  <input
                    type="text"
                    placeholder="닉네임을 입력해주세요."
                    {...register('nickname', {
                      pattern: {
                        value: NICKNAME_REGEX,
                        message: '닉네임형식이 올바르지 않습니다.',
                      },
                    })}
                  />
                  <S.NickDeleteDiv
                    onClick={() => {
                      setValue('nickname', '');
                    }}
                  >
                    {watch('nickname') ? <DeleteSvg /> : <></>}
                  </S.NickDeleteDiv>
                </S.NickInputDiv>
                <button
                  type="button"
                  onClick={() => {
                    overLapNickApi(watch('nickname'), setNickMsg);
                  }}
                >
                  중복체크
                </button>
              </S.NickBtnCLickAfter>
              {(watch('nickname') && errors.nickname?.message && nickMsg) ||
              nickMsg === '닉네임형식이 올바르지 않습니다.' ||
              nickMsg === '중복된 닉네임 입니다.' ? (
                <S.NickFailureMsg>
                  <FailureSvg />
                  {nickMsg}
                </S.NickFailureMsg>
              ) : watch('nickname') &&
                !errors.nickname?.message &&
                nickMsg === '사용가능한 닉네임 입니다.' ? (
                <S.NickSuccessMsg>
                  <SuccessSvg />
                  {nickMsg}
                </S.NickSuccessMsg>
              ) : (
                <></>
              )}
            </>
          ) : (
            <S.NickBtnClickBefore>
              <S.NickValue>{nickData}</S.NickValue>
              <button
                type="button"
                onClick={() => {
                  setNickClick(true);
                }}
              >
                닉네임 수정
              </button>
            </S.NickBtnClickBefore>
          )}
        </S.NickContainer>
        <S.ProfileImgContainer>
          <S.ProfileImgTitle imgClick={imgClick}>
            프로필 이미지 수정
          </S.ProfileImgTitle>
          <>{console.log(watch('profile'))}</>
          {imgClick ? (
            <S.ImgEditBtnClickAfter>
              <S.ImgValueInputDiv>
                <input
                  type="text"
                  placeholder={photoData || '파일이름.jpg'}
                  defaultValue={watch('profile') ? img : ''}
                  disabled
                />
                {watch('profile') ? (
                  <S.ImgDeleteDiv
                    onClick={() => {
                      setValue('profile', '');
                      setImg('');
                    }}
                  >
                    <DeleteSvg />
                  </S.ImgDeleteDiv>
                ) : (
                  <></>
                )}
              </S.ImgValueInputDiv>
              <S.ImgInputLabel htmlFor="file">파일업로드</S.ImgInputLabel>
              <input
                id="file"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                {...register('profile')}
              />
            </S.ImgEditBtnClickAfter>
          ) : (
            <S.ImgEditBtnClickBefore>
              <button
                type="button"
                onClick={() => {
                  setImgClick(!imgClick);
                }}
              >
                이미지 수정
              </button>
            </S.ImgEditBtnClickBefore>
          )}
        </S.ProfileImgContainer>
        <S.HorizonDiv></S.HorizonDiv>
        <S.EmailContainer>
          <S.EmailTitle>아이디</S.EmailTitle>
          <S.EmailValue>{emailData}</S.EmailValue>
        </S.EmailContainer>
        <S.PwContainer>
          <S.PwTitle>비밀번호</S.PwTitle>
          {pwClick ? (
            <S.PwEditClickAfter>
              <S.PwInput valid={pwMsg} exist={watch('passwordCheck')}>
                <input
                  type={vectorOne ? 'text' : 'password'}
                  placeholder="비밀번호를 입력해주세요."
                  {...register('password', {
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
                  {vectorOne ? <VectorSvg /> : <NoVectorSvg />}
                </S.PwVectorDiv>
              </S.PwInput>
              <S.PwCheckInput valid={pwMsg} exist={watch('passwordCheck')}>
                <input
                  type={vectorTwo ? 'text' : 'password'}
                  placeholder="비밀번호를 확인해주세요."
                  {...register('passwordCheck', {
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
                <S.PwCheckVectorDiv
                  onClick={() => {
                    setVectorTwo(!vectorTwo);
                  }}
                >
                  {vectorTwo ? <VectorSvg /> : <NoVectorSvg />}
                </S.PwCheckVectorDiv>
              </S.PwCheckInput>
              <S.Notice>
                *대소문자,숫자,특수문자 포함하여 8~15자로 작성해주세요.
              </S.Notice>
              {!errors.password?.message &&
              pwMsg === '비밀번호가 일치합니다.' ? (
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
            </S.PwEditClickAfter>
          ) : (
            <S.PwEditClickBefore>
              <S.PwInputBeforeDiv>
                <input placeholder="***********" type="password" disabled />
              </S.PwInputBeforeDiv>
              <button
                type="button"
                onClick={() => {
                  setPwClick(true);
                }}
              >
                비밀번호 수정
              </button>
            </S.PwEditClickBefore>
          )}
        </S.PwContainer>
        <S.BtnContainer>
          <S.EditCancleBtnDiv>
            <button
              type="button"
              onClick={() => {
                setValue('nickname', '');
                setValue('profile', '');
                setValue('password', '');
                setValue('passwordCheck', '');
                setNickClick(false);
                setImgClick(false);
                setPwClick(false);
              }}
            >
              수정취소
            </button>
          </S.EditCancleBtnDiv>
          <S.EditSaveBtnDiv>
            {watch('profile') ||
            watch('nickname') ||
            (watch('password') &&
              watch('password') === watch('passwordCheck')) ? (
              <button type="submit" disabled={isSubmitting}>
                수정저장
              </button>
            ) : (
              <button type="button">수정저장</button>
            )}
          </S.EditSaveBtnDiv>
        </S.BtnContainer>
      </form>
    </S.EditContainer>
  );
};

export default EditProfile;
