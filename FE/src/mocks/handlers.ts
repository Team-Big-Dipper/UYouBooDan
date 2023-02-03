import { AxiosRequestConfig } from 'axios';
import { DefaultBodyType, PathParams, rest, RestRequest } from 'msw';
import {
  mockUsers,
  mockVote,
  mockVoteList,
  mockSortedInProgress,
  mockSortedTerminate,
  mockReadVoteText1,
  mockReadVoteText2,
  mockReadVoteText3,
  mockReadVoteText4,
  mockReadVoteText5,
  mockReadVoteImage1,
  mockReadVoteImage2,
  mockContinueList,
  mockAnswer,
  mockDeadLineList
} from './data';

let MockUsers = [...mockUsers];
let MockVote = { ...mockVote };
let MockVoteList = [...mockVoteList];
let MockSortedInProgress = [...mockSortedInProgress];
let MockSortedTerminate = [...mockSortedTerminate];
let MockReadVoteText1 = [...mockReadVoteText1];
let MockReadVoteText2 = [...mockReadVoteText2];
let MockReadVoteText3 = [...mockReadVoteText3];
let MockReadVoteText4 = [...mockReadVoteText4];
let MockReadVoteText5 = [...mockReadVoteText5];
let MockReadVoteImage1 = [...mockReadVoteImage1];
let MockReadVoteImage2 = [...mockReadVoteImage2];
let MockAnswer = [...mockAnswer];
let MockContinueList = {...mockContinueList};
let MockDeadLineList = { ...mockDeadLineList };
console.log(MockUsers);
console.log(MockDeadLineList);

interface UserInfo {
  email?: string;
  password?: string;
  nickname?: string;
}

interface VoteList {
  totalPage?: number;
  currentPage?: number;
  data?: Object[];
}

interface ContinueVoteList {
  topics: {
    category: string;
    title: string;
    author: string;
    closedAt: string;
  };
}

export const handlers = [
  // 이메일 중복 확인
  rest.get<UserInfo>('/api/members/verify_email', (req, res, ctx) => {
    const searchParam = new URLSearchParams(req.url.searchParams);
    const email = searchParam.get('email');
    const existEmail = MockUsers.find((el) => {
      return email === el.email;
    });
    if (email && existEmail) {
      return res(
        ctx.delay(),
        ctx.status(400),
        ctx.json('중복된 이메일 입니다.'),
      );
    } else if (email && !existEmail) {
      return res(
        ctx.delay(),
        ctx.status(200),
        ctx.json('사용가능한 이메일 입니다.'),
      );
    } else {
      return res(ctx.delay(), ctx.status(200), ctx.json('아무것도 안씀!'));
    }
  }),
  // post요청 예시 그냥 써둔거
  rest.post<UserInfo>('/api/members/verify', (req, res, ctx) => {
    const { email, password } = req.body;
    console.log('MSW Post -> req.body : ', req.body);
    console.log(
      'MSW Post -> email, password : ',
      'email: ' + email,
      ', password :' + password,
    );

    return res(ctx.delay(), ctx.status(200), ctx.json(MockUsers));
  }),

  // 닉네임 중복확인
  rest.get<UserInfo>('/api/members/verify_nick', (req, res, ctx) => {
    const searchParam = new URLSearchParams(req.url.searchParams);
    const nick = searchParam.get('nickname');
    const existNick = MockUsers.find((el) => {
      return nick === el.nickname;
    });
    if (nick && existNick) {
      return res(
        ctx.delay(),
        ctx.status(400),
        ctx.json('중복된 닉네임 입니다.'),
      );
    } else if (nick && !existNick) {
      return res(
        ctx.delay(),
        ctx.status(200),
        ctx.json('사용가능한 닉네임 입니다.'),
      );
    }
  }),
  // 회원가입 등록!
  rest.post('/api/members', (req, res, ctx) => {
    let id = MockUsers.length + 1;
    const newUser: any = req.body;
    console.log('MSW 회원등록 post -> req.body : ', req.body);
    console.log('MSW ->회원가입등록  post -> req ', req);
    const result = { id, ...newUser };
    console.log('result : ', result);
    MockUsers.push(result);
    console.log('MockUsers : ', MockUsers);

    return res(ctx.delay(), ctx.status(200), ctx.json(MockUsers));
  }),
  // 로그인 // ctx.set('key', value) -> 응답헤더에 넣어서 보내주는 메서드
  rest.post<UserInfo>('/api/auth/login', (req, res, ctx) => {
    const { email, password } = req.body;
    const findUser = MockUsers.find((user) => {
      return user.email === email;
    });
    if (findUser && findUser.password === password) {
      const accesstoken: any = 'I am Bearer accesstoken.';
      const refreshtoken: any = 'I am refreshtoken';
      const Authorization: any = { accesstoken, refreshtoken };
      console.log('MSW Login post 요청 Authorization : ', Authorization);
      return res(
        ctx.delay(),
        ctx.status(200),
        ctx.json('로그인 성공'),
        ctx.set('Authorization', Authorization),
      );
    } else if (findUser && findUser.password !== password) {
      return res(ctx.delay(), ctx.status(400), ctx.json('비밀번호 불일치.'));
    } else if (!findUser) {
      return res(
        ctx.delay(),
        ctx.status(400),
        ctx.json('존재하지 않는 이메일.'),
      );
    }
  }),
  // Vote 투표 작성 보내기
  rest.post('/api/topics', (req, res, ctx) => {
    const voteData: any = req.body;
    console.log('msw 내부 요청 받았음!');
    console.log('voteData: ', voteData);
    console.log('req', req);

    return res(ctx.delay(), ctx.status(200), ctx.json(MockVote));
  }),
  rest.get<VoteList>('/api/topics/:condition', (req, res, ctx) => {
    const request = req.params;
    console.log('msw 내부 요청 받았음!');
    console.log('request: ', request.condition);
    console.log('req', req);
    if (request.condition === 'all') {
      return res(ctx.delay(), ctx.status(200), ctx.json(MockVoteList));
    } else if (request.condition === 'inProgress') {
      return res(ctx.delay(), ctx.status(200), ctx.json(MockSortedInProgress));
    } else if (request.condition === 'terminate') {
      return res(ctx.delay(), ctx.status(200), ctx.json(MockSortedTerminate));
    } else {
      return;
    }
  }),
  rest.get('/api/topics/:id', (req, res, ctx) => {
    const request = req.params;
    console.log('msw 내부 요청 받았음!');
    console.log('request: ', request.condition);
    console.log('req', req);
    if (request.id === '5') {
      return res(ctx.delay(), ctx.status(200), ctx.json(MockReadVoteImage1));
    } else if (request.id === '1') {
      return res(ctx.delay(), ctx.status(200), ctx.json(MockReadVoteText1));
    } else if (request.id === '2') {
      return res(ctx.delay(), ctx.status(200), ctx.json(MockReadVoteText2));
    } else if (request.id === '3') {
      return res(ctx.delay(), ctx.status(200), ctx.json(MockReadVoteText3));
    } else if (request.id === '4') {
      return res(ctx.delay(), ctx.status(200), ctx.json(MockReadVoteImage2));
    } else if (request.id === '6') {
      return res(ctx.delay(), ctx.status(200), ctx.json(MockReadVoteText4));
    } else {
      return res(ctx.delay(), ctx.status(200), ctx.json(MockReadVoteText5));
    }
  }),
  rest.get('/api/topics/:id/comments', (req, res, ctx) => {
    const request = req.params;
    console.log('msw 내부 요청 받았음!');
    console.log('request: ', request);
    console.log('req', req);
    return res(ctx.delay(), ctx.status(200), ctx.json(MockAnswer));
  }),
  rest.post('/api/topics/:id/comments', (req, res, ctx) => {
    const request: any = req.body;
    console.log('msw 내부 요청 받았음!');
    console.log('request: ', request);
    console.log('req', req);
    return res(ctx.delay(), ctx.status(200), ctx.json(MockAnswer));
  }),
  rest.patch('/api/topics/:id/comments/:commentId', (req, res, ctx) => {
    const request: any = req.body;
    const params = req.params;
    console.log('msw 내부 요청 받았음!');
    console.log('request: ', request, params);
    console.log('req', req);
    return res(ctx.delay(), ctx.status(200), ctx.json(MockAnswer));
  }),
  //메인페이지
  rest.get<ContinueVoteList>(
    '/api/topics?size=6&page=1&filter=progress',
    (req, res, ctx) => {
      const request = req.params;
      // console.log('msw 내부 요청 받았음!');
      // console.log('request: ', request.condition);
      // console.log('req', req);
      return res(ctx.delay(), ctx.status(200), ctx.json(MockContinueList));
    },
  ),
  rest.get(
    '/api/topics?size=4&page=1&filter=imminent',
    (req, res, ctx) => {
      const request = req.params;
      // console.log('msw 내부 요청 받았음!');
      // console.log('request: ', request.condition);
      // console.log('req', req);
      return res(ctx.delay(), ctx.status(200), ctx.json(MockDeadLineList));
    },
  ),
];
