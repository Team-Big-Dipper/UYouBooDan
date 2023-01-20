import { rest } from 'msw';
import { mockUsers } from './data';

let MockUsers = [...mockUsers];
console.log(MockUsers);
export interface UserInfoResponse {
  email: string;
  password: string;
  nickName: string;
}

export const handlers = [
  // 모든 유저 조회
  rest.get<UserInfoResponse>('/api/members/verify', (req, res, ctx) => {
    console.log('msw 내부 요청 받았음!');
    return res(ctx.delay(), ctx.status(200), ctx.json(MockUsers));
  }),
  //
];
