import React, { useMemo } from 'react';
import { conditions } from '../../constants/conditions';

type ConditionProps = {
  condition: string;
  setCondition: Function;
};

export const RadioButton = ({ condition, setCondition }: ConditionProps) => {
  const container = useMemo(() => {
    return { marginRight: '5px', marginTop: '30px' };
  }, []);
  const handleCondition = () => {
    setCondition(condition);
  };

  return (
    <div style={container}>
      <input
        type="radio"
        name="condition"
        style={container}
        onChange={handleCondition}
      />
      <label htmlFor={condition}>{conditions[condition]}</label>
    </div>
  );
};
