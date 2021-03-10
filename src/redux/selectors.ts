import { State } from "./state";

const selectLoading = (state: State) => state.loading;

export const StoreSelectors = {
  selectLoading,
};
