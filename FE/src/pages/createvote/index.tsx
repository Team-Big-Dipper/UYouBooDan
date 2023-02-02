import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Controller,
  useForm,
  SubmitHandler,
  useFieldArray,
} from 'react-hook-form';
import * as S from './style';
import { TabPanel, useTabs } from 'react-headless-tabs';
import { TabSelector } from '../../components/CreateVote/TabSelector';
import { createData } from '../../redux/slices/createVoteSlice';
import axios, { AxiosResponse, AxiosError } from 'axios';

//datepicker

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';

export interface topicVoteItem {
    topicVoteItemName : string;
  }
export interface Inputs {
  category: String;
  title: String;
  content?: String;
  topicVoteItems: topicVoteItem[];
  closedAt: String;
}

function createvote() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [sumbmitData, setSubmitData] = useState<Inputs>();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      topicVoteItems: [{ topicVoteItemName: '' }],
    },
  });
  //cancle
  const onHandleCancle = () => {
    if (confirm('정말 취소하시겠습니까?')) {
      router.push('/');
    } else {
      console.log();
    }
  };
  //submit
  const onHandleSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('data : ', data);
    setSubmitData(data);
  };
  useEffect(() => {
    axios
      .post('/api/topics', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          // 'ngrok-skip-browser-warning': 'any',
          Authorization: `${localStorage.getItem("Authorization")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res: AxiosResponse) => {
        console.log('요청 성공!', res);
      })
      .catch((err: AxiosError) => {
        console.log('요청 실패!', err.message);
      });
    // const response = await axios.post('http://localhost:3000/api/topics');
    // console.log(response)
    //   return response.data;
    dispatch(createData(sumbmitData));
  }, []);

  //category
  const [categoryMsg, setCategoryMsg] = useState<string>('');
  useEffect(() => {
    if (watch().category === '' || errors.category?.message) {
      setCategoryMsg('카테고리를 선택해주세요.');
    } else {
      setCategoryMsg('');
    }
  }, [watch('category')]);

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
  const { fields, append, remove } = useFieldArray({
    control,
    name: `topicVoteItems`,
  });

  const addInput = (e: any) => {
    e.preventDefault();
    if (fields.length < 6) {
      append({ topicVoteItemName: '' });
    } else {
      alert('최대 6개까지 가능합니다!');
    }
  };
  const deleteInput = (idx: number, e: any) => {
    if (fields.length < 2) {
      alert('최소 1개이상의 답이 필요합니다!');
    } else {
      remove(idx);
    }
  };

  //datepicker
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [deadLineMsg, setDeadLineMsg] = useState<string>('');
  useEffect(() => {
    if (startDate === new Date() || errors.closedAt?.message) {
      setDeadLineMsg('마감일자를 선택해주세요.');
    } else {
      setDeadLineMsg('');
    }
  }, [watch('closedAt')]);

  return (
    <S.CreateContainer>
      <S.Path>홈 &gt; 나만의 투표 만들기</S.Path>
      <S.Title>#나만의 투표 만들기</S.Title>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        {/* 카테고리 */}
        <S.CategoryTitle>
          카테고리<span>*</span>
        </S.CategoryTitle>

        <S.Select
          defaultValue=""
          {...register(`category`, {
            required: '카테고리를 선택해주세요.',
          })}
        >
          <option value="" disabled hidden>
            ==선택==
          </option>

          <option value="음식">음식</option>
          <option value="패션뷰티">패션/뷰티</option>
          <option value="쇼핑">쇼핑</option>
          <option value="반려동물">반려동물</option>
          <option value="취미운동">취미/운동</option>
          <option value="일반">일반</option>
        </S.Select>
        {(watch('category') && errors.category?.message && categoryMsg) ||
        categoryMsg === '카테고리를 선택해주세요.' ? (
          <S.CategoryErrorMessage>{categoryMsg}</S.CategoryErrorMessage>
        ) : (
          <S.CategoryErrorMessage>{categoryMsg}</S.CategoryErrorMessage>
        )}

        <S.Hr />

        {/* 질문 */}
        <S.CategoryTitle>
          질문을 입력해주세요<span>*</span>
        </S.CategoryTitle>
        <S.InputWrapper>
          <S.Input
            {...register('title', { required: true, maxLength: 20 })}
            type="text"
            name="title"
            placeholder="질문을 입력해주세요."
            value={qTitlevalue}
            onChange={handleTitleChange}
          />
          <S.BtnClear onClick={clearQuestionTitle}> x</S.BtnClear>
        </S.InputWrapper>
        <S.ErrorLength>
          {qTitlevalue === '' ? (
            <S.ErrorMessage>질문을 입력해주세요!</S.ErrorMessage>
          ) : (
            ''
          )}
          <S.QuestionTitleLength>
            {qTitlevalue.length}&nbsp;/&nbsp;<span>200</span>
          </S.QuestionTitleLength>
        </S.ErrorLength>
        <S.SubQuestion>
          <S.SubTitle>추가설명이 필요하다면 적어주세요.</S.SubTitle>
          <S.ContentInput
            {...register('content', {
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
            {fields.map((field, idx) => (
              <S.InputWrapper key={field.id}>
                <S.AnswerInput
                  key={field.id}
                  placeholder="답을 입력해주세요."
                  {...register(`topicVoteItems.${idx}.topicVoteItemName`, {
                    required: true,
                  })}
                />
                {/* <S.DeleteInput onClick={()=>deleteInput}>x</S.DeleteInput> */}
              </S.InputWrapper>
            ))}
            <S.PlusInput onClick={addInput}>
              <div>+</div>
            </S.PlusInput>
          </TabPanel>
          <TabPanel hidden={selectedTab !== '이미지투표'}>
            이미지투표란입니다.
          </TabPanel>
        </div>

        {/* 단일투표/ 중복투표 */}
        {/* <S.CategoryTitle>
          단일투표와 중복투표 여부를 선택해주세요.<span>*</span>
        </S.CategoryTitle> */}
        {/* <S.Radio>
          <div>
            <input
              type="radio"
              value="단일 투표"
              {...register('voteRule')}
              defaultChecked
            />
            단일 투표
          </div>
          <div>
            <input type="radio" value="중복 투표" {...register('voteRule')} />
            중복 투표
          </div>
        </S.Radio> */}

        {/* 투표 종료 날짜, 시간 */}
        <S.CategoryTitle>
          투표종료 날짜, 시간을 선택해주세요.<span>*</span>
        </S.CategoryTitle>
        <Controller
          control={control}
          name="closedAt"
          render={({ field: { onChange, value } }) => (
            <S.StyledDatePicker
              {...register('closedAt', {
                required: true,
              })}
              selected={startDate}
              onChange={(date: Date) => {
                const day = date
                  .toISOString()
                  .replace('T', ' ')
                  .replace(/\..*/, '');
                setStartDate(date);
                onChange(day);
                setIsOpen(!isOpen);
              }}
              timeInputLabel="Time:"
              dateFormat="yyyy-MM-dd hh:mm aa"
              showTimeInput
              minDate={new Date()}
              placeholderText="종료 날짜 및 시간을 선택해주세요."
            />
          )}
        />
        {(watch('closedAt') && errors.closedAt?.message && deadLineMsg) ||
        deadLineMsg === '마감일자를 선택해주세요.' ? (
          <S.CategoryErrorMessage>{deadLineMsg}</S.CategoryErrorMessage>
        ) : (
          <S.CategoryErrorMessage>{deadLineMsg}</S.CategoryErrorMessage>
        )}
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
          <S.Cancle onClick={onHandleCancle}>취소하기</S.Cancle>
          <S.Submit type="submit" disabled={isSubmitting}>
            등록하기
          </S.Submit>
        </S.Btns>
      </form>
    </S.CreateContainer>
  );
}

export default createvote;
