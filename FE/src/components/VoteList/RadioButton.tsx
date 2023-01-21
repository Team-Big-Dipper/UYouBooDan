import React, { useMemo } from 'react';
import { conditions } from '../../constants/conditions';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';

type ConditionProps = {
  condition: string;
};

export const RadioButton = ({ condition }: ConditionProps) => {
  const container = useMemo(() => {
    return { marginRight: '5px', marginTop: '30px' };
  }, []);

  return (
    <div style={container}>
      <input type="radio" name="condition" style={container} />
      <label htmlFor={condition}>{conditions[condition]}</label>
    </div>
  );
};
