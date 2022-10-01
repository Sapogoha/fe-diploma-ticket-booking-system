import { createAsyncThunk } from '@reduxjs/toolkit';

// eslint-disable-next-line import/prefer-default-export
export const fetchTrainsOptions = createAsyncThunk(
   'trains/fetchTrainsOptions',
   async (url, { rejectWithValue }) => {
      try {
         const response = await fetch(url);
         if (!response.ok) {
            throw new Error();
         }
         const data = await response.json();
         return data;
      } catch (err) {
         return rejectWithValue('Данные о поездах не загрузились');
      }
   }
);
