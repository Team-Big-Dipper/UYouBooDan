import React from 'react';
//redux
import { useDispatch } from 'react-redux';
import { goseach } from '../../redux/slices/searchVoteSlice';

const SearchInput = (word: string): void => {
  const dispatch = useDispatch();

  dispatch(goseach(word));
  console.log(word);
};

export default SearchInput;
