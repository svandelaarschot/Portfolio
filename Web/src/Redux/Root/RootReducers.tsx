import { combineReducers } from "@reduxjs/toolkit";
import { IAppState } from "../Store/Store";
import { headerReducer } from "../Reducers/HeaderReducer";
import { webPagereducer } from "../Reducers/WebPageReducer";
import { authenticationReducer } from "../Reducers/AuthenticationReducer";

export const rootReducer = combineReducers<IAppState>({
  HTMLPageState: webPagereducer,
  HeaderState: headerReducer,
  AuthenticationState: authenticationReducer
});
