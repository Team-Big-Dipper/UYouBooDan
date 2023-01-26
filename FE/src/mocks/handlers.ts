import { AxiosRequestConfig } from 'axios';
import { PathParams, rest, RestRequest } from 'msw';
import { mockUsers, mockVote } from './data';

let MockUsers = [...mockUsers];
let MockVote = [...mockVote];

console.log(MockUsers);
console.log(MockVote);
interface UserInfo {
  email?: string;
  password?: string;
  nickname?: string;
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
      return nick === el.nickName;
    });
    if (nick && existNick) {
      return res(
        ctx.delay(),
        ctx.status(200),
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
  // Vote 투표 작성 보내기
  rest.post('/api/topics', (req, res, ctx) => {
    const request = req.body;
    console.log('msw 내부 요청 받았음!');
    console.log('request: ', request);
    console.log('req', req);

    return res(ctx.delay(), ctx.status(200), ctx.json(MockVote));
  }),
];
