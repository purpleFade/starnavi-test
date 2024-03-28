import { Films } from '@/lib/types/Movies';
import { client } from './fetchClient';
import { People, Person } from '@/lib/types/People';
import { Starships } from '@/lib/types/Starships';

export const BASE_URL = 'https://sw-api.starnavi.io';

export const getPeople = (page?: string) => {
  return client.get<People>(`/people/?page=${page}`);
};

export const getPerson = (id: string) => {
  return client.get<Person>(`/people/${id}`);
};

export const getPersonFilms = async (id: string) => {
  const response = client.get<Films>(`/films/?characters__contains=${id}`);

  const films = (await response).results;
  const personFilms = films.filter((film) => film.characters.includes(+id));

  return personFilms;
};

export const getPersonShips = async (id: string) => {
  const response = client.get<Starships>(`/starships/?pilots__contains=${id}`);

  const ships = (await response).results;
  const personShips = ships.filter((ship) => ship.pilots.includes(+id));

  return personShips;
};

export const getId = (url: string) => {
  const match = url.match(/\d+/);
  let id = '';

  if (match) {
    id = match[0].toString();
  }

  return id;
};
