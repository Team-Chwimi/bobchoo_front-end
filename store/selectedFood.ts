import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { responseOneState } from '../types/reduxState';

const initialState: responseOneState = {
  foodName: "",
  foodImg: ""
};

// const initialState: foodType = {
//   name: '김밥',
// };

const selectedFood = createSlice({
  name: 'food',
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
