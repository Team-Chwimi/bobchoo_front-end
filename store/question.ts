import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { QuestionState } from '../types/reduxState';
import { QuestionType } from '../types/qestionType';

//* 초기 상태
const initialState: QuestionState = {
  questions: [],
  questionTotalCount: 0,
};

const question = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<QuestionType[]>) {
      state.questions = action.payload;
      return state;
    },
    setQuestionTotal(state, action: PayloadAction<number>) {
      state.questionTotalCount = action.payload;
      return state;
    },
  },
});

export const questionActions = { ...question.actions };

export default question;
