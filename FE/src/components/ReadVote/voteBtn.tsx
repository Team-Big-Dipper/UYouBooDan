import React, { useState } from 'react';
import * as S from './style';
import ButtonModal from '../commons/buttonModal';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const VoteBtn = () => {
  const [login, setIsLogin] = useState(true);
  const [askText, setAskText] = useState('');
  const [apiMethod, setApiMethod] = useState('');
  const router = useRouter();
  const { isAuthor, isVoted, isClosed } = useSelector(
    (state: any) => state.currentVote,
  );

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
  const handlePost = () => {
    console.log('post');
  };
  const handleDelete = () => {
    console.log('delete');
  };
  const handlePatch = () => {
    console.log('patch');
  };
  return (
    <S.ReadVoteBtnContainer>
      {login ? (
        <>
          {!isAuthor ? (
            <>
              <S.ReadVoteBtn
                id="votelist"
                onClick={handleLink}
                color={'#4285f4'}
              >
                목록가기
              </S.ReadVoteBtn>
              <>
                {openModal ? (
                  <ButtonModal
                    text={askText}
                    confirmFunc={handlePost}
                    setOpenModal={setOpenModal}
                  />
                ) : null}
              </>
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
      ) : (
        <>
          <S.ReadVoteBtn id="votelist" onClick={handleLink} color={'#4285f4'}>
            목록가기
          </S.ReadVoteBtn>
        </>
      )}
    </S.ReadVoteBtnContainer>
  );
};

export default VoteBtn;
