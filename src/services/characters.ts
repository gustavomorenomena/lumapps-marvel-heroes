import { Character } from '../models';
import { Api } from './api';

let currentSearchTerm: string;

export const CharactersService = {
  find: (searchTerm: string, offset: number = 0): Promise<{
    count: number,
    limit: number,
    offset: number,
    results: Character[],
    total: number
  }> => {
    currentSearchTerm = searchTerm;
    return Api.get('/characters', {
      params: {
        limit: 4,
        nameStartsWith: currentSearchTerm,
        offset: offset
      }
    }).then((response: any) => {
      if ( ! response.data ) {
        return Promise.reject('BAD_REQUEST');
      }
      return Promise.resolve(response.data);
    });
  },
  fetchMoreResults: (offset: number): Promise<Character[]> => {
    if ( ! currentSearchTerm ) {
      return Promise.resolve([]);
    }

    return CharactersService.find(currentSearchTerm, offset).then(result => {
      if ( ! result || ! result.results ) {
        return Promise.resolve([]);
      }

      return Promise.resolve(result.results);
    });
  }
}
