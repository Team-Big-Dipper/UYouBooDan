import React, { useState, useEffect } from 'react';
import { SingleTextVote } from './singleTextVote';
import ButtonModal from '../commons/buttonModal';
import { CalcPercentage } from '../../utils/calculate';
import { useDispatch, useSelector } from 'react-redux';
import { patchSingleVoteItem } from '../../apis/readvote/readvote';
import { useGetToken } from '../../hooks/userToken/useGetToken';
import { getCurrent } from '../../redux/slices/currentVoteSlice';
import ForbidVoteModal from '../commons/forbidVoteModal';

type propTypes = {
  content: string;
  count: number;
  selectedBtn: number[];
  handleSelectedBtn: React.Dispatch<React.SetStateAction<number[]>>;
  itemId: number;
  totalCount: number;
  setVoteBtns: Function;
  isTopicVoteItemVoted: boolean;
  topicId: string | string[] | undefined;
};

export const SingleVoteContainer = ({
  content,
  count,
  itemId,
  topicId,
  totalCount,
  setVoteBtns,
  isTopicVoteItemVoted,
}: propTypes) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('투표할까요?');
  const [openModal, setOpenModal] = useState(false);
  const [calculated, setCalculated] = useState<number>(1);
  const { isAuthor, isVoted, isClosed } = useSelector(
    (state: any) => state.currentVote,
  );
  useEffect(() => {
    setCalculated(CalcPercentage(count, totalCount));
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
        if (!isVoted) {
          dispatch(
            getCurrent({
              isVoted: true,
            }),
          );
        }
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
            count={calculated}
            isTopicVoteItemVoted={isTopicVoteItemVoted}
          />
        </div>
      </>
    </>
  );
};
