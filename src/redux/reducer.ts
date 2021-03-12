import { ActionTypes, SetResultsPayload } from "./actions";
import { State, initialState } from "./state";

export default function (state: State = initialState, action: {type: ActionTypes, payload: any}): State {
  switch(action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case ActionTypes.SET_RESULTS:
      const payload: SetResultsPayload = action.payload;
      return {
        ...state,
        ...payload,
      }
    default:
      return state;
  }
}
