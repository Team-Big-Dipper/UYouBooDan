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
    if (e.target.id === 'delete') {
      setApiMethod('delete');
      setAskText('삭제할까요?');
    } else if (e.target.id === 'patch') {
      setApiMethod('patch');
      setAskText('수정할까요?');
    }
  };
  const handleLink = () => {
    router.push('/voteList');
  };
  const handleDelete = () => {
    console.log('delete');
  };
  const handlePatch = () => {
    console.log('patch');
  };
  return (
    <S.ReadVoteBtnContainer>
      <>
        {!isAuthor ? (
          <>
            <S.ReadVoteBtn id="votelist" onClick={handleLink} color={'#4285f4'}>
              목록가기
            </S.ReadVoteBtn>
          </>
        ) : (
          <>
            <>
              <S.ReadVoteBtn id="delete" onClick={onClickBtn}>
                삭제하기
              </S.ReadVoteBtn>
              <S.ReadVoteBtn
                id="votelist"
                onClick={handleLink}
                color={'#4285f4'}
              >
                목록가기
              </S.ReadVoteBtn>
            </>
            <>
              {openModal ? (
                <ButtonModal
                  text={askText}
                  confirmFunc={
                    apiMethod === 'patch' ? handlePatch : handleDelete
                  }
                  setOpenModal={setOpenModal}
                />
              ) : null}
            </>
          </>
        )}
      </>
    </S.ReadVoteBtnContainer>
  );
};

export default VoteBtn;
