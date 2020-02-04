import { FETCH_USER } from "../actions/types";

// this will verify if the user is logged in
// using null as the first argument will cause the action to return nothing at first
export default function(state = null, action) {
  // console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
