import { Api } from './api';

export const CharactersService = {
  find: (): Promise<any> => {
    return Api.get('/characters');
  }
}
