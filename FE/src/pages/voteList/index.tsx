import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import ListPage from './listPage';
import * as S from './style';
import { getVoteList } from '../../apis/votelist/votelist';
import { useDispatch, useSelector } from 'react-redux';
import { getVoteCondition } from '../../redux/slices/getVoteConditionSlice';

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
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState(6);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { mobileCondition } = useSelector(
    (state: any) => state.getVoteCondition,
  );
  useEffect(() => {
    setCondition(mobileCondition);
    setPage(1);
  }, [mobileCondition]);

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
        <Sidebar condition={condition} setPage={setPage} />
        <ListPage
          page={page}
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
