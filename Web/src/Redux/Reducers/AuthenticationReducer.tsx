import { Action, Reducer } from "@reduxjs/toolkit";

// Source: https://www.carlrippon.com/strongly-typed-react-redux-code-with-typescript/

export interface AuthenticationItem {
  isAuth: boolean;
  username?: string;
}

export interface AuthenticationState {
  authenticationItem: AuthenticationItem;
}

const initialState: AuthenticationState = {
  authenticationItem: {
    isAuth: false,
    username: ""
  }
};

export interface UpdateAuthenticationAction
  extends Action<"UPDATE_AUTHENTICATION"> {
  authenticationItem: AuthenticationItem;
}
export interface GetAuthenticationAction extends Action<"GET_AUTHENTICATION"> {}

export type AuthenticationActions =
  | UpdateAuthenticationAction
  | GetAuthenticationAction;

export const authenticationReducer: Reducer<
  AuthenticationState,
  AuthenticationActions
> = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_AUTHENTICATION":
      return {
        ...state,
        authenticationItem: action.authenticationItem
      };
    case "GET_AUTHENTICATION":
      return {
        ...state
      };
    default:
      return state;
  }
};
