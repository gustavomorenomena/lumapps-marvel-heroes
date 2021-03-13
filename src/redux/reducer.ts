import { Character } from "../models";
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
      const setResultsPayload: SetResultsPayload = action.payload;
      return {
        ...state,
        ...setResultsPayload,
      }
    case ActionTypes.ADD_CHARACTERS:
      const characters: Character[] = action.payload;
      return {
        ...state,
        characters: [...state.characters, ...characters]
      }
    default:
      return state;
  }
}
