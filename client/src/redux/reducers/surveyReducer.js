import { FETCH_SURVEYS } from "../actions/types";

export default function(state = {}, action) {
  //state set to empty and then load request will fetch the data
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
