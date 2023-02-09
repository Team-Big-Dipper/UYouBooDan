import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import ListPage from './listPage';
import * as S from './style';
import { getVoteList } from '../../apis/votelist';

interface propData {
  category: string;
  closedAt: string;
  createdAt: string;
  nickName: string;
  title: string;
  topicId: number;
}

const VoteList = () => {
  const [data, setData] = useState<propData[]>([]);
  const [condition, setCondition] = useState('all');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    console.log('votelist');
    getVoteList(page, size, condition)?.then((res) => {
      setData(res.data);
      setTotalPage(res.pageInfo.totalPages);
      //console.log(res);
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
