import { createStore, Store, applyMiddleware } from "@reduxjs/toolkit";
import { HTMLPageState, rootReducer } from "../Reducers/WebPageReducer";
import thunk from "redux-thunk";

export interface IAppState {
  readonly HTMLPageState: HTMLPageState;
}

export function configureStore(): Store<IAppState> {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}
