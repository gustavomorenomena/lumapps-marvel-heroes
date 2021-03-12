import { Character } from "../models";

export interface State {
  characters: Character[],
  loading: boolean,
  error?: string,
  total: number,
}

export const initialState: State = {
  characters: [],
  loading: false,
  total: 0,
}
