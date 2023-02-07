import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import ListPage from './listPage';
import * as S from './style';
import { getVoteList } from '../../apis/votelist';

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

const VoteList = () => {
  const [data, setData] = useState<props[]>([]);
  const [condition, setCondition] = useState('all');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    console.log('api call');
    getVoteList(page, size, condition)?.then((res) => {
      setData(res.data);
      setTotalPage(res.pageInfo.totalPages);
    });
  }, [condition, page]);

  return (
    <>
      <S.PageContainer>
        <Sidebar condition={condition} setCondition={setCondition} />
        <ListPage
          data={data}
          totalPage={totalPage}
          setPage={setPage}
          condition={condition}
        />
      </S.PageContainer>
    </>
  );
};

export default VoteList;
