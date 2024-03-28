/* eslint-disable no-param-reassign */
import { getId } from '@/app/api/api';
import { Film } from '../types/Movies';
import { Person } from '../types/People';
import { Starship } from '../types/Starships';
import { Position } from '../types/node';

const position = { x: 0, y: 0 };
const atributes = {
  position,
  type: 'custom',
  targetPosition: Position.Top,
  sourcePosition: Position.Bottom,
};

// function create nodes for a hero, their films, and their starships.
export function createNodes(
  hero: Person,
  films: Film[],
  starships: Starship[],
) {
  const nodes = [
    {
      id: hero.name,
      data: { category: 'person', name: hero.name },
      ...atributes,
    },
    ...films.flatMap((film) => {
      const filmNode = {
        id: `film${film.title}`,
        data: { category: 'film', name: film.title },
        ...atributes,
      };

      const filmStarships = starships.filter((starship) =>
        film.starships.includes(+getId(starship.url)),
      );

      const starshipNodes = filmStarships.map((starship, starshipIndex) => ({
        id: `starship${film.title}-${starshipIndex}`,
        data: { category: 'starship', name: starship.name },
        ...atributes,
      }));

      return [filmNode, ...starshipNodes];
    }),
  ];

  return nodes;
}
