import React from 'react';
import { conditions } from '../../constants/conditions';
import * as S from './style';

type ConditionProps = {
  condition: string;
  setCondition: React.Dispatch<React.SetStateAction<string>>;
};

export const RadioButton = ({ condition, setCondition }: ConditionProps) => {
  const handleCondition = () => {
    setCondition(condition);
  };

  return (
    <>
      <S.RadioButton
        id={condition}
        type="radio"
        name="condition"
        onChange={handleCondition}
      />
      <S.ButtonLabel htmlFor={condition} onClick={handleCondition}>
        {conditions[condition]}
      </S.ButtonLabel>
    </>
  );
};
