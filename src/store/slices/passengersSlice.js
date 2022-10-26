/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   numberOfPassengers: {
      departure: { adults: 0, children: 0, toddlers: 0 },
      arrival: { adults: 0, children: 0, toddlers: 0 },
   },
   maxNumOfAdults: 5,
   maxNumOfChildren: { departure: null, arrival: null },
   maxNumOfToddlers: { departure: null, arrival: null },
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
         const { direction, value } = action.payload;
         state.maxNumOfChildren[direction] = value;
      },
      setMaxNumOfToddlers(state, action) {
         const { direction, value } = action.payload;
         state.maxNumOfToddlers[direction] = value;
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
