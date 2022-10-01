/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   limit: 5,
   sort: { label: 'времени', value: 'date' },
   offset: 0,
};

const sortSlice = createSlice({
   name: 'sortSlice',
   initialState,
   reducers: {
      changeLimit(state, action) {
         state.limit = action.payload;
      },
      changeSort(state, action) {
         state.sort = action.payload;
      },
      changeOffset(state, action) {
         state.offset = action.payload;
      },
   },
   extraReducers: {},
});

export const { changeLimit, changeSort, changeOffset } = sortSlice.actions;

export const selectLimit = (state) => state.sort.limit;
export const selectSort = (state) => state.sort.sort;
export const selectOffset = (state) => state.sort.offset;

export default sortSlice;
