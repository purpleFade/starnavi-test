'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import * as peopleActions from '@/lib/features/people/peopleSlicer';
import React, { useEffect } from 'react';

const PaginationControl = () => {
  const dispatch = useAppDispatch();
  const { results, next, previous, totalItems } = useAppSelector(
    (state) => state.people,
  );

  useEffect(() => {
    dispatch(peopleActions.peopleInit(page));
  }, [dispatch]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const page: string = searchParams.get('page') ?? '1';
  const per_page = 10;

  const paginationNumber = [];

  for (let i = 1; i <= Math.ceil(totalItems / per_page); i++) {
    paginationNumber.push(i);
  }

  return (
    <div className='flex items-center'>
      <button
        onClick={() => {
          router.push(`?page=${Number(page) - 1}`);
          dispatch(peopleActions.previousPage());
        }}
        disabled={previous === null}
        className='px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-300 disabled:opacity-50 active:bg-gray-400'
      >
        Previous
      </button>
      {paginationNumber.map((number) => (
        <button
          key={number}
          onClick={() => {
            router.push(`?page=${number}`);
            dispatch(peopleActions.setCurrentPage(number));
          }}
          className={`px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-300 ml-2 ${
            Number(page) === number ? 'bg-gray-400' : ''
          } active:bg-gray-500`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => {
          router.push(`?page=${Number(page) + 1}`);
          dispatch(peopleActions.nextPage());
        }}
        disabled={next === null}
        className='px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-300 ml-2 disabled:opacity-50 active:bg-gray-400'
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControl;
