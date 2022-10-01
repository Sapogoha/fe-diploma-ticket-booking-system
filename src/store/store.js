import { configureStore, combineReducers } from '@reduxjs/toolkit';
import searchSlice from './slices/searchSlice';
import sidebarSelectSlice from './slices/sidebarSelectSlice';
import trainsSlice from './slices/trainsSlice';
import sortSlice from './slices/sortSlice';

const reducer = combineReducers({
   search: searchSlice.reducer,
   sidebarSelect: sidebarSelectSlice.reducer,
   trains: trainsSlice.reducer,
   sort: sortSlice.reducer,
});

const store = configureStore({
   reducer,
});

export default store;
