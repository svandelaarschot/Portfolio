import { createStore, Store, applyMiddleware } from "@reduxjs/toolkit";
import { HTMLPageState } from "../Reducers/WebPageReducer";
import thunk from "redux-thunk";
import { rootReducer } from "../Root/RootReducers";
import { HeaderState } from "../Reducers/HeaderReducer";

export interface IAppState {
  readonly HTMLPageState: HTMLPageState;
  readonly HeaderState: HeaderState;
}

export function configureStore(): Store<IAppState> {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}
