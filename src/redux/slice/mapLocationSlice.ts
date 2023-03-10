import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMap } from '../../@type/components';
import { IFormCreateOrUpdateLocation } from '../../@type/page';

import userApi from '@/services/user.api';
import mapLocationApi from '@/services/map-location.api';

const initialState: IInitialStateMapLocation = {
  centerPosition: { lat: 0, lng: 0 },
  userPosition: { lat: 0, lng: 0 },
  friendsNearUser: [],
  friendInfo: null,
  friendProfile: null,
  zoomLevel: 16,
};

export const createOrUpdateLocation = createAsyncThunk(
  'createOrUpdateLocation',
  async (requestOption: IFormCreateOrUpdateLocation) => {
    return await mapLocationApi.createOrUpdateLocation(requestOption);
  },
);
export const getFriendNearUser = createAsyncThunk(
  'getFriendNearUser',
  async () => {
    return await mapLocationApi.getFriendNearUser();
  },
);
export const getLastLocation = createAsyncThunk('getLastLocation', async () => {
  return await mapLocationApi.getLastLocation();
});

export const getFriendProfle = createAsyncThunk(
  'getFriendProfle',
  async (id: string) => {
    return await userApi.getFriendProfle(id);
  },
);

export const mapLocationSlice = createSlice({
  name: 'mapLocation',
  initialState: initialState,
  reducers: {
    updateCenterPosition(state, action: PayloadAction<IMap>) {
      state.centerPosition = { ...action.payload };
    },
    updateUserPosition(state, action: PayloadAction<IMap>) {
      state.userPosition = { ...action.payload };
    },
    updateFriendInfo(state, action: PayloadAction<IGetFriendNearUser>) {
      state.friendInfo = { ...action.payload };
    },
    updateZoomLevel(state, action: PayloadAction<number>) {
      state.zoomLevel = action.payload;
    },
    updateFriendsNearUser(state, action: any) {
      state.friendsNearUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      // createOrUpdateLocation
      createOrUpdateLocation.fulfilled,
      (state: IInitialStateMapLocation, action: any) => {
        if (action.payload.status) {
          const { data } = action.payload;
          state.userPosition = {
            lat: data.latitude,
            lng: data.longtitude,
          };
          state.centerPosition = state.userPosition;
        }
      },
    );
    builder.addCase(
      // getFriendNearUser
      getFriendNearUser.fulfilled,
      (state: IInitialStateMapLocation, action: any) => {
        if (action.payload.status) {
          state.friendsNearUser = action.payload.data;
          state.friendInfo = action.payload.data[0];
        }
      },
    );
    builder.addCase(
      // getLastLocation
      getLastLocation.fulfilled,
      (state: IInitialStateMapLocation, action: any) => {
        if (action.payload.status) {
          const { data } = action.payload;
          state.userPosition = {
            lat: data.latitude,
            lng: data.longtitude,
          };
        }
      },
    );
    builder.addCase(
      // getFriendNearUser
      getFriendProfle.fulfilled,
      (state: IInitialStateMapLocation, action: any) => {
        if (action.payload.status) {
          state.friendProfile = action.payload.data;
        }
      },
    );
  },
});
const { reducer, actions } = mapLocationSlice;
export const {
  updateFriendInfo,
  updateCenterPosition,
  updateUserPosition,
  updateZoomLevel,
  updateFriendsNearUser,
} = actions;
export default reducer;
