import { Character } from "../models";

export enum ActionTypes {
  SET_LOADING = 'SET_LOADING',
  SET_RESULTS = 'SET_RESULTS',
}

const setLoading: (value: boolean) => {type: ActionTypes, payload: boolean} = (value) => ({
  type: ActionTypes.SET_LOADING,
  payload: value,
});
export interface SetResultsPayload {characters: Character[], total: number}
const setResults: (results: SetResultsPayload) => {type: ActionTypes, payload: SetResultsPayload} = (results) => ({
  type: ActionTypes.SET_RESULTS,
  payload: results
})

export const StoreActions = {
  setLoading,
  setResults,
}
