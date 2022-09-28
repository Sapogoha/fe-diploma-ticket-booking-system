import { configureStore, combineReducers } from '@reduxjs/toolkit';
import searchSlice from './slices/searchSlice';
import sidebarSelectSlice from './slices/sidebarSelectSlice';

const reducer = combineReducers({
   search: searchSlice.reducer,
   sidebarSelect: sidebarSelectSlice.reducer,
});

const store = configureStore({
   reducer,
});

export default store;
