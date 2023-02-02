import React, { useEffect, useState } from 'react';

export const useChangeImageItems = (
  id: number,
  isClosed: boolean,
  bestItem: number,
  isTopicVoteItemVoted: boolean,
) => {
  const [isChangedComponent, setIsChangedComponent] = useState(false);
  useEffect(() => {
    if (isClosed === true) {
      if (bestItem === id) {
        setIsChangedComponent(false);
      } else {
        setIsChangedComponent(true);
      }
    } else if (isClosed === false) {
      if (isTopicVoteItemVoted === true) {
        setIsChangedComponent(true);
      } else {
        setIsChangedComponent(false);
      }
    }
  }, []);
  return isChangedComponent;
};

export const useChangeTextItems = (
  id: number,
  isClosed: boolean,
  bestItem: number,
  isTopicVoteItemVoted: boolean,
) => {
  const [isChangedComponent, setIsChangedComponent] = useState(false);
  useEffect(() => {
    if (isClosed === true) {
      if (bestItem === id) {
        setIsChangedComponent(true);
      } else {
        setIsChangedComponent(false);
      }
    } else if (isClosed === false) {
      if (isTopicVoteItemVoted === true) {
        setIsChangedComponent(true);
      } else {
        setIsChangedComponent(false);
      }
    }
  }, []);
  return isChangedComponent;
};
