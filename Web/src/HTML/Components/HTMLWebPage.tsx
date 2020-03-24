import * as React from "react";
import { connect } from "react-redux";
import {
  HTMLPage,
  FetchWebPagesAction,
  UpdateWebPagesAction,
  FetchWebPageByNameAction,
  APIError
} from "src/Redux/Reducers/WebPageReducer";
import {
  getWebpagesActionCreator,
  updateWebpagesActionCreator,
  getWebpagesByNameActionCreator
} from "src/Redux/Actions/ActionCreators";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { IAppState } from "src/Redux/Store/Store";
import { useEffect, useState, useCallback } from "react";
import { ToastMessage } from "src/components/controls/Toast";

interface Props {
  webPageName: string;
  fetchWebPages: () => Promise<FetchWebPagesAction>;
  webPages: HTMLPage[];
  webPage: HTMLPage;
  apiError: APIError;
  isLoading: boolean;
  updateWebPages: (Page: HTMLPage) => Promise<UpdateWebPagesAction>;
  fetchWebpageByName: (pageName: string) => Promise<FetchWebPageByNameAction>;
}

const HTMLWebPage: React.FC<Props> = ({
  webPageName,
  fetchWebPages,
  webPages,
  webPage,
  apiError,
  isLoading,
  updateWebPages,
  fetchWebpageByName
}) => {
  const [showToast, setShowToast] = useState(false);
  const [ApiErrorTitle, setApiErrorTitle] = useState("");
  const [ApiErrorMessage, setApiErrorMessage] = useState("");

  const SetToast = useCallback(() => {
    setShowToast(apiError.IsError);
    setApiErrorTitle(`${apiError.StatusCode}`);
    setApiErrorMessage(apiError.ErrorMessage);
  }, [apiError.IsError, apiError.StatusCode,apiError.ErrorMessage]);

  const fetchData = useCallback(async () => {
    await fetchWebpageByName(webPageName);
    SetToast();
  }, [SetToast, fetchWebpageByName,webPageName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const OnToastClose = () => {
    window.location.href = "/Home";
  };

  return (
    <>
      <ToastMessage
        closeButton={false}
        delay={1000}
        onClose={OnToastClose}
        show={showToast}
        title={ApiErrorTitle}
        message={ApiErrorMessage}
      />
      <div>
        <h1>{webPage.Content}</h1>
      </div>
    </>
  );
};

const mapStateToProps = (store: IAppState) => {
  return {
    apiError: store.HTMLPageState.apiError,
    webPage: store.HTMLPageState.webPage,
    webPages: store.HTMLPageState.webPages,
    isLoading: store.HTMLPageState.isLoading
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    fetchWebPages: () => dispatch(getWebpagesActionCreator()),
    updateWebPages: (Page: HTMLPage) =>
      dispatch(updateWebpagesActionCreator(Page)),
    fetchWebpageByName: (pageName: string) =>
      dispatch(getWebpagesByNameActionCreator(pageName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HTMLWebPage);
