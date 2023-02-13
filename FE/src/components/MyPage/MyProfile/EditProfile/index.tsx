import * as S from './style';
import { useForm } from 'react-hook-form';
import { FaceSvg } from '../../../../assets/face';
import { NICKNAME_REGEX } from '../../../../constants/regex';
import { useState } from 'react';

const EditProfile = () => {
  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  const [nickClick, setNickClick] = useState<boolean>(false);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onChange',
  });

  return (
    <S.EditContainer>
      <S.EditTitleDiv>개인정보수정</S.EditTitleDiv>
      <S.EditAdditional>변경 후 저장하기 버튼을 눌러주세요.</S.EditAdditional>
      <form>
        <S.ImgPreviewDiv>
          <FaceSvg />
        </S.ImgPreviewDiv>
        <S.NickContainer>
          <S.NickTitle>닉네임</S.NickTitle>

          {nickClick ? (
            <S.NickBtnCLickAfter>
              <S.NickInputDiv>
                <input
                  type="text"
                  {...register('nickname', {
                    required: '닉네임 필수입력',
                    pattern: {
                      value: NICKNAME_REGEX,
                      message: '닉네임형식이 올바르지 않습니다.',
                    },
                  })}
                />
              </S.NickInputDiv>
              <button type="button">중복체크</button>
              <S.NickSuccessMsg>사용가능한 닉네임입니다.</S.NickSuccessMsg>
              <S.NickFailureMsg>사용중인 닉네임입니다.</S.NickFailureMsg>
            </S.NickBtnCLickAfter>
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
