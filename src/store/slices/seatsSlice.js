/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { fetchSeats } from '../thunks/asyncThunks';

const initialState = {
   seatsOptions: { departure: [], arrival: [] },
   loading: false,
   error: null,
   selectedSeats: { departure: [], arrival: [] },
};

const seatsSlice = createSlice({
   name: 'seatsSlice',
   initialState,
   reducers: {
      // addSelectedSeats(state, action) {
      //    const { numbers, direction } = action.payload;
      //    state.selectedSeats[direction] = [...state.selectedSeats[direction], numbers];
      // },
      // removeSelectedSeat(state, action) {
      //    const { number, direction } = action.payload;
      //    state.selectedSeats[direction].filter(item => item!===number)
      // },
   },
   extraReducers: {
      [fetchSeats.pending]: (state) => {
         state.loading = true;
         state.error = null;
      },
      [fetchSeats.fulfilled]: (state, action) => {
         state.loading = false;
         state.error = null;
         const { data, direction } = action.payload;
         state.seatsOptions[direction] = data;
      },
      [fetchSeats.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
   },
});

// export const { setSelectedSeats } = seatsSlice.actions;

export const selectSeatsOptions = (state) => state.seats.seatsOptions;
export const selectSelectedSeats = (state) => state.seats.selectedSeats;
export const selectLoading = (state) => state.seats.loading;
export const selectError = (state) => state.seats.error;

export default seatsSlice;
