import React, { useState, useEffect } from 'react';
import { QuestionIcon } from '../../assets/questionIcon';
import * as S from './style';
import { LikeSvg } from '../../assets/likeSvg';
import { ShareLinkSvg } from '../../assets/shareLinkSvg';
import LinkModal from '../commons/linkModal';
import { CalcDday } from '../../utils/calculate';
import { ChangDateFormat } from '../../utils/parseDate';

type propTypes = {
  category: string | undefined;
  title: string | undefined;
  createdAt: string | undefined;
  author: string | undefined;
  closedAt: string | undefined;
  views: number | undefined;
  likes: number | undefined;
};

const VoteTitle = ({
  category,
  title,
  createdAt,
  author,
  closedAt,
  views,
  likes,
}: propTypes) => {
  const [Dday, setDday] = useState<string>('');
  const [created, setCreated] = useState('');
  const [copied, setCopied] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const onClickLike = () => {
    console.log('api call');
    alert('좋아요+1');
  };
  useEffect(() => {
    const result = CalcDday(closedAt);
    setDday(result);
    const changedDate = ChangDateFormat(createdAt);
    setCreated(changedDate);
  }, [createdAt, closedAt]);

  const onClickShareLink = () => {
    const saveUrl = new Promise((resolve, reject) => {
      if (typeof window !== undefined) {
        const url = window.document.location.href;
        resolve(url);
      }
    });
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
          <S.DevideSubtitleDiv>
            <S.ContentInfo>
              {created} | {author} | 조회수{views} |{' '}
              <S.LikeButton onClick={onClickLike}>
                <LikeSvg />
                {likes}
              </S.LikeButton>{' '}
              |{' '}
              <span onClick={onClickShareLink}>
                <ShareLinkSvg />
              </span>
            </S.ContentInfo>
          </S.DevideSubtitleDiv>
          <S.DevideIconDiv>
            <S.CategoryIcon color={'black'}>#{category}</S.CategoryIcon>
            <S.CategoryIcon color={'#89b7cb'}>단일 투표</S.CategoryIcon>
            <S.DdayIcon>{Dday.length === 0 ? '투표 종료' : Dday}</S.DdayIcon>
          </S.DevideIconDiv>
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
