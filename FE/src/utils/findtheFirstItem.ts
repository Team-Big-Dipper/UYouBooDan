interface arrType {
  numberOfVotes: number;
  topicVoteItemId: number;
  topicVoteItemName: string;
  isTopicVoteItemVoted: boolean;
}
interface returnTypes {
  numberOfVotes: number;
}

const FindTheFirstItem = (arr: arrType[]): returnTypes => {
  const filteredArr = arr.map((el) => {
    return el.numberOfVotes;
  });
  let max = Math.max(...filteredArr);
  const theFirstObj = arr.filter((el) => el.numberOfVotes === max);
  return theFirstObj[0];
};

export default FindTheFirstItem;
