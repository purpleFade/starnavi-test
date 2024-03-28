'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import * as peopleActions from '@/lib/features/people/peopleSlicer';
import PersonCard from '../PersonCard/PersonCard';
import { useSearchParams } from 'next/navigation';
import PaginationControl from '../PaginationControl/PaginationControl';

const Table = () => {
  const dispatch = useAppDispatch();
  const { results } = useAppSelector((state) => state.people);

  const page: string = useSearchParams().get('page') ?? '1';

  useEffect(() => {
    dispatch(peopleActions.peopleInit(page));
  }, [dispatch, page]);

  return (
    <div className='flex items-center justify-center h-screen flex-col gap-5'>
      <div className='grid grid-cols-2 gap-4'>
        {results.map((character) => (
          <PersonCard key={character.name} character={character} />
        ))}
      </div>
      <PaginationControl />
    </div>
  );
};

export default Table;
