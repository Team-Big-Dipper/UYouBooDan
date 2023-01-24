import React from 'react';
import * as S from './style';

interface propTypes {
  setOpenModal: Function;
}
const ButtonModal = ({ setOpenModal }: propTypes) => {
  const handleModal = () => {
    setOpenModal((prev: any) => !prev);
  };
  const handleEvent = (e: any) => {
    e.stopPropagation();
  };
  const onClickButton = (e: any) => {
    console.log(e.target.textContent);
    setOpenModal((prev: any) => !prev);
  };
  return (
    <S.ModalBackground onClick={handleModal}>
      <S.ModalContainer onClick={handleEvent}>
        <div style={{ display: 'flex', margin: 'auto' }}>
          <S.ModalText>게시글을 삭제할까요?</S.ModalText>
        </div>
        <div style={{ display: 'flex' }}>
          <S.ModalLeftButton onClick={onClickButton}>취소</S.ModalLeftButton>
          <S.ModalRightButton onClick={onClickButton}>
            네, 삭제할게요.
          </S.ModalRightButton>
        </div>
      </S.ModalContainer>
    </S.ModalBackground>
  );
};

export default ButtonModal;
