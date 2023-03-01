import React, { useState, useEffect } from 'react';
import { QuestionIcon } from '../../assets/questionIcon';
import * as S from './style';
import { LikeSvg, ClickedLikeSvg } from '../../assets/likeSvg';
import { ShareLinkSvg } from '../../assets/shareLinkSvg';
import LinkModal from '../commons/linkModal';
import { CalcDday } from '../../utils/calculate';
import { ChangDateFormat } from '../../utils/parseDate';
import { patchTopicLike } from '../../apis/readvote/readvote';
import { getToken } from '../../utils/userToken';

type propTypes = {
  category: string | undefined;
  title: string | undefined;
  createdAt: string | undefined;
  author: string | undefined;
  closedAt: string | undefined;
  views: number | null | undefined;
  likes: number | null | undefined;
  setUpdateTitle: React.Dispatch<React.SetStateAction<string|undefined>>;
};

const VoteTitle = ({
  category,
  title,
  setUpdateTitle,
  createdAt,
  author,
  closedAt,
  views,
  likes,
}: propTypes) => {
  const usertoken = getToken();
  const [likeCount, setLikeCount] = useState(likes);
  const [Dday, setDday] = useState<string>('');
  const [created, setCreated] = useState('');

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(e.target.value);
  }

  useEffect(() => {
    const result = CalcDday(closedAt);
    setDday(result);
    const changedDate = ChangDateFormat(createdAt);
    setCreated(changedDate);
  }, [createdAt, closedAt]);

  return (
    <>
      <S.VoteTitleOutLine>
        <S.TitleContainer>
          <QuestionIcon />
          <S.Title
            value={title}
            onChange={(e)=>onChangeTitle(e)}
           />
        </S.TitleContainer>
        <S.ContentContainer>
          <S.DevideSubtitleDiv>
            <S.ContentInfo>
              <S.ContentInfoSpan>{created} |</S.ContentInfoSpan>
              <S.ContentInfoSpan>&nbsp;{author} |</S.ContentInfoSpan>
              <S.ContentInfoSpan>&nbsp;조회수{views} |</S.ContentInfoSpan>
              <S.LikeButton>
                &nbsp;
                <LikeSvg />
                &nbsp;
                {likeCount}
                &nbsp;
              </S.LikeButton>
              |
              <span>
                &nbsp;
                <ShareLinkSvg />
              </span>
            </S.ContentInfo>
          </S.DevideSubtitleDiv>
          <S.DevideIconDiv>
            {/* <S.CategoryIcon color={'black'}>#{category}</S.CategoryIcon> */}
            <S.CategoryIcon color={'#89b7cb'}>단일 투표</S.CategoryIcon>
            <S.DdayIcon>{Dday.length === 0 ? '투표 종료' : Dday}</S.DdayIcon>
          </S.DevideIconDiv>
        </S.ContentContainer>
      </S.VoteTitleOutLine>
    </>
  );
};

export default VoteTitle;
