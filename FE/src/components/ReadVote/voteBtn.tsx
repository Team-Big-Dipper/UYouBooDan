import React, { useState } from 'react';
import * as S from './style';
import ButtonModal from '../commons/buttonModal';
import { useRouter } from 'next/router';
import { deletevote } from '../../apis/readvote/readvote';
import { getToken } from '../../utils/userToken';

interface propTypes {
  isAuthor: boolean | undefined;
  topicId: string | string[] | undefined;
  isClosed: boolean | undefined;
}

const VoteBtn = ({ isAuthor, topicId, isClosed }: propTypes) => {
  const [login, setIsLogin] = useState(true);
  const [askText, setAskText] = useState('');
  const [apiMethod, setApiMethod] = useState('');
  const router = useRouter();
  const usertoken = getToken();

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
    if (topicId !== undefined && usertoken !== undefined) {
      console.log('delete!');
      deletevote(Number(topicId), usertoken);
      router.back();
    }
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
                <>
                  {isClosed ? null : (
                    <S.ReadVoteBtn
                      id="patch"
                      onClick={onClickBtn}
                      color={'gray'}
                    >
                      수정하기
                    </S.ReadVoteBtn>
                  )}
                </>
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
