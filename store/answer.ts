import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEAFULT_LOCATION } from '../data/location';
import { AnswerState } from '../types/reduxState';
import { AnswerType } from '../types/answerType';

const initialState: AnswerState = {
  lat: DEAFULT_LOCATION.lat,
  lng: DEAFULT_LOCATION.lng,
  answerList: [],
};

const answer = createSlice({ 
  name: 'answer', 
  initialState,  
  reducers: {
    setAnswer(state, action: PayloadAction<AnswerState>) {
      state.lat = action.payload.lat,
      state.lng = action.payload.lng,
      state.answerList = action.payload.answerList
    },
  }}
  );

export const answerActions = {...answer.actions};

export default answer;