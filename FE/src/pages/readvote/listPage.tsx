import React, { useState } from 'react';
import * as S from './style';
import { MakeVote } from '../../assets/makeVote';
import { RadioButton } from '../../components/ReadVote/radioButton';
import { conditions } from '../../constants/conditions';
import CardItem from '../../components/ReadVote/CardItem';
import Link from 'next/link';
import type { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const ListPage = () => {
  const conditionKey = Object.keys(conditions);
  const [data, setData] = useState([1, 2, 3, 4, 5, 6]);
  const sortedVoteList = useSelector(
    (state: RootState) => state.sortedVote.sortedVoteState,
  );
  const searched = useSelector(
    (state: RootState) => state.searchVote.searchState,
  );
  console.log(sortedVoteList, searched);
  return (
    <S.VoteList>
      <S.PageHeader>
        <div>
          <S.PageTitle>#맛집추천</S.PageTitle>
          <p>맛집 추천에 관한 다양한 투표가 진행되고 있습니다.</p>
        </div>
        <Link href="/createvote">
          <MakeVote />
        </Link>
      </S.PageHeader>
      <S.ButtonWrapper>
        {/* <RadioButton 컴포넌트에서 dispatch가 실행되게 할 것 */}
        {conditionKey.map((el) => {
          return <RadioButton key={el} condition={el} />;
        })}
      </S.ButtonWrapper>
      {data.map((el, idx) => {
        return <CardItem key={idx} />;
      })}
      <p>{data[1]}</p>
    </S.VoteList>
  );
};

export default ListPage;
