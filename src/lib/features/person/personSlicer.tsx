import { getPerson } from '@/app/api/api';
import { Person } from '@/lib/types/People';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type initialState = {
  person: Person;
  loading: boolean;
  error: string | null;
};

const initialState: initialState = {
  person: {} as Person,
  loading: false,
  error: null,
};

export const personInit = createAsyncThunk(
  'person/Fetch',
  async (id: string) => {
    return getPerson(id);
  },
);

export const personSlicer = createSlice({
  name: 'person',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(personInit.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(personInit.fulfilled, (state, action) => {
      state.loading = false;
      state.person = action.payload;
    });
    builder.addCase(personInit.rejected, (state) => {
      state.loading = false;
      state.error = 'Error fetching data';
    });
  },
});

export default personSlicer.reducer;
