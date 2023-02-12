import React from 'react';
import * as S from './style';
import { XmarkSvg } from '../../assets/XmarkSvg';

interface propTypes {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const ForbidVoteModal = ({ setOpenModal }: propTypes) => {
  const handleModal = () => {
    setOpenModal((prev: boolean) => !prev);
  };

  return (
    <S.ModalBackground onClick={handleModal}>
      <S.LinkContainer>
        <S.LinkCard>
          <XmarkSvg />
          <p>본인 글에 투표할 수 없습니다</p>
        </S.LinkCard>
      </S.LinkContainer>
    </S.ModalBackground>
  );
};

export default ForbidVoteModal;
