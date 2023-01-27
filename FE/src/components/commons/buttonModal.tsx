import React, { useMemo } from 'react';
import * as S from './style';

interface propTypes {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  confirmFunc: Function;
}
const ButtonModal = ({ setOpenModal, text, confirmFunc }: propTypes) => {
  const textContainer = useMemo(() => {
    return { display: 'flex', margin: 'auto' };
  }, []);
  const handleModal = () => {
    setOpenModal((prev: any) => !prev);
  };
  const handleEvent = (e: any) => {
    e.stopPropagation();
  };
  const onClickButton = (e: any) => {
    if (e.target.id === 'confirm') {
      confirmFunc();
    } else {
      console.log(e.target.id);
    }
    setOpenModal((prev: any) => !prev);
  };
  return (
    <S.ModalBackground onClick={handleModal}>
      <S.ModalContainer onClick={handleEvent}>
        <div style={textContainer}>
          <S.ModalText>{text}</S.ModalText>
        </div>
        <S.ModalButtonContainer>
          <S.ModalLeftButton id="cancel" onClick={onClickButton}>
            취소
          </S.ModalLeftButton>
          <S.ModalRightButton id="confirm" onClick={onClickButton}>
            확인
          </S.ModalRightButton>
        </S.ModalButtonContainer>
      </S.ModalContainer>
    </S.ModalBackground>
  );
};

export default ButtonModal;
