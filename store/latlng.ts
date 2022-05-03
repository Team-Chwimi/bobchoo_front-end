import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LatLngState } from '../types/reduxState';

const initialState: LatLngState = {
  lat: 37.5662952,
  lng: 126.9779451,
  setLocated: false,
};

const latlng = createSlice({
  name: 'latlng',
  initialState,
  reducers: {
    setLatLng(state, action: PayloadAction<LatLngState>) {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.setLocated = true;
    },
  },
});

export const latlngActions = { ...latlng.actions };

export default latlng;
