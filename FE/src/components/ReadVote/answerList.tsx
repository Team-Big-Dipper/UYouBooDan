import React, { useState, useCallback, useMemo, useEffect } from 'react';
import AnswerInput from './answerInput';
import AnswerCard from './answerCard';
import * as S from './style';
import axios from 'axios';

interface Props {
  id: number;
  like: number;
  created_at: string;
  username: string;
  status: string;
  content: string;
}
const AnswerList = ({ id }: any) => {
  let answercount = 11;
  let answerTotalPage = 6;
  const [data, setData] = useState<Props[]>();
  const page = Array.from({ length: answerTotalPage }, (_, i) => i + 1);
  const [pageNum, setPageNum] = useState(1);
  const handleAnsPageNum = useCallback((e: any) => {
    let num = Number(e.target.textContent);
    setPageNum(num);
  }, []);

  useEffect(() => {
    axios.get(`/api/topics/${String(id)}/comments`).then((res) => {
      try {
        setData(res.data);
      } catch (e) {
        console.log(e);
      }
    });
  }, [id]);
  return (
    <S.AnswerListContainer>
      <S.AnswerHeader>댓글 ({answercount})</S.AnswerHeader>
      <AnswerInput id={id} setData={setData} />
      <>
        {data?.map((el, idx) => (
          <AnswerCard
            key={el.id}
            id={el.id}
            index={idx}
            like={el.like}
            createdAt={el.created_at}
            username={el.username}
            content={el.content}
            status={el.status}
          />
        ))}
      </>
      <S.AnswerPageBtns>
        {page.map((el, idx) => {
          return (
            <S.AnswerPage key={idx} onClick={handleAnsPageNum}>
              {el}
            </S.AnswerPage>
          );
        })}
      </S.AnswerPageBtns>
    </S.AnswerListContainer>
  );
};

export default AnswerList;
