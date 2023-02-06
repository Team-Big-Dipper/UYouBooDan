import React, { useState, useEffect, useMemo } from 'react';
import * as S from './style';
import { LikeSvg } from '../../assets/likeSvg';
import { ProfileImage } from '../../assets/profileImage';
import { ChangDateFormat } from '../../utils/parseDate';

interface propTypes {
  username: number;
  content: string;
  id: number;
  index: number;
  like: number;
  createdAt: string;
  status: string;
}
const CommentCard = ({
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
  const deletedCommentColor = useMemo(() => {
    return { color: '#667085' };
  }, []);

  return (
    <>
      <S.CommentCard>
        {status === 'DELETE' ? (
          <p style={deletedCommentColor}>삭제된 댓글입니다</p>
        ) : (
          <>
            <S.CommentCardTop>
              <S.CommentUserName>
                <ProfileImage />
                {username}
              </S.CommentUserName>
              <S.CommentLike onClick={onClickLike}>
                <LikeSvg />
                {like}
              </S.CommentLike>
            </S.CommentCardTop>
            <S.CommentContent>{content}</S.CommentContent>
            <S.CommentCardBottomContainer>
              <S.CommentCreatedAt>{created}</S.CommentCreatedAt>
              <p>|</p>
              <S.CommentButtons>수정</S.CommentButtons>
              <p>|</p>
              <S.CommentButtons>삭제</S.CommentButtons>
            </S.CommentCardBottomContainer>
          </>
        )}
      </S.CommentCard>
    </>
  );
};
export default CommentCard;
