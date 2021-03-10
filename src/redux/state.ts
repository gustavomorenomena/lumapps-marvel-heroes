import { Character } from "../models";

export interface State {
  characters: Character[],
  loading: boolean,
  error?: string,
}

export const initialState: State = {
  characters: [],
  loading: false,
}
