import React, { useEffect, useState, useCallback, useMemo } from 'react';
import * as S from './style';
import VoteTitle from '../../components/UpdateVote/voteTitle';
import UpdateContent from '../../components/UpdateVote/updateContent';
import { SingleVoteContainer } from '../../components/ReadVote/singleVoteContainer';
import { useRouter } from 'next/router';
import VoteBtn from '../../components/UpdateVote/voteBtn';
import { CalcTotal } from '../../utils/calculate';
import { getReadVote } from '../../apis/readvote/readvote';
import { getToken } from '../../utils/userToken';

interface responseType {
  topicId: number;
  category: string;
  title: string;
  content: string;
  image: string;
  topicVoteItems: voteType[];
  closedAt: string;
  createdAt: string;
  author: string;
  isAuthor: boolean;
  isVoted: boolean;
  views: number | null;
  likes: number;
  isLiked: boolean;
  isClosed: boolean;
  theFirstItemNames: string[];
}

interface voteType {
  topicVoteItemName: string;
  topicVoteItemId: number;
  isTopicVoteItemVoted: boolean | null;
  numberOfVotes: number | null;
}

export interface Update {
  category?: String;
  title?: String;
  content?: String;
}

const UpdateVote = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [data, setData] = useState<responseType>();
  const [voteBtns, setVoteBtns] = useState<voteType[]>();
  const [selectedBtn, setSelectedBtn] = useState<number[]>([]);
  const [totalCount, setTotalCount] = useState<number>(20);
  const [isLoading, setIsLoading] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(data?.title);

  console.log(data?.title)
  console.log(updateTitle)
  const handleSelectedBtn = useCallback((array: any) => {
    setSelectedBtn(array);
  }, []);
  const usertoken = useMemo(() => getToken(), []);
  useEffect(() => {
    if (pid === undefined) {
      return;
    } else {
      if (usertoken !== undefined) {
        setIsLoading(true);
        getReadVote(pid, usertoken)?.then((res) => {
          if (res === 'Err') {
            router.push('/auth');
            return;
          }
          setData({ ...res.data });
          setVoteBtns([...res.data.topicVoteItems]);
          setTotalCount(CalcTotal(res.data.topicVoteItems));
          setIsLoading(false);
        });
      } else {
        router.push('/auth');
      }
    }
  }, [pid]);

  return (
    <>
      <S.PageContainer>
        <S.CurrentCategoty>
          <S.LinkButton href="/">???</S.LinkButton>
          {' > '}????????????{' > '}????????? ??????
        </S.CurrentCategoty>
        <S.Sign>* ??????, ??????, ??????????????? ?????????????????????.</S.Sign>
        <>
          {isLoading ? (
            <p>?????????...</p>
          ) : (
            <>
              <VoteTitle
                category={data?.category}
                title={updateTitle}
                setUpdateTitle={setUpdateTitle}
                createdAt={data?.createdAt}
                author={data?.author}
                closedAt={data?.closedAt}
                views={data?.views}
                likes={data?.likes}
              />
              <S.VoteContentLayout>
                {!data?.image ? (
                  <UpdateContent content={data?.content} image={null} />
                ) : (
                  <UpdateContent content={data?.content} image={data?.image} />
                )}
                <div>
                  {voteBtns?.map((el) => {
                    return (
                      <SingleVoteContainer
                        key={el.topicVoteItemId}
                        topicId={pid}
                        itemId={el.topicVoteItemId}
                        content={el.topicVoteItemName}
                        count={el.numberOfVotes}
                        setVoteBtns={setVoteBtns}
                        selectedBtn={selectedBtn}
                        handleSelectedBtn={handleSelectedBtn}
                        totalCount={totalCount}
                        isTopicVoteItemVoted={el.isTopicVoteItemVoted}
                        isAuthor={data?.isAuthor}
                        isVoted={data?.isVoted}
                        isClosed={data?.isClosed}
                        theFirstItemNames={data?.theFirstItemNames}
                      />
                    );
                  })}
                </div>
                <S.TotalVoteCount isClosed={data?.isClosed}>
                  {data?.isClosed && data?.isAuthor
                    ? '????????????: ' + totalCount + '???'
                    : null}
                </S.TotalVoteCount>
                <VoteBtn 
                  pid={pid} 
                  updateTitle={updateTitle} 
                  isAuthor={data?.isAuthor} 
                />
              </S.VoteContentLayout>
            </>
          )}
        </>
      </S.PageContainer>
    </>
  );
};

export default UpdateVote;
