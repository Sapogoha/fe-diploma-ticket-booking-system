/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   numberOfPassengers: {
      departure: { adults: 0, children: 0, toddlers: 0 },
      arrival: { adults: 0, children: 0, toddlers: 0 },
   },
   maxNumOfAdults: 5,
   maxNumOfChildren: null,
   maxNumOfToddlers: null,
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
      setMaxNumOfChildren(state, action) {
         state.maxNumOfChildren = action.payload;
      },
      setMaxNumOfToddlers(state, action) {
         state.maxNumOfToddlers = action.payload;
      },
   },
   extraReducers: {},
});

export const {
   setNumOfPassengers,
   removeNumOfAllPassengers,
   removeNumOfPassengersDirection,
   setMaxNumOfChildren,
   setMaxNumOfToddlers,
} = passengersSlice.actions;

export const selectNumberOfPassengers = (state) =>
   state.passengers.numberOfPassengers;
export const selectMaxNumOfAdults = (state) => state.passengers.maxNumOfAdults;
export const selectMaxNumOfChildren = (state) =>
   state.passengers.maxNumOfChildren;
export const selectMaxNumOfToddlers = (state) =>
   state.passengers.maxNumOfToddlers;

export default passengersSlice;
