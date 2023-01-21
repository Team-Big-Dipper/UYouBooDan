import React from 'react';
import { ProfileImage } from '../../assets/profileImage';
import * as S from '../../pages/readvote/style';

const CardItem = () => {
  return (
    <S.CardItem>
      <div>
        <S.CardCategory>#카테고리</S.CardCategory>
        <S.CardContents>
          <S.Content>문장입니다 문장입니다</S.Content>
          <S.CardDDay>D-15</S.CardDDay>
        </S.CardContents>
      </div>
      <S.ProfileContainer>
        <ProfileImage />
        <S.UserName>DASONG</S.UserName>|<S.Date>2023.01.02</S.Date>
      </S.ProfileContainer>
    </S.CardItem>
  );
};

export default CardItem;
