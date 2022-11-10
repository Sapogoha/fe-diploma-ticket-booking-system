/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   lastName: null,
   firstName: null,
   fathersName: null,
   phone: null,
   email: null,
   paymentMethod: null,
};

const personalDataSlice = createSlice({
   name: 'personalDataSlice',
   initialState,
   reducers: {
      addPersonalData(state, action) {
         const {
            lastName,
            firstName,
            fathersName,
            phone,
            email,
            paymentMethod,
         } = action.payload;

         state.lastName = lastName;
         state.firstName = firstName;
         state.fathersName = fathersName;
         state.phone = phone;
         state.email = email;
         state.paymentMethod = paymentMethod;
      },
      removePersonalData() {
         return initialState;
      },
   },
   extraReducers: {},
});

export const { addPersonalData, removePersonalData } =
   personalDataSlice.actions;

export const selectPersonalData = (state) => state.personalData;

export default personalDataSlice;
