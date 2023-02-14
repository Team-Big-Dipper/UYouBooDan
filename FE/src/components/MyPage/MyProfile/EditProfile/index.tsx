import * as S from './style';
import { useForm } from 'react-hook-form';
import { FaceSvg } from '../../../../assets/face';
import { NICKNAME_REGEX } from '../../../../constants/regex';
import { useEffect, useState } from 'react';
import { DeleteSvg } from '../../../../assets/delete';
import { SuccessSvg } from '../../../../assets/success';
import { FailureSvg } from '../../../../assets/failure';
import { overLapNickApi } from '../../../../apis/overLap';

const EditProfile = () => {
  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  const [nickClick, setNickClick] = useState<boolean>(false);
  const [nickMsg, setNickMsg] = useState<string>('');

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    if (watch('nickname') && errors.nickname?.message) {
      setNickMsg('닉네임형식이 올바르지 않습니다.');
    } else if (watch('nickname') && !errors.nickname?.message) {
      setNickMsg('');
    } else if (!watch('nickname')) {
      setNickMsg('');
    }
  }, [watch('nickname')]);

  return (
    <S.EditContainer>
      <S.EditTitleDiv>개인정보수정</S.EditTitleDiv>
      <S.EditAdditional>변경 후 저장하기 버튼을 눌러주세요.</S.EditAdditional>
      <form>
        <S.ImgPreviewDiv
          onClick={() => {
            setNickClick(false);
          }}
        >
          <FaceSvg />
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
                      required: '닉네임 필수입력',
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
              <S.NickValue>DASONG</S.NickValue>
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
        <div>
          <div>프로필 이미지 수정</div>
          <button>이미지 수정</button>
          <>
            {'버튼 눌렀을때'}
            <input type="file" />
          </>
        </div>
        <div>hr</div>
        <div>
          <div>아이디</div>
          <div>test1@gmail.com</div>
        </div>
        <div>
          <div>비밀번호</div>
          <input type="password" disabled />
          <button>비밀번호 수정</button>
          <>
            {'버튼눌렀을때'}
            <input type="password" />
            <input type="password" />
            <div>대소문자~어쩌구</div>
            <div>유효성 msg</div>
          </>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              setNickClick(false);
            }}
          >
            수정취소
          </button>
          <button>수정저장</button>
        </div>
      </form>
    </S.EditContainer>
  );
};

export default EditProfile;
