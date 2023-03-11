import { OptionUnstyled } from '@mui/base';
import React from 'react';
import * as S from './style';
type propTypes = {
  updatecategory: string | undefined;
  setUpdateCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
};
const UpdateCategory = ({ updatecategory, setUpdateCategory }: propTypes) => {
   const onChangeCategory = (e: any) => {
    setUpdateCategory(e.target.value);
  }
  const Options = [
    {key:1, value: '음식'},
    {key:2, value: '패션뷰티'},
    {key:3, value: '쇼핑'},
    {key:4, value: '반려동물'},
    {key:5, value: '취미운동'},
    {key:6, value: '일반'}
  ]
  return (
    <S.Select onChange={onChangeCategory} value={updatecategory}>
      {Options.map((item,idx)=>(
        <option key={item.key} value={item.value}>{item.value}</option>
      ))}
    </S.Select>
  );
};
export default UpdateCategory;