import React from 'react';
import { ProfileImage } from '../../assets/profileImage';
import * as S from '../../pages/voteList/style';
import { useRouter } from 'next/router';

interface propTypes {
  data: {
    id: number;
    category: string;
    content: string;
    createdAt: number;
    username: string;
    endDate: number;
  };
}

const CardItem = ({ data }: propTypes) => {
  const router = useRouter();

  const handleLink = () => {
    router.push({
      pathname: '/readvote',
      query: { pid: data.id },
    });
  };
  return (
    <S.CardItem onClick={handleLink}>
      <div>
        <S.CardCategory>#{data.category}</S.CardCategory>
        <S.CardContents>
          <S.Content>{data.content}</S.Content>
          <S.CardDDay>D-{data.endDate - data.createdAt}</S.CardDDay>
        </S.CardContents>
      </div>
      <S.ProfileContainer>
        <ProfileImage />
        <S.UserName>{data.username}</S.UserName>|
        <S.Date>{data.createdAt}</S.Date>
      </S.ProfileContainer>
    </S.CardItem>
  );
};

export default CardItem;
