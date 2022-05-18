import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { responseMultiState } from '../types/reduxState';

const initialState: responseMultiState = {
  foodList : []
};

// const initialState: foodType = {
//   name: '김밥',
// };

const selectedFoodList = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setSelectedFood(state, action: PayloadAction<responseMultiState>) {
      state.foodList = action.payload.foodList;
    },
  },
});

export const selectedFoodListActions = { ...selectedFoodList.actions };

export default selectedFoodList;
