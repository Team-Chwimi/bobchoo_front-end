import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { LatLngType } from '../types/Map';
import { LatLngState } from '../types/reduxState';

const initialState: LatLngState = {
  lat: '',
  lng: '',
};

const latlng = createSlice({
  name: 'latlng',
  initialState,
  reducers: {
    setLat(state, action: PayloadAction<string>) {
      state.lat = action.payload;
    },
    setLng(state, action: PayloadAction<string>) {
      state.lng = action.payload;
    },
    // setLatLng(state, action: PayloadAction<LatLngType>) {
    //   const { lat, lng } = action.payload;
    //   return state;
    // },
  },
});

export const latlngActions = { ...latlng.actions };

export default latlng;
