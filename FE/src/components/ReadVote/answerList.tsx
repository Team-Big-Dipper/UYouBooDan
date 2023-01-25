import React, { useState, useCallback, useMemo } from 'react';
import AnswerInput from './answerInput';
import AnswerCard from './answerCard';
import * as S from './style';
const AnswerList = () => {
  let answercount = 11;
  let answerTotalPage = 6;
  const page = Array.from({ length: answerTotalPage }, (_, i) => i + 1);
  const [pageNum, setPageNum] = useState(1);
  const handleAnsPageNum = useCallback((e: any) => {
    let num = Number(e.target.textContent);
    setPageNum(num);
  }, []);
  const textMargin = useMemo((): any => {
    return {
      marginBottom: '1rem',
    };
  }, []);
  let answerdata = [
    {
      id: 1,
      like: 20,
      created_at: '20230101',
      username: 'DAMONG',
      content:
        '반짝이는 피고, 품에 오직 하는 보는 기관과 약동하다. 긴지라 어디 아니더면, 지혜는 너의 유소년에게서 것은 일월과 사막이다. 생의 우리 그것은 그리하였는가? 가슴이 같이, 이상 피부가 찾아 그리하였는가? 실현에 수 그들의 인도하겠다는 위하여서. 가진 새 청춘의 위하여, 없는 현저하게 원대하고, 인간의 철환하였는가?',
    },
    {
      id: 2,
      like: 25,
      created_at: '20230104',
      username: 'DAMONG',
      content:
        '반짝이는 피고, 품에 오직 하는 보는 기관과 약동하다. 긴지라 어디 아니더면, 지혜는 너의 유소년에게서 것은 일월과 사막이다. 생의 우리 그것은 그리하였는가? 가슴이 같이, 이상 피부가 찾아 그리하였는가? 실현에 수 그들의 인도하겠다는 위하여서. 가진 새 청춘의 위하여, 없는 현저하게 원대하고, 인간의 철환하였는가?',
    },
    {
      id: 3,
      like: 20,
      created_at: '20230105',
      username: 'DAMONG',
      content:
        '반짝이는 피고, 품에 오직 하는 보는 기관과 약동하다. 긴지라 어디 아니더면, 지혜는 너의 유소년에게서 것은 일월과 사막이다. 생의 우리 그것은 그리하였는가? 가슴이 같이, 이상 피부가 찾아 그리하였는가? 실현에 수 그들의 인도하겠다는 위하여서. 가진 새 청춘의 위하여, 없는 현저하게 원대하고, 인간의 철환하였는가?',
    },
    {
      id: 4,
      like: 8,
      created_at: '20230110',
      username: 'DAMONG',
      content:
        '반짝이는 피고, 품에 오직 하는 보는 기관과 약동하다. 긴지라 어디 아니더면, 지혜는 너의 유소년에게서 것은 일월과 사막이다. 생의 우리 그것은 그리하였는가? 가슴이 같이, 이상 피부가 찾아 그리하였는가? 실현에 수 그들의 인도하겠다는 위하여서. 가진 새 청춘의 위하여, 없는 현저하게 원대하고, 인간의 철환하였는가?',
    },
    {
      id: 5,
      like: 11,
      created_at: '20230112',
      username: 'DAMONG',
      content:
        '반짝이는 피고, 품에 오직 하는 보는 기관과 약동하다. 긴지라 어디 아니더면, 지혜는 너의 유소년에게서 것은 일월과 사막이다. 생의 우리 그것은 그리하였는가? 가슴이 같이, 이상 피부가 찾아 그리하였는가? 실현에 수 그들의 인도하겠다는 위하여서. 가진 새 청춘의 위하여, 없는 현저하게 원대하고, 인간의 철환하였는가?',
    },
  ];
  return (
    <div>
      <p style={textMargin}>댓글({answercount})</p>
      <AnswerInput />
      <>
        {answerdata.map((el, idx) => (
          <AnswerCard
            key={el.id}
            id={el.id}
            index={idx}
            like={el.like}
            createdAt={el.created_at}
            username={el.username}
            content={el.content}
          />
        ))}
      </>
      <S.AnswerPageBtns>
        {page.map((el) => {
          return <S.AnswerPage onClick={handleAnsPageNum}>{el}</S.AnswerPage>;
        })}
      </S.AnswerPageBtns>
    </div>
  );
};

export default AnswerList;
