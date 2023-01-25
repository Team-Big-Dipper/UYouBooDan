import React from 'react';
import * as S from './style';
import { LikeSvg } from '../../assets/likeSvg';
import { ProfileImage } from '../../assets/profileImage';

interface propTypes {
  username: string;
  content: string;
  id: number;
  index: number;
  like: number;
  createdAt: string;
}
const AnswerCard = ({
  index,
  id,
  username,
  content,
  like,
  createdAt,
}: propTypes) => {
  return (
    <S.AnswerCard>
      <S.AnswerCardTop>
        <S.AnswerUserName>
          <ProfileImage />
          {username}
        </S.AnswerUserName>
        <S.AnswerLike>
          <LikeSvg />
          {like}
        </S.AnswerLike>
      </S.AnswerCardTop>
      <S.AnswerContent>{content}</S.AnswerContent>
      <S.AnswerCardBottom>
        <S.AnswerCreatedAt>{createdAt}</S.AnswerCreatedAt>
        <p>|</p>
        <S.AnswerButtons>수정</S.AnswerButtons>
        <p>|</p>
        <S.AnswerButtons>삭제</S.AnswerButtons>
        <S.AddAnswerButton>댓글작성</S.AddAnswerButton>
      </S.AnswerCardBottom>
    </S.AnswerCard>
  );
};
export default AnswerCard;
