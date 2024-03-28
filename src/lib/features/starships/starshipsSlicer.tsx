import { getPersonShips } from '@/app/api/api';
import { Starship } from '@/lib/types/Starships';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  starships: Starship[];
  loading: boolean;
  error: string | null;
};

const initialState: initialStateType = {
  starships: [],
  loading: false,
  error: null,
};

export const starshipsInit = createAsyncThunk('starships/Fetch', async (id: string) => {
  return getPersonShips(id);
});

export const starshipsSlicer = createSlice({
  name: 'starships',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(starshipsInit.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(starshipsInit.fulfilled, (state, action) => {
      state.loading = false;
      state.starships = action.payload;
    });
    builder.addCase(starshipsInit.rejected, (state) => {
      state.loading = false;
      state.error = 'Error fetching data';
    });
  },
});

export default starshipsSlicer.reducer;
