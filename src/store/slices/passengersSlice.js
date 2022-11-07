/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   passengers: [],
};

const passengersSlice = createSlice({
   name: 'passengersSlice',
   initialState,
   reducers: {
      addNewPassenger(state, action) {
         state.passengers = [...state.passengers, action.payload];
      },
      removePassenger(state, action) {
         state.passengers = state.passengers.filter(
            (item) => item.id !== action.payload
         );
      },
      removeAllPassengers(state) {
         state.passengers = initialState.passengers;
      },
   },
   extraReducers: {},
});

export const { addNewPassenger, removePassenger, removeAllPassengers } =
   passengersSlice.actions;

export const selectPassengers = (state) => state.passengers.passengers;

export default passengersSlice;
