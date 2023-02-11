import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import ListPage from './listPage';
import * as S from './style';
import { getVoteList } from '../../apis/votelist/votelist';

interface propData {
  category: string;
  closedAt: string;
  createdAt: string;
  nickName: string;
  title: string;
  topicId: number;
  theFirstItemName: string | null;
}

const VoteList = () => {
  const [data, setData] = useState<propData[]>([]);
  const [condition, setCondition] = useState('all');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getVoteList(page, size, condition)?.then((res) => {
      setData(res.data);
      setTotalPage(res.pageInfo.totalPages);
      setIsLoading(false);
    });
  }, [condition, page]);

  return (
    <>
      <S.PageContainer>
        <Sidebar
          condition={condition}
          setPage={setPage}
          setCondition={setCondition}
        />
        <ListPage
          isLoading={isLoading}
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
