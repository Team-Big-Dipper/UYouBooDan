import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as S from './style';
import { TabPanel, useTabs } from 'react-headless-tabs';
import { TabSelector } from '../../components/CreateVote/TabSelector';

//datepicker
import dayjs, { Dayjs } from 'dayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { isPrefixUnaryExpression } from 'typescript';
import { containerClasses } from '@mui/material';

enum CategoryEnum {
  a = 'a',
  b = 'b',
  c = 'c',
}
enum VoteRuleEnum {
  단일투표 = '단일 투표',
  중복투표 = '중복 투표',
}
interface Inputs {
  category: CategoryEnum;
  questionTitle: String;
  questionContent: String;
  voteRule: VoteRuleEnum;
  answerInput1: String;
  answerInput2: String;
}

function createvote() {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  //questionTitle value
  const [qTitlevalue, setQTitleValue] = useState('');
  const handleTitleChange = (e: any) => {
    setQTitleValue(e.target.value);
  };
  // questionTitle 지우는 버튼
  const clearQuestionTitle = () => {
    setQTitleValue('');
  };

  //questionContent value
  const [subContentValue, setSubContentValue] = useState('');
  const handleSubContentChange = (e: any) => {
    setSubContentValue(e.target.value);
  };

  //추가 설명 이미지
  //추가 설명 이미지 미리볼 url 저장해두는 state
  const [contentFileImage, setContentFileImage] = useState('');
  //콘텐츠 이미지 저장해두는 state
  const [contentsImg, setContentsImg] = useState('');
  //추가 설명 이미지 파일 저장
  const changeContentImg = async (e: any) => {
    e.preventDefault();
    setContentFileImage(URL.createObjectURL(e.target.files[0]));
    if (e.target.files) {
      const [file] = e.target.files;
      const options = {
        maxSizeMB: 0.2,
        useWebWorker: true,
      };
      console.log('압축시작');
      // const compressFile = await imageCompression(file, options);
      // const contentFile: File[] = new File([compressFile], "contentImage.JPG");

      // setContentsImg([contentFile]);
      // if (contentsImg) {
      //   setContentsImg([...contentsImg, contentFile]);
      //   }
    }
  };
  //추가 설명 이미지 파일 삭제
  const deletedetailFileImage = (e: any) => {
    e.preventDefault();
    URL.revokeObjectURL(contentFileImage);
    setContentFileImage('');
    setContentsImg('');
  };

  //tab select
  const [selectedTab, setSelectedTab] = useTabs(['글투표', '이미지투표']);
  const [answerValue1, setAnswerValue1] = useState('');
  const handleAnswer1Change = (e: any) => {
    setAnswerValue1(e.target.value);
  };
  const [answerValue2, setAnswerValue2] = useState('');
  const handleAnswer2Change = (e: any) => {
    setAnswerValue2(e.target.value);
  };
  // if(typeof window === 'undefined'){
  //   return null
  // }
  // let container: HTMLElement = document.getElementById('inputContainer')!
  // let inputCount: number = 2;
  // const handleAddInput = () => {
  //   inputCount++;
  //   let input = document.createElement('input');
  //   input.placeholder = '답을 입력해주세요.';
  //   container.appendChild(input);
  // }

  //datepicker
  const [dateWithInitialValue, setDateWithInitialValue] =
    React.useState<Dayjs | null>(dayjs(new Date()));

  return (
    <S.CreateContainer>
      <S.Path>홈 &gt; 나만의 투표 만들기</S.Path>
      <S.Title>#나만의 투표 만들기</S.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 카테고리 */}
        <S.CategoryTitle>
          카테고리<span>*</span>
        </S.CategoryTitle>
        <S.Select {...register('category')}>
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="c">c</option>
        </S.Select>
        <S.Hr />

        {/* 질문 */}
        <S.CategoryTitle>
          질문을 입력해주세요<span>*</span>
        </S.CategoryTitle>
        <S.InputWrapper>
          <S.Input
            {...register('questionTitle', { required: true, maxLength: 20 })}
            type="text"
            placeholder="질문을 입력해주세요."
            value={qTitlevalue}
            onChange={handleTitleChange}
          />
          <S.BtnClear onClick={clearQuestionTitle}>x</S.BtnClear>
        </S.InputWrapper>
        <S.QuestionTitleLength>
          {qTitlevalue.length}&nbsp;/&nbsp;<span>200</span>
        </S.QuestionTitleLength>
        <S.SubQuestion>
          <S.SubTitle>추가설명이 필요하다면 적어주세요.</S.SubTitle>
          <S.ContentInput
            {...register('questionContent', {
              required: false,
              maxLength: 200,
            })}
            placeholder="추가설명을 입력해주세요."
            value={subContentValue}
            onChange={handleSubContentChange}
          />
          <S.QuestionTitleLength>
            {subContentValue.length}&nbsp;/&nbsp;<span>2000</span>
          </S.QuestionTitleLength>
          <S.SubTitle>
            이미지 첨부&nbsp;
            <span>
              (추가 설명으로 이미지 첨부가 필요하다면 파일을 업로드해주세요.)
            </span>
          </S.SubTitle>
          <S.SumContainer>
            {contentFileImage && (
              <S.ContentImg alt="detailImg" src={contentFileImage} />
            )}
            <S.UploadDelete>
              <S.ImgLabel htmlFor="detailImage">
                <div className="noImg">{contentsImg === '' ? '+' : ''}</div>
              </S.ImgLabel>
              <S.SumnailUpload
                name="detailImg"
                id="detailImage"
                type="file"
                accept="image/*"
                onChange={changeContentImg}
              />
              {contentsImg === '' ? (
                ''
              ) : (
                <S.DeleteSumnaeil onClick={(e) => deletedetailFileImage(e)}>
                  삭제
                </S.DeleteSumnaeil>
              )}
            </S.UploadDelete>
          </S.SumContainer>
        </S.SubQuestion>
        <S.Hr />
        {/* 투표지 */}
        <S.VoteTitle>
          질문에 대한 답을 적는 곳이에요
          <br />글 또는 이미지로 작성할 수 있어요.
        </S.VoteTitle>
        <S.Nav>
          <TabSelector
            isActive={selectedTab === '글투표'}
            onClick={() => setSelectedTab('글투표')}
          >
            글투표
          </TabSelector>
          <TabSelector
            isActive={selectedTab === '이미지투표'}
            onClick={() => setSelectedTab('이미지투표')}
          >
            이미지투표
          </TabSelector>
        </S.Nav>
        <S.TabHr />
        <div className="p-4">
          <TabPanel hidden={selectedTab !== '글투표'}>
            <S.TabWarning>
              질문에 대한 답을 글로 작성해주세요. &nbsp;<span>*</span>&nbsp;최대
              6개까지 가능합니다.
            </S.TabWarning>
            <S.InputWrapper>
              <S.Input
                {...register('answerInput1', { required: true, maxLength: 20 })}
                type="text"
                placeholder="답을 입력해주세요."
                value={answerValue1}
                onChange={handleAnswer1Change}
              />
              <S.BtnClear onClick={clearQuestionTitle}>x</S.BtnClear>
            </S.InputWrapper>
            <S.InputWrapper>
              <S.Input
                {...register('answerInput2', { required: true, maxLength: 20 })}
                type="text"
                placeholder="답을 입력해주세요."
                value={answerValue2}
                onChange={handleAnswer2Change}
              />
              <S.BtnClear onClick={clearQuestionTitle}>x</S.BtnClear>
            </S.InputWrapper>
            {/* <S.InputWrapper>
              <S.Input id="inputContainer" />
              <S.BtnClear onClick={clearQuestionTitle}>x</S.BtnClear>
            </S.InputWrapper>
            <S.PlusInput>
              <div onClick={handleAddInput}>+</div>
            </S.PlusInput> */}
          </TabPanel>
          <TabPanel hidden={selectedTab !== '이미지투표'}>
            이미지투표란입니다.
          </TabPanel>
        </div>

        {/* 단일투표/ 중복투표 */}
        <S.CategoryTitle>
          단일투표와 중복투표 여부를 선택해주세요.<span>*</span>
        </S.CategoryTitle>
        <S.Radio>
          <div>
            <input type="radio" value="단일 투표" {...register('voteRule')} />
            단일 투표
          </div>
          <div>
            <input type="radio" value="중복 투표" {...register('voteRule')} />
            중복 투표
          </div>
        </S.Radio>

        {/* 투표 종료 날짜, 시간 */}
        <S.CategoryTitle>
          투표종료 날짜, 시간을 선택해주세요.<span>*</span>
        </S.CategoryTitle>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
         <MobileDateTimePicker
          value={dateWithInitialValue}
          onChange={(newValue: any) => {
            setDateWithInitialValue(newValue);
          }}
          onError={console.log}
          minDate={dayjs(new Date())}
          inputFormat="YYYY/MM/DD hh:mm a"
          mask="____/__/__ __:__ _M"
          renderInput={(params: any) => <TextField {...params} />}
          />
          </LocalizationProvider> */}
        <S.Warning>
          <div>
            <span>*</span>
            투표가 진행이되면 게시글을 수정할 수 없습니다.
          </div>
          <div>
            단, 투표가 진행되기 전에는 질문 / 추가설명 / 마감기간만 수정할 수
            있습니다.
          </div>
        </S.Warning>
        <S.Btns>
          <S.Cancle>취소하기</S.Cancle>
          <S.Submit>등록하기</S.Submit>
        </S.Btns>
      </form>
    </S.CreateContainer>
  );
}

export default createvote;
