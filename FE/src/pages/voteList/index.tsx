import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import ListPage from './listPage';
import * as S from './style';
import axios from 'axios';

interface props {
  id: number;
  category: string;
  content: string;
  createdAt: string;
  username: string;
  endDate: string;
}

const VoteList = () => {
  const [data, setData] = useState<props[]>([]);
  const [condition, setCondition] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    axios.get(`/api/topics/${condition}`).then((res) => {
      try {
        setData(res?.data[0].data);
        setTotalPage(res?.data[0].totalPage);
      } catch (e) {
        console.log(e);
      }
    });
  }, [condition]);

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
