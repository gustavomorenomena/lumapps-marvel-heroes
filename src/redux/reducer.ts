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
        error: undefined,
        loading: false,
      }
    case ActionTypes.ADD_CHARACTERS:
      if ( ! state.characters ) {
        return state;
      }

      const characters: Character[] = action.payload;
      return {
        ...state,
        characters: [...state.characters, ...characters],
        error: undefined,
        loading: false,
      }
    case ActionTypes.SET_ERROR:
      const error: string | undefined = action.payload;
      return {
        ...state,
        error
      }
    default:
      return state;
  }
}
