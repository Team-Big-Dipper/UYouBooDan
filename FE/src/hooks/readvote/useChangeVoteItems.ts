import React, { useEffect, useState } from 'react';

// export const useChangeImageItems = (
//   itemId: number,
//   isClosed: boolean,
//   theFirstVoteId: number,
//   isTopicVoteItemVoted: boolean,
// ) => {
//   const [isChangedComponent, setIsChangedComponent] = useState(false);
//   useEffect(() => {
//     if (isClosed === true) {
//       if (theFirstVoteId === itemId) {
//         setIsChangedComponent(false);
//       } else {
//         setIsChangedComponent(true);
//       }
//     } else if (isClosed === false) {
//       if (isTopicVoteItemVoted === true) {
//         setIsChangedComponent(true);
//       } else {
//         setIsChangedComponent(false);
//       }
//     }
//   }, []);
//   return isChangedComponent;
// };

export const useChangeTextItems = (
  itemId: number,
  isClosed: boolean,
  theFirstVoteId: number,
  isTopicVoteItemVoted: boolean,
) => {
  const [isChangedComponent, setIsChangedComponent] = useState(false);
  useEffect(() => {
    if (isClosed === true) {
      if (theFirstVoteId === itemId) {
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
