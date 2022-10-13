/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   numberOfPassengers: {
      departure: { adults: 0, children: 0, toddlers: 0 },
      arrival: { adults: 0, children: 0, toddlers: 0 },
   },
};

const passengersSlice = createSlice({
   name: 'passengersSlice',
   initialState,
   reducers: {
      setNumOfPassengers(state, action) {
         const { category, direction, value } = action.payload;
         state.numberOfPassengers[direction][category] = value;
      },
      removeNumOfPassengersDirection(state, action) {
         state.numberOfPassengers[action.payload] =
            initialState.numberOfPassengers[action.payload];
      },
      removeNumOfAllPassengers() {
         return initialState;
      },
   },
   extraReducers: {},
});

export const {
   setNumOfPassengers,
   removeNumOfAllPassengers,
   removeNumOfPassengersDirection,
} = passengersSlice.actions;

export const selectNumberOfPassengers = (state) =>
   state.passengers.numberOfPassengers;

export default passengersSlice;
