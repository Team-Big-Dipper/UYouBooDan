import React, { useState } from 'react';
import * as S from './style';
import ButtonModal from '../commons/buttonModal';
import { useRouter } from 'next/router';

interface propsType {
  isAuthor: boolean | undefined;
}

const VoteBtn = ({ isAuthor }: propsType) => {
  const [login, setIsLogin] = useState(true);
  const [askText, setAskText] = useState('');
  const [apiMethod, setApiMethod] = useState('');
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const onClickBtn = (e: any) => {
    setOpenModal((prev) => !prev);
    if (e.target.id === 'cancle') {
      setApiMethod('cancle');
      setAskText('취소할까요?');
    } else if (e.target.id === 'patch') {
      setApiMethod('patch');
      setAskText('수정할까요?');
    }
  };
  const handleLink = () => {
    router.push(`/readVote?pid=${5}`);
  };
  const handleCancle = () => {
    router.push(`/readVote?pid=${5}`);
  };
  const handlePatch = () => {
    console.log('patch');
  };
  return (
    <S.ReadVoteBtnContainer>
      <>
        <>
          <S.ReadVoteBtn id="cancle" onClick={onClickBtn}>
            취소하기
          </S.ReadVoteBtn>
          <S.ReadVoteBtn
            id="votelist"
            onClick={handleLink}
            color={'#4285f4'}
          >
            저장하기
          </S.ReadVoteBtn>
        </>
        <>
          {openModal ? (
            <ButtonModal
              text={askText}
              confirmFunc={
                apiMethod === 'patch' ? handlePatch : handleCancle
              }
              setOpenModal={setOpenModal}
            />
          ) : null}
        </>
      </>
    </S.ReadVoteBtnContainer>
  );
};

export default VoteBtn;
