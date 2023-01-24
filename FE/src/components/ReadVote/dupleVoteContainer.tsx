import React, { useState, useEffect } from 'react';
import { TextVote } from './textVote';
import { ImageVote } from './imageVote';

type propTypes = {
  content: string;
  count: number;
  selectedBtn: number[];
  handleSelectedBtn: Function;
  duplicate: boolean | undefined;
  voteType: string | undefined;
  id: number;
};
export const DupleVoteContainer = ({
  content,
  count,
  selectedBtn,
  handleSelectedBtn,
  duplicate,
  voteType,
  id,
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
      let result: Number[] = [];
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
            <TextVote clicked={clicked} content={content} count={count} />
          </div>
        ) : (
          <div onClick={onVote} style={{ margin: '5px' }}>
            <ImageVote clicked={clicked} content={content} count={count} />
          </div>
        )}
      </>
    </>
  );
};
