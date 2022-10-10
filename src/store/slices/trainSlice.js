/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   trains: {
      departure: null,
      arrival: null,
   },
   selectedClasses: {
      departure: {
         first: false,
         second: false,
         third: false,
         fourth: false,
      },
      arrival: {
         first: false,
         second: false,
         third: false,
         fourth: false,
      },
   },
   selectedCoaches: {
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
         state.selectedClasses[direction][name] = value;
      },
      removeSelectedClasses(state) {
         state.selectedClasses = initialState.selectedClasses;
      },
      setSelectedCoaches(state, action) {
         const { name, direction } = action.payload;
         state.selectedCoaches[direction] = name;
      },
      toggleSelectedCoaches(state, action) {
         const { name, direction } = action.payload;
         state.selectedCoaches[direction] =
            state.selectedCoaches[direction] === name ? null : name;
      },
      removeSelectedCoaches(state, action) {
         state.selectedCoaches[action.payload] = null;
      },
   },
   extraReducers: {},
});

export const {
   setTrains,
   removeTrainInfo,
   setSelectedClasses,
   removeSelectedClasses,
   setSelectedCoaches,
   toggleSelectedCoaches,
   removeSelectedCoaches,
} = trainSlice.actions;

export const selectTrains = (state) => state.train.trains;
export const selectSelectedClasses = (state) => state.train.selectedClasses;
export const selectSelectedCoaches = (state) => state.train.selectedCoaches;

export default trainSlice;
