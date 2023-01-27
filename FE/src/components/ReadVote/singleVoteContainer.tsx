import React, { useState, useMemo, useEffect } from 'react';
import { SingleTextVote } from './singleTextVote';
import { SingleImageVote } from './singleImageVote';
import ButtonModal from '../commons/buttonModal';
import { CalcPercentage } from '../../utils/calculate';
import { useSelector } from 'react-redux';

type propTypes = {
  content: string;
  count: number;
  selectedBtn: number[];
  handleSelectedBtn: React.Dispatch<React.SetStateAction<number[]>>;
  duplicate: boolean | undefined;
  voteType: string | undefined;
  id: number;
  totalCount: number;
  isTopicVoteItemVoted: boolean;
};
export const SingleVoteContainer = ({
  content,
  count,
  voteType,
  id,
  totalCount,
  isTopicVoteItemVoted,
}: propTypes) => {
  const [text, setText] = useState('투표할까요?');
  const { isAuthor, isVoted, isClosed } = useSelector(
    (state: any) => state.currentVote,
  );
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    if (!isAuthor) setOpenModal((prev) => !prev);
    if (!!isTopicVoteItemVoted && isVoted) {
      setText('투표를 취소할까요?');
    } else if (!isTopicVoteItemVoted && isVoted) {
      setText('투표를 변경할까요?');
    } else {
      setText('투표할까요?');
    }
  };

  const onVote = () => {
    console.log('api call');
  };

  const imageMargin = useMemo(() => {
    return { margin: '5px' };
  }, []);

  const [calculated, setCalculated] = useState<number>(1);
  useEffect(() => {
    setCalculated(CalcPercentage(count, totalCount));
  }, [totalCount]);

  return (
    <>
      {openModal && (
        <ButtonModal
          text={text}
          setOpenModal={setOpenModal}
          confirmFunc={onVote}
        />
      )}
      <>
        {voteType === 'text' ? (
          <div onClick={handleModal}>
            <SingleTextVote
              content={content}
              count={calculated}
              isTopicVoteItemVoted={isTopicVoteItemVoted}
            />
          </div>
        ) : (
          <div onClick={handleModal} style={imageMargin}>
            <SingleImageVote
              content={content}
              count={calculated}
              isTopicVoteItemVoted={isTopicVoteItemVoted}
            />
          </div>
        )}
      </>
    </>
  );
};
