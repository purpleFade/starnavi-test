'use client';

import { getId } from '@/app/api/api';
import { Person } from '@/lib/types/People';
import Link from 'next/link';
import React from 'react';

type Props = {
  character: Person;
};

const PersonCard: React.FC<Props> = ({ character }) => {
  const personId = getId(character.url);

  return (
    <ul className='w-72 mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-md'>
      <Link
        className='block p-4 text-center hover:bg-blue-200 transform transition duration-300 ease-in-out'
        href={`/people/${personId}`}
      >
        <p className='text-xl font-semibold text-gray-800'>{character.name}</p>
      </Link>
    </ul>
  );
};

export default PersonCard;
