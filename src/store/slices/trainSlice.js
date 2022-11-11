/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   selectedIndex: null,
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
      departure: [],
      arrival: [],
   },
};

const trainSlice = createSlice({
   name: 'trainSlice',
   initialState,
   reducers: {
      setIndex(state, action) {
         state.selectedIndex = action.payload;
      },
      setTrains(state, action) {
         const { value, direction } = action.payload;
         state.trains[direction] = value;
      },

      removeTrainInfo() {
         return initialState;
      },
      setSelectedClass(state, action) {
         const { name, value, direction } = action.payload;
         state.selectedClasses[direction][name] = value;
      },
      removeSelectedClasses(state) {
         state.selectedClasses = initialState.selectedClasses;
      },
      setSelectedCoach(state, action) {
         const { name, direction, coachId } = action.payload;
         state.selectedCoaches[direction] = [
            ...state.selectedCoaches[direction],
            { coachId, name },
         ];
      },
      removeSelectedCoach(state, action) {
         const { direction, coachId } = action.payload;
         state.selectedCoaches[direction] = state.selectedCoaches[
            direction
         ].filter((el) => el.coachId !== coachId);
      },
      removeAllSelectedCoaches(state, action) {
         state.selectedCoaches[action.payload] = [];
      },
   },
   extraReducers: {},
});

export const {
   setIndex,
   setTrains,
   removeTrainInfo,
   setSelectedClass,
   removeSelectedClasses,
   setSelectedCoach,
   removeSelectedCoach,
   removeAllSelectedCoaches,
} = trainSlice.actions;

export const selectIndex = (state) => state.train.selectedIndex;
export const selectTrains = (state) => state.train.trains;
export const selectSelectedClasses = (state) => state.train.selectedClasses;
export const selectSelectedCoaches = (state) => state.train.selectedCoaches;

export default trainSlice;
