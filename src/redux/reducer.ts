import { ActionTypes } from "./actions";
import { State, initialState } from "./state";

export default function (state: State = initialState, action: {type: ActionTypes, payload: any}): State {
  switch(action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
  }
}
