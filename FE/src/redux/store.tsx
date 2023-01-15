import { configureStore, Reducer, AnyAction, ThunkAction, Action, CombinedState, getDefaultMiddleware } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
// import logger from 'redux-logger';

// import couterSlice, { CounterState } from '../reducers/counterSlice';
// import numberSlice, { NumberState } from '../reducers/numberSlice';

// ### 리듀서 State 타입 정의
export interface ReducerStates {
  // counter: CounterState;
  // number: NumberState;
}

// ### 루트 리듀서 생성
// 1) next-redux-wrapper의 HYDRATE 액션을 정의해주고,
// 2) 슬라이스들을 통합한다.
// next-redux-wrapper의 사용 매뉴얼이므로 그냥 이대로 해주면 알아서 처리된다.
const rootReducer = (state: ReducerStates, action: AnyAction): CombinedState<ReducerStates> => {
  switch (action.type) {
    // next-redux-wrapper의 HYDRATE 액션 처리(그냥 이렇게만 해주면 된다.)
    case HYDRATE:
      return action.payload;

    // 슬라이스 통합
    default: {
      const combinedReducer = combineReducers({
        // counter: couterSlice.reducer,
        // number: numberSlice.reducer
        // [couterSlice.name]: couterSlice.reducer,
        // [numberSlice.name]: numberSlice.reducer
      });
      return combinedReducer(state, action);
    }
  }
};

// ### store 생성 함수
const makeStore = () => {
  // 미들웨어 추가 (필요 없으면 생략)
  const middleware = getDefaultMiddleware();
  // if (process.env.NODE_ENV === 'development') {
  //   middleware.push(logger);
  // }

  // store 생성
  const store = configureStore({
    reducer: rootReducer as Reducer<ReducerStates, AnyAction>, // 리듀서
    middleware, // 미들웨어
    // middleware: [...getDefaultMiddleware(), logger]
    // devTools: process.env.NODE_ENV === 'development' // 개발자도구
  });

  // store 반환
  return store;
};

// ### 타입 익스포트
export type AppStore = ReturnType<typeof makeStore>; // store 타입
export type RootState = ReturnType<typeof rootReducer>; // RootState 타입
// export type RootState = ReturnType<AppStore['getState']>; // RootState 타입(위와 동일함)
export type AppDispatch = AppStore['dispatch']; // dispatch 타입
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>; // Thunk 를 위한 타입

// ### next-redux-wrapper의 wrapper 생성
const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === 'development'
});

// wrapper 익스포트
export default wrapper;