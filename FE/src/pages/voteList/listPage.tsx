import React from 'react';
import * as S from './style';
import { MakeVote } from '../../assets/makeVote';
import CardItem from '../../components/VoteList/CardItem';
import { conditions } from '../../constants/conditions';

interface props {
  data: {
    category: string;
    closedAt: string;
    createdAt: string;
    nickName: string;
    title: string;
    topicId: number;
  };
  id: number;
  pageInfo: any;
}
interface propsArray {
  data: props[];
  setPage: Function;
  totalPage: number;
  condition: string;
}

const ListPage = ({ data, totalPage, setPage, condition }: propsArray) => {
  const page = Array.from({ length: totalPage }, (_, i) => i + 1);
  const handlePage = (e: any) => {
    setPage(e.target.textContent);
  };
  return (
    <S.VoteList>
      <S.PageHeader>
        <div>
          <S.PageTitle>#{conditions[condition]}</S.PageTitle>
          <S.PageSubTitle>
            다양한 {conditions[condition]}가 진행되고 있습니다.
          </S.PageSubTitle>
        </div>
        <S.PageLink href="/createvote">
          <MakeVote />
        </S.PageLink>
      </S.PageHeader>
      {data?.map((el) => {
        return <CardItem key={el.id} prop={el.data} />;
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
