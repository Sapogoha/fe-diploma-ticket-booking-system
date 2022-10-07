import { configureStore, combineReducers } from '@reduxjs/toolkit';
import searchSlice from './slices/searchSlice';
import sidebarSelectSlice from './slices/sidebarSelectSlice';
import trainsSlice from './slices/trainsSlice';
import sortSlice from './slices/sortSlice';
import trainSlice from './slices/trainSlice';

const reducer = combineReducers({
   search: searchSlice.reducer,
   sidebarSelect: sidebarSelectSlice.reducer,
   trains: trainsSlice.reducer,
   sort: sortSlice.reducer,
   train: trainSlice.reducer,
});

const store = configureStore({
   reducer,
});

export default store;
