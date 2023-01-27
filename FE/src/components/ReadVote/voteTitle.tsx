import React, { useState } from 'react';
import { QuestionIcon } from '../../assets/questionIcon';
import * as S from './style';
import { LikeSvg } from '../../assets/likeSvg';
import { ShareLinkSvg } from '../../assets/shareLinkSvg';
import LinkModal from '../commons/linkModal';

type propTypes = {
  category: string | undefined;
  title: string | undefined;
  createdAt: number | undefined;
  author: string | undefined;
  dday: number | undefined;
  views: number | undefined;
  likes: number | undefined;
};

const VoteTitle = ({
  category,
  title,
  createdAt,
  author,
  dday,
  views,
  likes,
}: propTypes) => {
  const [copied, setCopied] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const onClickLike = () => {
    console.log('api call');
    alert('좋아요+1');
  };
  const saveUrl = new Promise((resolve, reject) => {
    const url = window.document.location.href;
    resolve(url);
  });

  const onClickShareLink = () => {
    saveUrl.then((res: any) => {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(res)
          .then(() => {
            setOpenModal((prev) => !prev);
            setCopied(true);
          })
          .catch(() => {
            setOpenModal((prev) => !prev);
            setCopied(false);
          });
      } else {
        return;
      }
    });
  };
  return (
    <>
      <S.VoteTitleOutLine>
        <S.TitleContainer>
          <QuestionIcon />
          <S.Title>{title}</S.Title>
        </S.TitleContainer>
        <S.ContentContainer>
          <S.devideDiv>
            <S.ContentInfo>
              {createdAt} | {author} | 조회수{views} |{' '}
              <S.LikeButton onClick={onClickLike}>
                <LikeSvg />
                {likes}
              </S.LikeButton>{' '}
              |{' '}
              <span onClick={onClickShareLink}>
                <ShareLinkSvg />
              </span>
            </S.ContentInfo>
          </S.devideDiv>
          <S.devideDiv>
            <S.CategoryIcon color={'black'}>#{category}</S.CategoryIcon>
            <S.CategoryIcon color={'#89b7cb'}>단일 투표</S.CategoryIcon>
            <S.DdayIcon>D-{dday}</S.DdayIcon>
          </S.devideDiv>
        </S.ContentContainer>
      </S.VoteTitleOutLine>
      <>
        {openModal ? (
          <LinkModal copied={copied} setOpenModal={setOpenModal} />
        ) : null}
      </>
    </>
  );
};

export default VoteTitle;
