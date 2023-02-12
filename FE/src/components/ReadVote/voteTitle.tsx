import React, { useState, useEffect } from 'react';
import { QuestionIcon } from '../../assets/questionIcon';
import * as S from './style';
import { LikeSvg, ClickedLikeSvg } from '../../assets/likeSvg';
import { ShareLinkSvg } from '../../assets/shareLinkSvg';
import LinkModal from '../commons/linkModal';
import { CalcDday } from '../../utils/calculate';
import { ChangDateFormat } from '../../utils/parseDate';
import { patchTopicLike } from '../../apis/readvote/readvote';
import { useGetToken } from '../../hooks/userToken/useGetToken';

type propTypes = {
  category: string | undefined;
  title: string | undefined;
  createdAt: string | undefined;
  author: string | undefined;
  closedAt: string | undefined;
  views: number | null | undefined;
  likes: number | null | undefined;
  topidId: string | string[] | undefined;
};

const VoteTitle = ({
  category,
  title,
  createdAt,
  author,
  closedAt,
  views,
  likes,
  topidId,
}: propTypes) => {
  const usertoken = useGetToken();
  const [likeCount, setLikeCount] = useState(likes);
  const [Dday, setDday] = useState<string>('');
  const [created, setCreated] = useState('');
  const [copied, setCopied] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLikeClicked, setIsLikeClicked] = useState();

  useEffect(() => {
    const result = CalcDday(closedAt);
    setDday(result);
    const changedDate = ChangDateFormat(createdAt);
    setCreated(changedDate);
  }, [createdAt, closedAt]);
  const handleTopicLike = async () => {
    if (usertoken !== undefined) {
      patchTopicLike(Number(topidId), usertoken)?.then((res) => {
        if (res.data.topicLikeStatus) {
          alert('좋아요 + 1');
        } else {
          alert('좋아요 취소');
        }
        setLikeCount(res.data.numberOfLikes);
        setIsLikeClicked(res.data.topicLikeStatus);
      });
    }
  };
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
              <S.ContentInfoSpan>{created} |</S.ContentInfoSpan>
              <S.ContentInfoSpan>{author} |</S.ContentInfoSpan>
              <S.ContentInfoSpan> 조회수{views} |</S.ContentInfoSpan>
              <S.LikeButton onClick={handleTopicLike}>
                {isLikeClicked ? <ClickedLikeSvg /> : <LikeSvg />}
                {likeCount}
              </S.LikeButton>
              |
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
