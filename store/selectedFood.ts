import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { responseOneState } from '../types/reduxState';

const initialState: responseOneState = {
  foodName: "경양식돈까스",
  foodImg: "https://firebasestorage.googleapis.com/v0/b/bobchoo-f5928.appspot.com/o/%EA%B2%BD%EC%96%91%EC%8B%9D%EB%8F%88%EA%B9%8C%EC%8A%A4.jpg?alt=media&token=e327d6dc-ef55-4a8c-84f2-bfdf0a901273"
};

const selectedFood = createSlice({
  name: 'selectedFood',
  initialState,
  reducers: {
    setSelectedFood(state, action: PayloadAction<responseOneState>) {
      state.foodName = action.payload.foodName;
      state.foodImg = action.payload.foodImg;
    },
  },
});

export const selectedFoodActions = { ...selectedFood.actions };

export default selectedFood;
