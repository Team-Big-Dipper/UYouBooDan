import { rest } from 'msw';
import { mockUsers } from './data';

let MockUsers = [...mockUsers];
console.log(MockUsers);
// interface UserInfoResponse {
//   email: string;
//   password: string;
//   nickName: string;
// }

export const handlers = [
  // 이메일 중복 확인
  rest.get('/api/members/verify', (req, res, ctx) => {
    const request = req.body;
    console.log('msw 내부 요청 받았음!');
    console.log('request: ', request);
    console.log('req', req);

    return res(ctx.delay(), ctx.status(200), ctx.json(MockUsers));
  }),
  //
];
