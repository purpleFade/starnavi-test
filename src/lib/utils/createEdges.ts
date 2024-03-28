import { getId } from '@/app/api/api';
import { Film } from '../types/Movies';
import { Person } from '../types/People';
import { EdgeType } from '../types/node';
import { Starship } from '../types/Starships';

export function createEdges(
  person: Person,
  films: Film[],
  starships: Starship[],
) {
  const edges: EdgeType[] = [];

  films.forEach((film) => {
    edges.push({
      id: `${person.name}-film${film.title}`,
      source: person.name,
      target: `film${film.title}`,
      type: 'straight',
      style: {
        stroke: '#3b0764',
      },
    });
  });

  films.forEach((film) => {
    const filmStarships = starships.filter((starship) =>
      film.starships.includes(+getId(starship.url)),
    );

    filmStarships.forEach((starship, starshipIndex) => {
      edges.push({
        id: `film${film.title}-starship${starshipIndex}`,
        source: `film${film.title}`,
        target: `starship${film.title}-${starshipIndex}`,
        type: 'straight',
        style: {
          stroke: '#3b0764',
        },
      });
    });
  });

  return edges;
}
