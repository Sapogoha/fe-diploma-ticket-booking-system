/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import fieldNames from '../../components/PassengersSelection/PassengerCard/fieldNames';

const initialState = {
   passengers: [],
};

const passengersSlice = createSlice({
   name: 'passengersSlice',
   initialState,
   reducers: {
      addNewPassenger(state, action) {
         state.passengers = [
            ...state.passengers.filter((pas) => pas.id !== action.payload.id),
            action.payload,
         ];
      },
      editPassengerData(state, action) {
         const ids = state.passengers.map((el) => el.id);
         const sameId = ids.indexOf(action.payload.id);

         if (sameId !== -1) {
            Object.keys(action.payload).forEach(
               // eslint-disable-next-line no-return-assign
               (key, ind) =>
                  (state.passengers[sameId][key] = Object.values(
                     action.payload
                  )[ind])
            );
         }
      },
      removeSeatInfo(state) {
         const deleteSeatInfo = (pas) => {
            delete pas[fieldNames.seatDep];
            delete pas[fieldNames.seatArr];
            delete pas[fieldNames.depOnly];
         };

         state.passengers.map((pas) => deleteSeatInfo(pas));
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

export const {
   addNewPassenger,
   editPassengerData,
   removePassenger,
   removeAllPassengers,
   removeSeatInfo,
} = passengersSlice.actions;

export const selectPassengers = (state) => state.passengers.passengers;

export default passengersSlice;
