import { setRevalidateHeaders } from 'next/dist/server/send-payload';
import voteInstance from '../voteInstance';

interface continueData {
  topicId: number;
  category: string;
  title: string;
  nickName: string;
  createdAt: string;
  closedAt: string;
}

interface props {
  size: number;
  filter: string;
  setDatas: React.Dispatch<React.SetStateAction<continueData[]>>;
}

export const getMain = ({size, filter,setDatas}:props) => {
  const result = voteInstance
    .get(`/topics?size=${size}&page=1&filter=${filter}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': 'any',
      },
    })
    .then((res: any) => {
      if (res.status === 200) {
        setDatas(res.data.data)
        return res.data;
      }
    })
    .catch((err: any) => {
      console.log(err);
      return 'Err';
    });
  return result;
};