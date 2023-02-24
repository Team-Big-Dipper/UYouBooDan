import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from '../../components/VoteList/sidebar';
import ListPage from '../../components/VoteList/listPage';
import * as S from './style';
import { getVoteList } from '../../apis/votelist/votelist';
import { useSelector } from 'react-redux';

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
  //const [condition, setCondition] = useState('all');
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState(6);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { mobileCondition } = useSelector(
    (state: any) => state.getVoteCondition,
  );
  useEffect(() => {
    setPage(1);
  }, [mobileCondition]);

  useEffect(() => {
    setIsLoading(true);
    getVoteList(page, size, mobileCondition)?.then((res) => {
      setData(res.data);
      setTotalPage(res.pageInfo.totalPages);
      setIsLoading(false);
    });
  }, [mobileCondition, page]);

  return (
    <>
      <S.PageContainer>
        <Sidebar condition={mobileCondition} setPage={setPage} />
        <ListPage
          page={page}
          isLoading={isLoading}
          data={data}
          totalPage={totalPage}
          setPage={setPage}
          condition={mobileCondition}
        />
      </S.PageContainer>
    </>
  );
};

export default VoteList;
