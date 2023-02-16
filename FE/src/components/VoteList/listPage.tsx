import React, { useMemo, useCallback } from 'react';
import * as S from './style';
import { MakeVote } from '../../assets/makeVote';
import CardItem from './CardItem';
import { conditions } from '../../constants/conditions';
import { RightPageButton, LeftPageButton } from '../../assets/pageButton';
import LoadingSpinner from '../../assets/loadingspinner.gif';

interface props {
  category: string;
  closedAt: string;
  createdAt: string;
  nickName: string;
  title: string;
  topicId: number;
  theFirstItemName: string | null;
}
interface propsArray {
  isLoading: boolean;
  data: props[];
  setPage: Function;
  totalPage: number;
  condition: string;
  page: number;
}

const ListPage = ({
  isLoading,
  data,
  totalPage,
  page,
  setPage,
  condition,
}: propsArray) => {
  const pageArr = useMemo(
    () => Array.from({ length: totalPage }, (_, i) => i + 1),
    [totalPage],
  );
  const handlePage = useCallback((e: any) => {
    setPage(Number(e.target.textContent));
  }, []);
  const handlePageButton = (e: any) => {
    if (
      e.target.parentNode.id === 'votelist-right-button' &&
      page < totalPage
    ) {
      setPage((prev: number) => prev + 1);
    } else if (e.target.parentNode.id === 'votelist-left-button' && page > 1) {
      setPage((prev: number) => prev - 1);
    } else {
      return;
    }
  };

  return (
    <S.VoteList>
      <S.PageHeader>
        <div>
          <S.PageTitle>
            #{condition === null ? conditions['all'] : conditions[condition]}
          </S.PageTitle>
          <S.PageSubTitle>
            {condition === null ? conditions['all'] : conditions[condition]}에
            관한 다양한 투표가 진행되고 있습니다.
          </S.PageSubTitle>
        </div>
        <S.PageLink href="/createvote">
          <MakeVote />
        </S.PageLink>
      </S.PageHeader>
      <>
        {isLoading ? (
          <S.LoadingImage src={LoadingSpinner} alt="gif" />
        ) : (
          <>
            {data?.map((el) => {
              return <CardItem key={el.topicId} prop={el} />;
            })}
            <S.pageNum>
              <div id="votelist-left-button" onClick={handlePageButton}>
                <LeftPageButton />
              </div>
              {pageArr.map((el) => (
                <S.pageNumFont
                  onClick={handlePage}
                  isCurrentPage={page === el ? true : false}
                  key={el}
                >
                  {el}
                </S.pageNumFont>
              ))}
              <div id="votelist-right-button" onClick={handlePageButton}>
                <RightPageButton />
              </div>
            </S.pageNum>
          </>
        )}
      </>
    </S.VoteList>
  );
};

export default ListPage;
