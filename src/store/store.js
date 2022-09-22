import { configureStore, combineReducers } from '@reduxjs/toolkit';
import searchSlice from './slices/searchSlice';

const reducer = combineReducers({
   search: searchSlice.reducer,
});

const store = configureStore({
   reducer,
});

export default store;
