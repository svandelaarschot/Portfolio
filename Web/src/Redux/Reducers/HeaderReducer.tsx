import { Action, Reducer } from "@reduxjs/toolkit";
import { HeaderItem } from "src/components/Header/HeaderItem";

// Source: https://www.carlrippon.com/strongly-typed-react-redux-code-with-typescript/

export interface HeaderState {
  headerItem: HeaderItem;
}

const initialState: HeaderState = {
  headerItem: {
    title: "Home",
    icon: "home",
  }
}

export interface UpdateHeaderAction extends Action<"UPDATE_HEADER_TITLE"> {
  headerItem: HeaderItem;
}
export interface GetHeaderAction extends Action<"GET_HEADER_TITLE"> {}

export type HeaderActions = UpdateHeaderAction | GetHeaderAction;

export const headerReducer: Reducer<HeaderState, HeaderActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "GET_HEADER_TITLE":
      return {
        ...state,
      };
      case "UPDATE_HEADER_TITLE":
      return {
        ...state,
        headerItem: action.headerItem
      };
    default:
      return state;
  }
};