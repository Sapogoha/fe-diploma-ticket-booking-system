/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   departureCity: '',
   arrivalCity: '',
   departureDate: '',
   returnDate: '',
};

const searchSlice = createSlice({
   name: 'searchSlice',
   initialState,
   reducers: {
      changeSearchFields(state, action) {
         const { name, value } = action.payload;
         state[name] = value;
      },
      swapValues(state) {
         const departure = state.departureCity;
         state.departureCity = state.arrivalCity;
         state.arrivalCity = departure;
      },
   },
   extraReducers: {},
});

export const { changeSearchFields, swapValues } = searchSlice.actions;

export const selectDepartureCity = (state) => state.search.departureCity;
export const selectArrivalCity = (state) => state.search.arrivalCity;
export const selectDepartureDate = (state) => state.search.departureDate;
export const selectReturnDate = (state) => state.search.returnDate;

export default searchSlice;
