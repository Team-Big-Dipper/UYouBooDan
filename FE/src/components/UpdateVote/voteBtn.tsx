import React, { useState } from 'react';
import * as S from './style';
import ButtonModal from '../commons/buttonModal';
import { useRouter } from 'next/router';
import { updateVoteAPI } from '../../apis/updatevote/updateVote';

interface propsType {
  usertoken: string | undefined;
  updateTitle: string | undefined;
  updateContent: string | undefined;
  updatecategory: string | undefined;
  pid: string | string[] | undefined;
}

const VoteBtn = ({ usertoken, updateTitle, updateContent, updatecategory, pid }: propsType) => {
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
  const handleCancle = () => {
    router.push(`/readvote?pid=${pid}`);
  };
  const handlePatch = () => {
    console.log('patch');
    updateVoteAPI(Number(pid), usertoken, updateTitle, updateContent,updatecategory);
    router.push(`/readvote?pid=${pid}`);
  };
  return (
    <S.ReadVoteBtnContainer>
      <>
        <>
          <S.ReadVoteBtn id="cancle" onClick={onClickBtn}>
            취소하기
          </S.ReadVoteBtn>
          <S.ReadVoteBtn
            id="patch"
            onClick={onClickBtn}
            color={'#4285f4'}
          >
            수정하기
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
