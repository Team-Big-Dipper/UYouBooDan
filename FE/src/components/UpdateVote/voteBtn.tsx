import React, { useState } from 'react';
import * as S from './style';
import ButtonModal from '../commons/buttonModal';
import { useRouter } from 'next/router';
import axios, { AxiosResponse, AxiosError } from 'axios';
import LocalStorage from '../../constants/localstorage';

interface propsType {
  isAuthor: boolean | undefined;
  updateTitle: string | undefined;
  pid: string | string[] | undefined;
}

const VoteBtn = ({ isAuthor, updateTitle, pid }: propsType) => {
  const [login, setIsLogin] = useState(true);
  const [askText, setAskText] = useState('');
  const [apiMethod, setApiMethod] = useState('');
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_SERVER_URL;

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
    axios
      .patch(`${api}/topics/${pid}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'ngrok-skip-browser-warning': 'any',
          authorization: `Bearer ${LocalStorage.getItem('accesstoken')}`
        },
        body: JSON.stringify({
          title: updateTitle
        })
      })
      .then((res: AxiosResponse) => {
        console.log('요청 성공!', res);
        router.push(`/readvote?pid=${pid}`)
      })
      .catch((err: AxiosError) => {
        console.log('요청 실패!', err.message);
      });
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
