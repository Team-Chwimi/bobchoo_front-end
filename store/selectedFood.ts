import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface foodType {
  name: string;
}

const initialState: foodType = {
  name: '김밥',
};

const selectedFood = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setSelectedFood(state, action: PayloadAction<foodType>) {
      state.name = action.payload.name;
    },
  },
});

export const selectedFoodActions = { ...selectedFood.actions };

export default selectedFood;
