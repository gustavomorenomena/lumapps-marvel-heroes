import { Character } from "../models";

export enum ActionTypes {
  SET_LOADING = 'SET_LOADING',
  SET_RESULTS = 'SET_RESULTS',
  ADD_CHARACTERS = 'ADD_CHARACTERS',
}

const setLoading: (value: boolean) => {type: ActionTypes, payload: boolean} = (value) => ({
  type: ActionTypes.SET_LOADING,
  payload: value,
});

export interface SetResultsPayload {characters: Character[], total: number}
const setResults: (results: SetResultsPayload) => {type: ActionTypes, payload: SetResultsPayload} = (results) => ({
  type: ActionTypes.SET_RESULTS,
  payload: results
});

const addCharacters: (characters: Character[]) => {type: ActionTypes, payload: Character[]} = (characters) => ({
  type: ActionTypes.ADD_CHARACTERS,
  payload: characters,
})

export const StoreActions = {
  setLoading,
  setResults,
  addCharacters,
}
