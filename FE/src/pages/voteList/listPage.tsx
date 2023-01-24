import React from 'react';
import * as S from './style';
import { MakeVote } from '../../assets/makeVote';
import { RadioButton } from '../../components/VoteList/RadioButton';
import { conditions } from '../../constants/conditions';
import CardItem from '../../components/VoteList/CardItem';
import Link from 'next/link';

interface props {
  id: number;
  category: string;
  content: string;
  createdAt: number;
  username: string;
  endDate: number;
}
interface propsArray {
  data: props[];
  setCondition: Function;
  setPage: Function;
  totalPage: number;
}

const ListPage = ({ data, totalPage, setCondition, setPage }: propsArray) => {
  const conditionKey = Object.keys(conditions);
  const page = Array.from({ length: totalPage }, (_, i) => i + 1);
  const handlePage = (e: any) => {
    setPage(e.target.textContent);
  };

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
        {conditionKey.map((el) => {
          return (
            <RadioButton key={el} condition={el} setCondition={setCondition} />
          );
        })}
      </S.ButtonWrapper>
      {data.map((el, idx) => {
        return <CardItem key={idx} data={el} />;
      })}
      <S.pageNum>
        {page.map((el) => (
          <S.pageNumFont onClick={handlePage} key={el}>
            {el}
          </S.pageNumFont>
        ))}
      </S.pageNum>
    </S.VoteList>
  );
};

export default ListPage;
