import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { responseMultiState } from '../types/reduxState';

const initialState: responseMultiState = {
  foodList: [],
};

const selectedFoodList = createSlice({
  name: 'foodList',
  initialState,
  reducers: {
    setSelectedFoodList(state, action: PayloadAction<responseMultiState>) {
      state.foodList = action.payload.foodList;
    },
  },
});

export const selectedFoodListActions = { ...selectedFoodList.actions };

export default selectedFoodList;
