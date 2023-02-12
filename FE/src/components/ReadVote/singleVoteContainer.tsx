import React, { useState, useEffect } from 'react';
import { SingleTextVote } from './singleTextVote';
import ButtonModal from '../commons/buttonModal';
import { CalcPercentage } from '../../utils/calculate';
import { patchSingleVoteItem } from '../../apis/readvote/readvote';
import { useGetToken } from '../../hooks/userToken/useGetToken';
import ForbidVoteModal from '../commons/forbidVoteModal';

type propTypes = {
  content: string;
  count: number | null;
  selectedBtn: number[];
  handleSelectedBtn: React.Dispatch<React.SetStateAction<number[]>>;
  itemId: number;
  totalCount: number;
  setVoteBtns: Function;
  isTopicVoteItemVoted: boolean | null;
  topicId: string | string[] | undefined;
  isAuthor: boolean | null | undefined;
  isVoted: boolean | null | undefined;
  isClosed: boolean | null | undefined;
  theFirstItemNames: string[] | undefined;
};

export const SingleVoteContainer = ({
  content,
  count,
  itemId,
  topicId,
  totalCount,
  setVoteBtns,
  isTopicVoteItemVoted,
  isAuthor,
  isVoted,
  isClosed,
  theFirstItemNames,
}: propTypes) => {
  const [text, setText] = useState('투표할까요?');
  const [openModal, setOpenModal] = useState(false);
  const [calculated, setCalculated] = useState<number>(1);
  const [isTheFirstItem, setIsTheFirstItem] = useState<boolean | undefined>();

  useEffect(() => {
    if (theFirstItemNames?.length !== 0) {
      const isFirstItem = theFirstItemNames?.map((el) => {
        if (el === content) {
          return true;
        } else {
          return false;
        }
      });
      if (isFirstItem !== undefined && isFirstItem[0] !== undefined) {
        console.log(isFirstItem[0], '여기');
        setIsTheFirstItem(isFirstItem[0]);
      }
    }
  }, []);

  useEffect(() => {
    if (count !== null) {
      setCalculated(CalcPercentage(count, totalCount));
    }
  }, [totalCount]);

  const handleModal = () => {
    if (!!isClosed) {
      return;
    }
    setOpenModal((prev) => !prev);
    if (!isAuthor) {
      if (!!isTopicVoteItemVoted && isVoted) {
        return setText('투표를 취소할까요?');
      } else if (!isTopicVoteItemVoted && isVoted) {
        return setText('투표를 변경할까요?');
      } else {
        return setText('투표할까요?');
      }
    } else {
      return setText('본인 게시물에 투표 금지!!');
    }
  };
  const token = useGetToken();
  const onVote = () => {
    if (token !== undefined) {
      patchSingleVoteItem(Number(topicId), itemId, token)?.then((res) => {
        setVoteBtns([...res.data]);
      });
    }
  };

  return (
    <>
      {openModal && (
        <>
          {isAuthor ? (
            <ForbidVoteModal setOpenModal={setOpenModal} />
          ) : (
            <ButtonModal
              text={text}
              setOpenModal={setOpenModal}
              confirmFunc={onVote}
            />
          )}
        </>
      )}
      <>
        <div onClick={handleModal}>
          <SingleTextVote
            itemId={itemId}
            content={content}
            count={count}
            calculated={calculated}
            isClosed={isClosed}
            isAuthor={isAuthor}
            isTopicVoteItemVoted={isTopicVoteItemVoted}
            isTheFirstItem={isTheFirstItem}
          />
        </div>
      </>
    </>
  );
};
