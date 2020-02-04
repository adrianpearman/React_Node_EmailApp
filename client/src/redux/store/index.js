import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "../reducers";

const composeEnhancers = composeWithDevTools({});

const middleWares = [thunk];

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleWares))
);

export default store;
