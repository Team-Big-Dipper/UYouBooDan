const mockReadVoteImage = [
  {
    id: 1,
    category: '음식',
    title: '디카페인 vs 카페인',
    created_at: '2022-01-01 01:01:01',
    author: '김밥튀김',
    content:
      '안녕하세요 점심으로 뭘 먹을지 고민중인데 골라줘!\n반짝이는 피고, 품에 오직 하는 보는 기관과 약동하다. 긴지라 어디 아니더면, 지혜는 너의 유소년에게서 것은 일월과 사막이다. 생의 우리 그것은 그리하였는가? 가슴이 같이, 이상 피부가 찾아 그리하였는가? 실현에 수 그들의 인도하겠다는 위하여서. 가진 새 청춘의 위하여, 없는 현저하게 원대하고, 인간의 철환하였는가?',
    image:
      'https://cdn.pixabay.com/photo/2023/01/01/23/37/woman-7691013_640.jpg',
    vote: {
      isAuthor: false,
      isVoted: true,
      topicVoteItems: [
        {
          id: 1,
          content:
            'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032__480.jpg',
          totalVote: 3,
          isTopicVoteItemVoted: false,
        },
        {
          id: 2,
          content:
            'https://cdn.pixabay.com/photo/2017/03/23/19/57/asparagus-2169305__480.jpg',
          totalVote: 4,
          isTopicVoteItemVoted: false,
        },
        {
          id: 3,
          content:
            'https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552__480.jpg',
          totalVote: 14,
          isTopicVoteItemVoted: true,
        },
        {
          id: 4,
          content:
            'https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523__480.jpg',
          totalVote: 4,
          isTopicVoteItemVoted: false,
        },
        {
          id: 5,
          content:
            'https://cdn.pixabay.com/photo/2018/10/14/18/29/meatloaf-3747129__480.jpg',
          totalVote: 9,
          isTopicVoteItemVoted: false,
        },
        {
          id: 6,
          content:
            'https://cdn.pixabay.com/photo/2018/05/01/18/21/eclair-3366430__480.jpg',
          totalVote: 5,
          isTopicVoteItemVoted: false,
        },
      ],
    },
    closedAt: '2022-01-11 01:01:01',
    views: 10,
    likes: 5,
    duplicate: false,
    voteType: 'image',
    closed: true,
  },
];

export default mockReadVoteImage;
