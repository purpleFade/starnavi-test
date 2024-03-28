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
    <div className=''>
      <BackButton />
      <div className='h-screen w-screen flex items-center justify-center'>
        <FlowComponent nodes={updatedNodes} edges={initialEdges} />
      </div>
    </div>
  );
};

export default PersonPage;
