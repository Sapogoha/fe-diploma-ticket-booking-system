/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   trains: {
      departure: null,
      arrival: null,
   },
   selectedClasses: {
      departure: {
         firstClass: false,
         secondClass: false,
         thirdClass: false,
         fourthClass: false,
      },
      arrival: {
         firstClass: false,
         secondClass: false,
         thirdClass: false,
         fourthClass: false,
      },
   },
   selectedCouches: {
      departure: null,
      arrival: null,
   },
};

const trainSlice = createSlice({
   name: 'trainSlice',
   initialState,
   reducers: {
      setTrains(state, action) {
         const { value, direction } = action.payload;
         state.trains[direction] = value;
      },

      removeTrainInfo() {
         return initialState;
      },
      setSelectedClasses(state, action) {
         const { name, value, direction } = action.payload;
         state.selectedClasses[direction][`${name}Class`] = value;
      },
      setSelectedCouches(state, action) {
         const { name, direction } = action.payload;
         state.selectedCouches[direction] =
            state.selectedCouches[direction] === name ? null : name;
      },
      removeSelectedCouches(state, action) {
         state.selectedCouches[action.payload] = null;
      },
   },
   extraReducers: {},
});

export const {
   setTrains,
   removeTrainInfo,
   setSelectedClasses,
   setSelectedCouches,
   removeSelectedCouches,
} = trainSlice.actions;

export const selectTrains = (state) => state.train.trains;
export const selectSelectedClasses = (state) => state.train.selectedClasses;
export const selectSelectedCouches = (state) => state.train.selectedCouches;

export default trainSlice;
