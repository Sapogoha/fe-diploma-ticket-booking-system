/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   options: {
      firstClass: '',
      secondClass: '',
      thirdClass: '',
      fourthClass: '',
      wifi: '',
      express: '',
   },
   prices: { min: 0, max: null },
   time: {
      to: {
         departure: { min: 0, max: 24 * 60 },
         return: { min: 0, max: 24 * 60 },
      },
      back: {
         departure: { min: 0, max: 24 * 60 },
         return: { min: 0, max: 24 * 60 },
      },
   },
};

const sidebarSelectSlice = createSlice({
   name: 'sidebarSelectSlice',
   initialState,
   reducers: {
      changeOptionsFields(state, action) {
         const { name, value } = action.payload;
         state.options[name] = value;
      },
      changePriceFields(state, action) {
         state.prices.min = action.payload[0];
         state.prices.max = action.payload[1];
      },
      changeTimeFields(state, action) {
         const { name, direction, value } = action.payload;
         state.time[name][direction] = { min: value[0], max: value[1] };
      },
   },
   extraReducers: {},
});

export const { changeOptionsFields, changePriceFields, changeTimeFields } =
   sidebarSelectSlice.actions;

export const selectOptions = (state) => state.sidebarSelect.options;
export const selectPrices = (state) => state.sidebarSelect.prices;
export const selectTime = (state) => state.sidebarSelect.time;

export default sidebarSelectSlice;
