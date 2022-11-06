import { configureStore, combineReducers } from '@reduxjs/toolkit';
import searchSlice from './slices/searchSlice';
import sidebarSelectSlice from './slices/sidebarSelectSlice';
import trainsSlice from './slices/trainsSlice';
import sortSlice from './slices/sortSlice';
import trainSlice from './slices/trainSlice';
import seatsSlice from './slices/seatsSlice';
import numOfpassengersSlice from './slices/numOfpassengersSlice';
import passengersSlice from './slices/passengersSlice';

const reducer = combineReducers({
   search: searchSlice.reducer,
   sidebarSelect: sidebarSelectSlice.reducer,
   trains: trainsSlice.reducer,
   sort: sortSlice.reducer,
   train: trainSlice.reducer,
   seats: seatsSlice.reducer,
   numOfPassengers: numOfpassengersSlice.reducer,
   passengers: passengersSlice.reducer,
});

const store = configureStore({
   reducer,
});

export default store;
