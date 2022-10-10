import { createAsyncThunk } from '@reduxjs/toolkit';

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

export const fetchSeats = createAsyncThunk(
   'seats/fetchSeats',
   async ({ url, direction }, { rejectWithValue }) => {
      try {
         const response = await fetch(url);

         if (!response.ok) {
            throw new Error();
         }
         const data = await response.json();

         return { data, direction };
      } catch (err) {
         return rejectWithValue('Данные о наличии мест не загрузились');
      }
   }
);
