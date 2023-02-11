import React from 'react';
import * as S from './style';
import { MakeVote } from '../../assets/makeVote';
import CardItem from '../../components/VoteList/CardItem';
import { conditions } from '../../constants/conditions';
import { RightPageButton, LeftPageButton } from '../../assets/pageButton';

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
}

const ListPage = ({
  isLoading,
  data,
  totalPage,
  setPage,
  condition,
}: propsArray) => {
  const page = Array.from({ length: totalPage }, (_, i) => i + 1);
  const handlePage = (e: any) => {
    setPage(e.target.textContent);
  };

  // //삭제할 것
  // const dataaaaaa = [
  //   {
  //     topicId: 1,
  //     category: '음식',
  //     title:
  //       '투표 게시글 제목 테스트 동해물과 백두산이 마르도 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세 남산위에 저 소나무 철갑을 두른듯',
  //     nickName: '헤이즐넛',
  //     createdAt: '2023-02-05 23:16:12',
  //     closedAt: '2023-02-05 23:30:00',
  //     theFirstItemName: '김치찌개',
  //   },
  //   {
  //     topicId: 2,
  //     category: '음식',
  //     title: '투표 게시글 제목 테스트 ',
  //     nickName: '헤이즐넛',
  //     createdAt: '2023-02-05 23:16:12',
  //     closedAt: '2023-02-05 23:30:00',
  //     theFirstItemName: '삼겹살',
  //   },
  //   {
  //     topicId: 3,
  //     category: '음식',
  //     title: '투표 게시글 제목 테스트 ',
  //     nickName: '헤이즐넛',
  //     createdAt: '2023-02-05 23:16:12',
  //     closedAt: '2023-03-05 23:30:00',
  //     theFirstItemName: null,
  //   },
  //   {
  //     topicId: 4,
  //     category: '음식',
  //     title: '투표 게시글 제목 테스트 ',
  //     nickName: '헤이즐넛',
  //     createdAt: '2023-02-05 23:16:12',
  //     closedAt: '2023-02-22 23:30:00',
  //     theFirstItemName: null,
  //   },
  //   {
  //     topicId: 5,
  //     category: '음식',
  //     title: '투표 게시글 제목 테스트 ',
  //     nickName: '헤이즐넛',
  //     createdAt: '2023-02-05 23:16:12',
  //     closedAt: '2023-02-15 23:30:00',
  //     theFirstItemName: null,
  //   },
  //   {
  //     topicId: 6,
  //     category: '음식',
  //     title: '투표 게시글 제목 테스트 ',
  //     nickName: '헤이즐넛',
  //     createdAt: '2023-02-05 23:16:12',
  //     closedAt: '2023-02-17 23:30:00',
  //     theFirstItemName: null,
  //   },
  // ];

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
      <>
        {isLoading ? (
          <p>로딩중...</p>
        ) : (
          <>
            {data?.map((el) => {
              {
                /* {dataaaaaa.map((el) => { */
              }
              return <CardItem key={el.topicId} prop={el} />;
            })}
            <S.pageNum>
              <LeftPageButton />
              {page.map((el) => (
                <S.pageNumFont onClick={handlePage} key={el}>
                  {el}
                </S.pageNumFont>
              ))}
              <RightPageButton />
            </S.pageNum>
          </>
        )}
      </>
    </S.VoteList>
  );
};

export default ListPage;
