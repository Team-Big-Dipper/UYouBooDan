import React, { useState } from 'react';
import * as S from './style';
import ButtonModal from '../commons/buttonModal';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const VoteBtn = () => {
  const [login, setIsLogin] = useState(true);
  const [ended, setEnded] = useState(false);
  const [askText, setAskText] = useState('');
  const [apiMethod, setApiMethod] = useState('');
  const router = useRouter();
  const { isAuthor, isVoted, isClosed } = useSelector(
    (state: any) => state.currentVote,
  );
  console.log('isAuthor', isAuthor);

  const [openModal, setOpenModal] = useState(false);
  const onClickBtn = (e: any) => {
    setOpenModal((prev) => !prev);
    if (e.target.id === 'vote') {
      setAskText('투표할까요?');
    } else if (e.target.id === 'delete') {
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
    <S.buttonContainer>
      {login ? (
        <>
          {!isAuthor ? (
            <>
              {isClosed ? null : (
                <S.button id="vote" onClick={handlePost}>
                  투표하기
                </S.button>
              )}
              <S.button id="votelist" onClick={handleLink} color={'#4285f4'}>
                목록가기
              </S.button>
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
                <S.button id="delete" onClick={handleDelete}>
                  삭제하기
                </S.button>
                <>
                  {isClosed ? null : (
                    <S.button id="patch" onClick={handlePatch} color={'gray'}>
                      수정하기
                    </S.button>
                  )}
                </>

                <S.button id="votelist" onClick={handleLink} color={'#4285f4'}>
                  목록가기
                </S.button>
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
          <S.button id="votelist" onClick={handleLink} color={'#4285f4'}>
            목록가기
          </S.button>
        </>
      )}
    </S.buttonContainer>
  );
};

export default VoteBtn;
