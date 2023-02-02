import React, { useEffect, useState } from 'react';
import { ProfileImage } from '../../assets/profileImage';
import * as S from './style';
import { useRouter } from 'next/router';
import { CalcDday } from '../../utils/calculate';
import { ChangDateFormat } from '../../utils/parseDate';

interface propTypes {
  data: {
    id: number;
    category: string;
    content: string;
    createdAt: string;
    username: string;
    endDate: string;
  };
}

const CardItem = ({ data }: propTypes) => {
  const router = useRouter();
  const [Dday, setDday] = useState(0);
  const [created, setCreated] = useState('');
  const handleLink = () => {
    router.push({
      pathname: '/readvote',
      query: { pid: data.id },
    });
  };
  useEffect(() => {
    const result = CalcDday(data.createdAt, data.endDate);
    setDday(result);
    const changedDate = ChangDateFormat(data.createdAt);
    setCreated(changedDate);
  }, []);

  return (
    <S.CardItem onClick={handleLink}>
      <div>
        <S.CardCategory># {data.category}</S.CardCategory>
        <S.CardContents>
          <S.Content>{data.content}</S.Content>
          <S.CardDDay>D-{Dday}</S.CardDDay>
        </S.CardContents>
      </div>
      <S.ProfileContainer>
        <ProfileImage />
        <S.UserName>{data.username} |</S.UserName>
        <S.Date>{created}</S.Date>
      </S.ProfileContainer>
    </S.CardItem>
  );
};

export default CardItem;
