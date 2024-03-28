import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from '@/lib/features/people/peopleSlicer';
import filmsReducer from '@/lib/features/films/filmsSlicer';
import starshipsReducer from '@/lib/features/starships/starshipsSlicer';
import personReducer from '@/lib/features/person/personSlicer';

export const makeStore = () => {
  return configureStore({
    reducer: {
      people: peopleReducer,
      person: personReducer,
      films: filmsReducer,
      starships: starshipsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
