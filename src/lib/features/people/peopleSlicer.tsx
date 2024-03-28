import { getPeople } from '@/app/api/api';
import { Person } from '@/lib/types/People';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface initialState {
  totalItems: number;
  next: string | null;
  previous: string | null;
  results: Person[];
  loading: boolean;
  error: string | null;
  currentPage: number;
}

const initialState: initialState = {
  totalItems: 0,
  next: null,
  previous: null,
  results: [],
  loading: false,
  error: null,
  currentPage: 1,
};

export const peopleInit = createAsyncThunk(
  'people/Fetch',
  async (page: string) => {
    return getPeople(page);
  },
);

const peopleSlicer = createSlice({
  name: 'people',
  initialState,
  reducers: {
    nextPage: (state) => {
      if (state.next !== null) {
        peopleInit((state.currentPage + 1).toString());
      }
    },
    previousPage: (state) => {
      if (state.next !== null) {
        peopleInit((state.currentPage - 1).toString());
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(peopleInit.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(peopleInit.fulfilled, (state, action) => {
      state.loading = false;
      state.totalItems = action.payload.count;
      state.next = action.payload.next;
      state.previous = action.payload.previous;
      state.results = action.payload.results;
    });
    builder.addCase(peopleInit.rejected, (state) => {
      state.loading = false;
      state.error = 'Error fetching data';
    });
  },
});

export const { nextPage, previousPage, setCurrentPage } = peopleSlicer.actions;
export default peopleSlicer.reducer;
