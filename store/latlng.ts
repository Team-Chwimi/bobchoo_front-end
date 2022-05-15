import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LatLngState } from '../types/reduxState';

import { DEAFULT_LOCATION } from '../data/location';

interface CheckLocationType {
  hasCheckedLocation: boolean;
}

const initialState: LatLngState & CheckLocationType = {
  lat: DEAFULT_LOCATION.lat,
  lng: DEAFULT_LOCATION.lng,
  hasCurrentLoaction: false,
  hasCheckedLocation: false,
};

const latlng = createSlice({
  name: 'latlng',
  initialState,
  reducers: {
    setLatLng(state, action: PayloadAction<LatLngState>) {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.hasCurrentLoaction = true;
    },
    setHasCheckedLocation(state, action: PayloadAction<CheckLocationType>) {
      state.hasCheckedLocation = true;
    },
  },
});

export const latlngActions = { ...latlng.actions };

export default latlng;
