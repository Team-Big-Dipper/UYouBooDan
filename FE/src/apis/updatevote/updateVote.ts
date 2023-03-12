import voteInstance from '../voteInstance';

export const updateVoteAPI = (
  topicId: number,
  token: string | undefined,
  updateTitle: string | undefined,
  updateContent: string | undefined,
  updatecategory: string | undefined,
) => {
  console.log('api updatevote',topicId, token, updateTitle, updateContent, updatecategory);
  const result = voteInstance
    .patch(
      `/topics/${topicId}`,
      {
        title: updateTitle,
        content: updateContent,
        category: updatecategory,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'ngrok-skip-browser-warning': 'any',
        },
      },
    )
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};
