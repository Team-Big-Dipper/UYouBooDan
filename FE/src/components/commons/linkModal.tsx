import React from 'react';
import * as S from './style';
import { CopiedSvg } from '../../assets/copiedSvg';
import { XmarkSvg } from '../../assets/XmarkSvg';

interface propTypes {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  copied: boolean;
}
const LinkModal = ({ setOpenModal, copied }: propTypes) => {
  const handleModal = () => {
    setOpenModal((prev: boolean) => !prev);
  };

  return (
    <S.ModalBackground onClick={handleModal}>
      <S.LinkContainer>
        <>
          {copied ? (
            <S.LinkCard>
              <CopiedSvg />
              <p>링크가 복사되었습니다</p>
            </S.LinkCard>
          ) : (
            <S.LinkCard>
              <XmarkSvg />
              <p>다시 복사해주세요</p>
            </S.LinkCard>
          )}
        </>
      </S.LinkContainer>
    </S.ModalBackground>
  );
};

export default LinkModal;
