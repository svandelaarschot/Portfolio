import { Action, Reducer } from "@reduxjs/toolkit";
import { HTMLPage } from "src/Backend/Classes/HTMLPage";
import { Map } from "immutable";

// Source: https://www.carlrippon.com/strongly-typed-react-redux-code-with-typescript/

export interface APIError {
  ErrorMessage: string;
  StatusCode: number | string;
  IsError: boolean;
}

export const InitialError: APIError = {
  ErrorMessage: "",
  StatusCode: 0,
  IsError: false
};

// Define the State
export interface HTMLPageState {
  readonly webPages: Map<number, HTMLPage>;
  readonly webPage: HTMLPage;
  readonly isLoading: boolean;
  readonly isUpdating: boolean;
  readonly apiError: APIError;
}

const initialState: HTMLPageState = {
  webPages: Map(),
  webPage: new HTMLPage(),
  isLoading: false,
  isUpdating: false,
  apiError: InitialError
};

export interface FetchingWebPagesAction extends Action<"FETCHING_WEBPAGES"> {}

export interface FetchWebPagesAction extends Action<"FETCH_WEBPAGES"> {
  webPages: Map<number, HTMLPage>;
  apiError: APIError;
}

export interface UpdatingWebPagesAction extends Action<"UPDATING_WEBPAGES"> {
  type: "UPDATING_WEBPAGES";
}

export interface UpdateWebPagesAction extends Action<"UPDATE_WEBPAGES"> {
  webPage: HTMLPage;
}

export interface FetchingWebPageByNameAction
  extends Action<"FETCHING_WEBPAGES_BY_NAME"> {
  type: "FETCHING_WEBPAGES_BY_NAME";
}
export interface FetchWebPageByNameAction
  extends Action<"FETCH_WEBPAGE_BY_NAME"> {
  webPage: HTMLPage;
  apiError: APIError;
}

export type WebPagesActions =
  | FetchingWebPagesAction
  | FetchWebPagesAction
  | UpdatingWebPagesAction
  | UpdateWebPagesAction
  | FetchingWebPageByNameAction
  | FetchWebPageByNameAction;

export const webPagereducer: Reducer<HTMLPageState, WebPagesActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "FETCHING_WEBPAGES":
      return {
        ...state,
        isLoading: true
      };
    case "FETCH_WEBPAGES":
      return {
        ...state,
        isLoading: false,
        webPages: action.webPages
      };
    case "FETCHING_WEBPAGES_BY_NAME":
      return {
        ...state,
        isLoading: true
      };
    case "FETCH_WEBPAGE_BY_NAME":
      return {
        ...state,
        isLoading: false,
        webPage: action.webPage,
        apiError: action.apiError
      };
    case "UPDATING_WEBPAGES":
      return {
        ...state,
        isUpdating: true,
        isLoading: false
      };
    case "UPDATE_WEBPAGES":
      return {
        ...state,
        isUpdating: false,
        isLoading: false,
        webPage: action.webPage
      };
    default:
      return state;
  }
};
