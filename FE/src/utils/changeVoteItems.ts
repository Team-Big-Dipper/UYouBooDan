export const ChangeTextItems = (
  isClosed: boolean | null | undefined,
  isAuthor: boolean | null | undefined,
  isTheFirstItem: boolean | undefined,
  isTopicVoteItemVoted: boolean | null,
) => {
  console.log(isClosed, isAuthor, isTheFirstItem, isTopicVoteItemVoted);

  let result = false;
  if (isClosed === true) {
    if (isTheFirstItem) {
      result = true;
    } else {
      result = false;
    }
  } else if (isClosed === false) {
    if (isTopicVoteItemVoted === true) {
      result = true;
    } else {
      result = false;
    }
  }
  return result;
};

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
