'use client';

import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import * as filmsActions from '@/lib/features/films/filmsSlicer';
import * as starshipsActions from '@/lib/features/starships/starshipsSlicer';
import * as personActions from '@/lib/features/person/personSlicer';
import FlowComponent from '@/components/FlowComponent/FlowComponent';
import { createNodes } from '@/lib/utils/createNodes';
import { createEdges } from '@/lib/utils/createEdges';
import { generateNodePositions } from '@/lib/utils/generateNodePositions';
import BackButton from '@/components/BackButton/BackButton';

type Props = {
  params: { id: string };
  searchParams?: { page: string; search: string };
};

const placeholder = {
  name: 'Obi-Wan Kenobi',
  height: '182',
  mass: '77',
  hair_color: 'auburn, white',
  skin_color: 'fair',
  eye_color: 'blue-gray',
  birth_year: '57BBY',
  gender: 'male',
  homeworld: '20',
  films: [1, 2, 3, 4, 5, 6],
  species: [1],
  vehicles: [38],
  starships: [48, 59, 64, 65, 74],
  created: '2014-12-10T16:16:29.192000Z',
  edited: '2014-12-20T21:17:50.325000Z',
  url: 'https://sw-api.starnavi.io/people/10/',
};

const PersonPage: React.FC<Props> = ({ params, searchParams }) => {
  const dispatch = useAppDispatch();
  const { films } = useAppSelector((state) => state.films);
  const { starships } = useAppSelector((state) => state.starships);
  const { person } = useAppSelector((state) => state.person);
  const { id } = params;

  useEffect(() => {
    dispatch(personActions.personInit(id));
    dispatch(filmsActions.filmsInit(id));
    dispatch(starshipsActions.starshipsInit(id));

    console.log(films, starships, person);
  }, [id]);

  const { initialEdges, updatedNodes } = useMemo(() => {
    const initialNodes = createNodes(person, films, starships);
    const initialEdges = createEdges(person, films, starships);
    const updatedNodes = generateNodePositions(initialNodes);

    return { initialEdges, updatedNodes };
  }, [person, films, starships]);

  return (
    <div className='bg-gray-100'>
      <BackButton />
      <div className='h-screen w-screen flex items-center justify-center'>
        <FlowComponent nodes={updatedNodes} edges={initialEdges} />
      </div>
    </div>
  );
};

export default PersonPage;
