import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RequestType {
  type: string;
}

const initialState: RequestType = {
  type: '',
};

const requestType = createSlice({
  name: 'requestType',
  initialState,
  reducers: {
    setRequestType(state, action: PayloadAction<RequestType>) {
      state.type = action.payload.type;
    },
  },
});

export const requestTypeActions = { ...requestType.actions };

export default requestType;
