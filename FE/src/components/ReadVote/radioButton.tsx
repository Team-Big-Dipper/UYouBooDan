import React, { useMemo } from 'react';
import { conditions } from '../../constants/conditions';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { getnewdata } from '../../redux/slices/sortReadVoteSlice';

type ConditionProps = {
  condition: string;
};

export const RadioButton = ({ condition }: ConditionProps) => {
  const container = useMemo(() => {
    return { marginRight: '5px', marginTop: '30px' };
  }, []);

  const sortedVoteList = useSelector(
    (state: RootState) => state.sortedVote.sortedVoteState,
  );
  const dispatch = useDispatch();

  const clickRadioBtn = () => {
    let data: string[] = [condition];
    dispatch(getnewdata(data));
    console.log('버튼 클릭', sortedVoteList, data);
  };

  return (
    <div style={container}>
      <input
        type="radio"
        name="condition"
        style={container}
        onClick={clickRadioBtn}
      />
      <label htmlFor={condition}>{conditions[condition]}</label>
    </div>
  );
};
