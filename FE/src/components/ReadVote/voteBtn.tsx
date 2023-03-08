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
  //console.log(isAuthor, topicId, isClosed);
  const [askText, setAskText] = useState('');
  const router = useRouter();
  const usertoken = getToken();
  const [openModal, setOpenModal] = useState(false);

  const handleLink = () => {
    router.push('/voteList');
  };
  const handleDelete = () => {
    if (topicId !== undefined && usertoken !== undefined && isAuthor) {
      deletevote(Number(topicId), usertoken);
      router.back();
    }
  };
  const handlePatch = () => {
    if (topicId !== undefined && usertoken !== undefined && isAuthor) {
      router.push({
        pathname: '/updatevote',
        query: { pid: topicId },
      });
    }
  };
  const onClickBtn = (e: any) => {
    if (e.target.id === 'delete') {
      setOpenModal((prev) => !prev);
      setAskText('삭제할까요?');
    } else if (e.target.id === 'patch') {
      handlePatch();
    }
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
              <>
                {isClosed ? null : (
                  <S.ReadVoteBtn id="patch" onClick={onClickBtn} color={'gray'}>
                    수정하기
                  </S.ReadVoteBtn>
                )}
              </>
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
                  confirmFunc={handleDelete}
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
