import { ActionCreator, ThunkAction, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {
  FetchWebPagesAction,
  FetchingWebPagesAction,
  HTMLPage,
  UpdateWebPagesAction,
  UpdatingWebPagesAction,
  FetchingWebPageByNameAction,
  FetchWebPageByNameAction,
  APIError,
  InitialError
} from "../Reducers/WebPageReducer";
import { UpdateHeaderAction, GetHeaderAction } from "../Reducers/HeaderReducer";
import { HeaderItem } from "src/components/Header/HeaderItem";
import {
  GetAuthenticationAction,
  UpdateAuthenticationAction
} from "../Reducers/AuthenticationReducer";

// Source: https://www.carlrippon.com/strongly-typed-react-redux-code-with-typescript/

// WEBPAGES CREATORS

export const getWebpagesActionCreator: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<FetchWebPagesAction>,
  // The type for the data within the last action
  HTMLPage[],
  // The type of the parameter for the nested function
  null,
  // The type of the last action to be dispatched
  FetchWebPagesAction
>> = () => {
  return async (dispatch: Dispatch) => {
    const fetchingWebPagesAction: FetchingWebPagesAction = {
      type: "FETCHING_WEBPAGES"
    };
    dispatch(fetchingWebPagesAction);
    const fetchWebpagesAction: FetchWebPagesAction = {
      type: "FETCH_WEBPAGES",
      // const result = await GetHTMLPageAPI(HTMLPage);
      webPages: [
        {
          Id: 0,
          Content: "This is test from the ActionCreator!",
          IsActive: false,
          Title: "REDUX!"
        }
      ]
    };
    return dispatch(fetchWebpagesAction);
  };
};

interface API_Result {
  data: any;
  apiError: APIError;
}

const fetchWebPageByName = async (PageName: string): Promise<API_Result> => {
  const result: API_Result = {
    data: {},
    apiError: InitialError
  };

  await axios
    .get(`${process.env.REACT_APP_API_URL}HTMLPage?Name=${PageName}`)
    .then((response: { status: number; data: any; statusText: string }) => {
      if (response.status === 200) {
        result.data = response.data;
      } else {
        result.apiError.ErrorMessage = response.statusText;
        result.apiError.StatusCode = response.status;
        result.apiError.IsError = true;
      }
    })
    .catch(
      (error: {
        isAxiosError: any;
        request: { responseText: string; status: string | number };
        message: string | number;
      }) => {
        console.log(error);
        if (!error.isAxiosError) {
          result.apiError.ErrorMessage = error.request.responseText;
          result.apiError.StatusCode = error.request.status;
        } else {
          result.apiError.ErrorMessage = `API interface is offline`;
          result.apiError.StatusCode = error.message;
        }

        result.apiError.IsError = true;
      }
    );

  return result;
};

export const getWebpagesByNameActionCreator: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<FetchWebPageByNameAction>,
  // The type for the data within the last action
  HTMLPage,
  // The type of the parameter for the nested function
  null,
  // The type of the last action to be dispatched
  FetchWebPagesAction
>> = (PageName: string) => {
  return async (dispatch: Dispatch) => {
    const fetchingWebPageByNameAction: FetchingWebPageByNameAction = {
      type: "FETCHING_WEBPAGES_BY_NAME"
    };
    dispatch(fetchingWebPageByNameAction);
    const APIResult = await fetchWebPageByName(PageName);
    const fetchWebpageByNameAction: FetchWebPageByNameAction = {
      type: "FETCH_WEBPAGE_BY_NAME",
      webPage: APIResult.data,
      apiError: APIResult.apiError
    };
    return dispatch(fetchWebpageByNameAction);
  };
};

export const updateWebpagesActionCreator: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<UpdateWebPagesAction>,
  // The type for the data within the last action
  HTMLPage,
  // The type of the parameter for the nested function
  HTMLPage,
  // The type of the last action to be dispatched
  UpdateWebPagesAction
>> = (Page: HTMLPage) => {
  return async (dispatch: Dispatch) => {
    const updatingWebPageAction: UpdatingWebPagesAction = {
      type: "UPDATING_WEBPAGES"
    };
    dispatch(updatingWebPageAction);
    const updateWebPageAction: UpdateWebPagesAction = {
      type: "UPDATE_WEBPAGES",
      // WebPage: Page //This is when the API is working
      webPage: {
        Id: 0,
        Content: "UPDATED: This is test from the ActionCreator!",
        IsActive: true,
        Title: "UPDATE FROM REDUX!"
      }
    };
    return dispatch(updateWebPageAction);
  };
};

// HEADER CREATORS

export const getHeaderActionCreator: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<GetHeaderAction>,
  // The type for the data within the last action
  HeaderItem,
  // The type of the parameter for the nested function
  null,
  // The type of the last action to be dispatched
  GetHeaderAction
>> = () => {
  return async (dispatch: Dispatch) => {
    const getHeaderAction: GetHeaderAction = {
      type: "GET_HEADER_TITLE"
    };
    return dispatch(getHeaderAction);
  };
};

export const updateHeaderCreator: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<UpdateHeaderAction>,
  // The type for the data within the last action
  HeaderItem,
  // The type of the parameter for the nested function
  HeaderItem,
  // The type of the last action to be dispatched
  UpdateHeaderAction
>> = (title: string, icon: string) => {
  return async (dispatch: Dispatch) => {
    const updateHeaderAction: UpdateHeaderAction = {
      type: "UPDATE_HEADER_TITLE",
      headerItem: {
        icon,
        title
      }
    };
    return dispatch(updateHeaderAction);
  };
};

// AUTHENTICATION CREATORS

export const getAuthenticationActionCreator: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<GetAuthenticationAction>,
  // The type for the data within the last action
  HeaderItem,
  // The type of the parameter for the nested function
  null,
  // The type of the last action to be dispatched
  GetAuthenticationAction
>> = () => {
  return async (dispatch: Dispatch) => {
    const getAuthenticationAction: GetAuthenticationAction = {
      type: "GET_AUTHENTICATION"
    };
    return dispatch(getAuthenticationAction);
  };
};

export const updateAuthenticationCreator: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<UpdateAuthenticationAction>,
  // The type for the data within the last action
  HeaderItem,
  // The type of the parameter for the nested function
  HeaderItem,
  // The type of the last action to be dispatched
  UpdateAuthenticationAction
>> = (isAuth: boolean, username?: string) => {
  return async (dispatch: Dispatch) => {
    const updateAuthenticationAction: UpdateAuthenticationAction = {
      type: "UPDATE_AUTHENTICATION",
      authenticationItem: {
        isAuth,
        username
      }
    };
    return dispatch(updateAuthenticationAction);
  };
};
