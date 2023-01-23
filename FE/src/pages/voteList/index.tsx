import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import ListPage from './listPage';
import * as S from './style';

interface props {
  id: number;
  category: string;
  content: string;
  createdAt: number;
  username: string;
  endDate: number;
}

const VoteList = () => {
  const [data, setData] = useState<props[]>([]);
  const [condition, setCondition] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  console.log(condition, 'api call');
  console.log(page, 'api call');

  useEffect(() => {
    const initialdata = {
      totalPage: 4,
      data: [
        {
          id: 1,
          category: '음식골라줘',
          content: '문장입니다',
          createdAt: 20221212,
          username: 'DADADA',
          endDate: 20221231,
        },
        {
          id: 2,
          category: '음식골라줘',
          content: '문장입니다',
          createdAt: 20221212,
          username: 'DADADA',
          endDate: 20221231,
        },
        {
          id: 3,
          category: '음식골라줘',
          content: '문장입니다',
          createdAt: 20221212,
          username: 'DADADA',
          endDate: 20221231,
        },
        {
          id: 4,
          category: '음식골라줘',
          content: '문장입니다',
          createdAt: 20221212,
          username: 'DADADA',
          endDate: 20221231,
        },
        {
          id: 5,
          category: '음식골라줘',
          content: '문장입니다',
          createdAt: 20221212,
          username: 'DADADA',
          endDate: 20221231,
        },
        {
          id: 6,
          category: '음식골라줘',
          content: '문장입니다',
          createdAt: 20221212,
          username: 'DADADA',
          endDate: 20221231,
        },
      ],
    };

    setData([...initialdata.data]);
    setTotalPage(initialdata.totalPage);
  }, []);

  return (
    <>
      <S.PageContainer>
        <Sidebar />
        <ListPage
          data={data}
          totalPage={totalPage}
          setCondition={setCondition}
          setPage={setPage}
        />
      </S.PageContainer>
    </>
  );
};

export default VoteList;
