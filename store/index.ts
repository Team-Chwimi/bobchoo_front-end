import { HYDRATE, createWrapper, MakeStore } from 'next-redux-wrapper';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';

import latlng from './latlng';
import selectedFood from './selectedFood';
import question from './question';
import answer from './answer';
import selectedFoodList from './selectedFoodList';
import requestType from './requestType';
import warningType from './warning';

const rootReducer = combineReducers({
  latlng: latlng.reducer,
  selectedFood: selectedFood.reducer,
  question: question.reducer,
  answer: answer.reducer,
  selectedFoodList: selectedFoodList.reducer,
  requestType: requestType.reducer,
  warningType: warningType.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      return {
        ...state,
        ...action.payload,
      };
    }
    return state;
  }
  return rootReducer(state, action);
};

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: any = () => {
  const store = configureStore({
    reducer,
    devTools: true,
  });
  initialRootState = store.getState();
  return store;
};

export const wrapper = createWrapper(initStore);
