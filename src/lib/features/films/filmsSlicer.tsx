import { getPersonFilms } from '@/app/api/api';
import { Film } from '@/lib/types/Movies';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  films: Film[];
  loading: boolean;
  error: string | null;
};

const initialState: initialStateType = {
  films: [],
  loading: false,
  error: null,
};

export const filmsInit = createAsyncThunk('films/Fetch', async (id: string) => {
  return getPersonFilms(id);
});

export const filmsSLicer = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(filmsInit.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(filmsInit.fulfilled, (state, action) => {
      state.loading = false;
      state.films = action.payload;
    });
    builder.addCase(filmsInit.rejected, (state) => {
      state.loading = false;
      state.error = 'Error fetching data';
    });
  },
});

export default filmsSLicer.reducer;
