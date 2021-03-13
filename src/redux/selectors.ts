import { State } from "./state";

const selectLoading = (state: State) => state.loading;

const selectCharacters = (state: State) => state.characters;

const selectTotal = (state: State) => state.total;

const selectError = (state: State) => state.error;

export const StoreSelectors = {
  selectLoading,
  selectTotal,
  selectCharacters,
  selectError,
};
