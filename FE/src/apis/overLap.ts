import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

// export interface UserEmail {
//   email: string;
// }

const emailCheckApi = async (email: string) => {
  console.log('emailCheckApi내부 axios직전 매개변수 : ', email);
  await axios
    .get<any, { email: string }>('/api/members/verify')
    // .get('/api/members/verify',  {email: email})
    .then((res) => {
      console.log('apis->emailCheckApi-> res', res);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export { emailCheckApi };
