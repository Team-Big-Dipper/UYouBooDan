import React, { useState, useEffect } from 'react';
import { DupleTextVote } from './dupleTextVote';
import { DupleImageVote } from './dupleImageVote';
type propTypes = {
  content: string;
  count: number;
  selectedBtn: number[];
  handleSelectedBtn: React.Dispatch<React.SetStateAction<number[]>>;
  duplicate: boolean | undefined;
  voteType: string | undefined;
  id: number;
  totalCount: number;
};
export const DupleVoteContainer = ({
  content,
  count,
  selectedBtn,
  handleSelectedBtn,
  duplicate,
  voteType,
  id,
  totalCount,
}: propTypes) => {
  const [clicked, setClicked] = useState(false);
  const handleFocus = () => {
    setClicked((prev) => !prev);
  };

  useEffect(() => {
    if (clicked && !duplicate) {
      handleFocus();
    }
  }, []);

  const onVote = () => {
    if (clicked) {
      let result: number[] = [];
      if (duplicate) {
        handleFocus();
        result = selectedBtn.filter((el) => el !== id);
      } else {
        handleFocus();
      }
      return handleSelectedBtn([...result]);
    } else {
      handleFocus();
      if (duplicate) {
        return handleSelectedBtn([...selectedBtn, id]);
      } else {
        return handleSelectedBtn([id]);
      }
    }
  };
  console.log(selectedBtn);
  return (
    <>
      <>
        {voteType === 'text' ? (
          <div onClick={onVote}>
            <DupleTextVote clicked={clicked} content={content} count={count} />
          </div>
        ) : (
          <div onClick={onVote} style={{ margin: '5px' }}>
            <DupleImageVote clicked={clicked} content={content} count={count} />
          </div>
        )}
      </>
    </>
  );
};
