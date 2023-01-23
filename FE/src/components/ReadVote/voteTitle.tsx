import React from 'react';
import { QuestionIcon } from '../../assets/questionIcon';
import * as S from './style';
import { LikeSvg } from '../../assets/likeSvg';
import { ShareLinkSvg } from '../../assets/shareLinkSvg';

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
  return (
    <S.VoteTitleOutLine>
      <S.TitleContainer>
        <QuestionIcon />
        <S.Title>{title}</S.Title>
      </S.TitleContainer>
      <S.ContentContainer>
        <S.devideDiv>
          <S.ContentInfo>
            {createdAt} | {author} | 조회수{views} | <LikeSvg />
            {likes} | <ShareLinkSvg />
          </S.ContentInfo>
        </S.devideDiv>
        <S.devideDiv>
          <S.CategoryIcon color={'black'}>#{category}</S.CategoryIcon>
          <S.CategoryIcon color={'#89b7cb'}>중복투표</S.CategoryIcon>
          <S.DdayIcon>D-{dday}</S.DdayIcon>
        </S.devideDiv>
      </S.ContentContainer>
    </S.VoteTitleOutLine>
  );
};

export default VoteTitle;
