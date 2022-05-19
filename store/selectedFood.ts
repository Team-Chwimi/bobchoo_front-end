import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { responseOneState } from '../types/reduxState';

const initialState: responseOneState = {
  foodName: "",
  foodImg: ""
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
