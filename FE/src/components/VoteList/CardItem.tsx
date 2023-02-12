import React, { useEffect, useState } from 'react';
import { ProfileImage } from '../../assets/profileImage';
import * as S from './style';
import { useRouter } from 'next/router';
import { CalcDday } from '../../utils/calculate';
import { ChangDateFormat } from '../../utils/parseDate';

interface propTypes {
  prop: {
    category: string;
    closedAt: string;
    createdAt: string;
    nickName: string;
    title: string;
    topicId: number;
    theFirstItemName: string | null;
  };
}

const CardItem = ({ prop }: propTypes) => {
  const router = useRouter();
  const [Dday, setDday] = useState<string>('');
  const [created, setCreated] = useState('');
  const handleLink = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/readvote',
      query: { pid: prop.topicId },
    });
  };
  useEffect(() => {
    const result = CalcDday(prop.closedAt);
    setDday(result);
    const changedDate = ChangDateFormat(prop.createdAt);
    setCreated(changedDate);
  }, []);

  return (
    <S.CardItem onClick={handleLink}>
      <S.CardContentsDiv>
        <S.CardCategory># {prop.category}</S.CardCategory>
        <S.CardContents>
          <S.Content>{prop.title}</S.Content>
          <S.CardDDay isClosed={Dday.length === 0 ? true : false}>
            {Dday.length === 0 ? '종료' : Dday}
          </S.CardDDay>
        </S.CardContents>
      </S.CardContentsDiv>
      <S.ProfileContainer>
        <ProfileImage />
        <S.UserName>{prop.nickName} |</S.UserName>
        <S.Date>{created}</S.Date>
      </S.ProfileContainer>
      <S.TheFirstItem>
        {!!prop.theFirstItemName ? <>1위 {prop.theFirstItemName}</> : null}
      </S.TheFirstItem>
    </S.CardItem>
  );
};

export default CardItem;
