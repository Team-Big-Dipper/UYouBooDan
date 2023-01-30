import React, { useState, useEffect } from 'react';
import * as S from './style';
import { LikeSvg } from '../../assets/likeSvg';
import { ProfileImage } from '../../assets/profileImage';
import { ChangDateFormat } from '../../utils/parseDate';

interface propTypes {
  username: string;
  content: string;
  id: number;
  index: number;
  like: number;
  createdAt: string;
  status: string;
}
const AnswerCard = ({
  index,
  id,
  username,
  content,
  like,
  createdAt,
  status,
}: propTypes) => {
  const [created, setCreated] = useState('');
  useEffect(() => {
    const changedDate = ChangDateFormat(createdAt);
    setCreated(changedDate);
  }, []);
  const onClickLike = () => {
    alert('좋아요+1');
  };

  return (
    <>
      <S.AnswerCard>
        {status === 'DELETE' ? (
          <p>삭제된 댓글입니다</p>
        ) : (
          <>
            <S.AnswerCardTop>
              <S.AnswerUserName>
                <ProfileImage />
                {username}
              </S.AnswerUserName>
              <S.AnswerLike onClick={onClickLike}>
                <LikeSvg />
                {like}
              </S.AnswerLike>
            </S.AnswerCardTop>
            <S.AnswerContent>{content}</S.AnswerContent>
            <S.AnswerCardBottom>
              <S.AnswerCreatedAt>{created}</S.AnswerCreatedAt>
              <p>|</p>
              <S.AnswerButtons>수정</S.AnswerButtons>
              <p>|</p>
              <S.AnswerButtons>삭제</S.AnswerButtons>
              <S.AddAnswerButton>댓글작성</S.AddAnswerButton>
            </S.AnswerCardBottom>
          </>
        )}
      </S.AnswerCard>
    </>
  );
};
export default AnswerCard;
