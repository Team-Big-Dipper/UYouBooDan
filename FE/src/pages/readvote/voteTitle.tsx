import React from 'react';
import { QuestionIcon } from '../../assets/questionIcon';
import * as S from './style';
import { LikeSvg } from '../../assets/likeSvg';
import { ShareLinkSvg } from '../../assets/shareLinkSvg';

type propTypes = {
  category: string;
  title: string;
  createdAt: number;
  author: string;
  image: string;
  closedAt: number;
  views: number;
  likes: number;
};

const VoteTitle = ({
  category,
  title,
  createdAt,
  author,
  image,
  closedAt,
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
          <S.DdayIcon>D-{closedAt - createdAt}</S.DdayIcon>
        </S.devideDiv>
      </S.ContentContainer>
    </S.VoteTitleOutLine>
  );
};

export default VoteTitle;
