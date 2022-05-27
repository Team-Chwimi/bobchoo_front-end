import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WarningType {
  type: string;
}

const initialState: WarningType = {
  type: '',
};

const warningType = createSlice({
  name: 'warningType',
  initialState,
  reducers: {
    setWarningType(state, action: PayloadAction<WarningType>) {
      state.type = action.payload.type;
    },
  },
});

export const warningTypeActions = { ...warningType.actions };

export default warningType;
