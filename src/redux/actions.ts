export enum ActionTypes {
  SET_LOADING = 'SET_LOADING',
}

const setLoading: (value: boolean) => {type: ActionTypes, payload: boolean} = (value) => ({
  type: ActionTypes.SET_LOADING,
  payload: value,
});

export const StoreActions = {
  setLoading,
}
