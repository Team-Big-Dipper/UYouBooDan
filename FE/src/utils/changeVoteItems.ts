export const ChangeTextItems = (
  isClosed: boolean | null | undefined,
  //isAuthor: boolean | null | undefined,
  isTheFirstItem: boolean | undefined,
  isTopicVoteItemVoted: boolean | null,
) => {
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

export const ChangeImageItems = (
  isClosed: boolean | null | undefined,
  //isAuthor: boolean | null | undefined,
  isTheFirstItem: boolean | undefined,
  isTopicVoteItemVoted: boolean | null,
) => {
  let result = false;
  if (isClosed === true) {
    if (isTheFirstItem) {
      result = false;
    } else {
      result = true;
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
