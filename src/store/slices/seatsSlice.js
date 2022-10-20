/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { fetchSeats } from '../thunks/asyncThunks';

const initialState = {
   seatsOptions: { departure: [], arrival: [] },
   loading: false,
   error: null,
   selectedSeats: {
      departure: [],
      arrival: [],
   },
};

const seatsSlice = createSlice({
   name: 'seatsSlice',
   initialState,
   reducers: {
      addSelectedSeats(state, action) {
         const { number, direction, coachId, price, priceCoefficient } =
            action.payload;
         const ids = state.selectedSeats[direction].map((el) => el.coachId);
         const sameId = ids.indexOf(coachId);

         if (sameId !== -1) {
            state.selectedSeats[direction][sameId].seats = [
               ...state.selectedSeats[direction][sameId].seats,
               { seat: number, price, priceCoefficient },
            ];
         } else {
            state.selectedSeats[direction] = [
               ...state.selectedSeats[direction],
               { coachId, seats: [{ seat: number, price, priceCoefficient }] },
            ];
         }
      },
      removeSelectedSeat(state, action) {
         const { number, direction, coachId } = action.payload;
         state.selectedSeats[direction].forEach((el) => {
            if (el.coachId === coachId) {
               el.seats = el.seats.filter((item) => item.seat !== number);
            }
         });
      },
      removeAllSelectedSeatsFromCoach(state, action) {
         const { direction, coachId } = action.payload;
         state.selectedSeats[direction] = state.selectedSeats[direction].filter(
            (el) => el.coachId !== coachId
         );
      },

      clearSeatsSlice() {
         return initialState;
      },
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

export const {
   addSelectedSeats,
   removeSelectedSeat,
   removeAllSelectedSeatsFromCoach,
   clearSeatsSlice,
} = seatsSlice.actions;

export const selectSeatsOptions = (state) => state.seats.seatsOptions;
export const selectSelectedSeats = (state) => state.seats.selectedSeats;
export const selectLoading = (state) => state.seats.loading;
export const selectError = (state) => state.seats.error;

export default seatsSlice;
