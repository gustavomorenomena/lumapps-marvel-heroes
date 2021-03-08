import { Character } from '../models';
import { Api } from './api';

export const CharactersService = {
  find: (searchTerm: string): Promise<{
    count: number,
    limit: number,
    offset: number,
    results: Character[],
    total: number
  }> => {
    return Api.get('/characters', {
      params: {
        limit: 4,
        nameStartsWith: searchTerm
      }
    }).then((response: any) => {
      if ( ! response || response.code !== 200 || ! response.data ) {
        return Promise.reject('BAD_REQUEST');
      }
      return Promise.resolve(response.data);
    });
  }
}
