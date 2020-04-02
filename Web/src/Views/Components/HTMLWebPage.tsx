import * as React from "react";
import { connect } from "react-redux";
import {
  FetchWebPagesAction,
  UpdateWebPagesAction,
  FetchWebPageByNameAction,
  APIError
} from "src/Redux/Reducers/WebPageReducer";
import {
  getWebpagesActionCreator,
  updateWebpagesActionCreator,
  getWebpagesByNameActionCreator,
  updateHeaderCreator
} from "src/Redux/Actions/ActionCreators";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { IAppState } from "src/Redux/Store/Store";
import { useEffect, useState, useCallback } from "react";
import { ToastMessage } from "src/components/controls/Toast";
import { withRouter, RouteComponentProps, RouteProps } from "react-router-dom";
import { Paths } from "src/Utils/Paths";
import { HeaderActions } from "src/Redux/Reducers/HeaderReducer";
import { LoadingMask } from "./LoadingMask";
import { HTMLPage } from "src/Backend/Classes/HTMLPage";
import { Map } from "immutable";

interface Props {
  webPageName: string;
  fetchWebPages: () => Promise<FetchWebPagesAction>;
  webPages: Map<number, HTMLPage>;
  webPage: HTMLPage;
  apiError: APIError;
  isLoading: boolean;
  updateWebPages: (Page: HTMLPage) => Promise<UpdateWebPagesAction>;
  fetchWebpageByName: (pageName: string) => Promise<FetchWebPageByNameAction>;
  updateHeader: (title: string, icon: string) => Promise<HeaderActions>;
}

const HTMLWebPage = (props: Props & RouteComponentProps<any> & RouteProps) => {
  const [showToast, setShowToast] = useState(false);
  const [ApiErrorTitle, setApiErrorTitle] = useState("");
  const [ApiErrorMessage, setApiErrorMessage] = useState("");

  const SetToast = useCallback(() => {
    setShowToast(props.apiError.IsError);
    setApiErrorTitle(`${props.apiError.StatusCode}`);
    setApiErrorMessage(props.apiError.ErrorMessage);
  }, [
    props.apiError.IsError,
    props.apiError.StatusCode,
    props.apiError.ErrorMessage
  ]);

  const fetchData = useCallback(async () => {
    await props.fetchWebpageByName(props.webPageName);
    SetToast();
  }, []);

  useEffect(() => {
    fetchData();
  }, [props.webPageName]);

  const OnToastClose = useCallback(() => {
    props.updateHeader("Home", "home");
    props.history.push(Paths.FRONTEND_HOME);
  }, []);

  return (
    <>
      <ToastMessage
        closeButton={false}
        delay={1400}
        onClose={OnToastClose}
        show={showToast}
        title={ApiErrorTitle}
        message={ApiErrorMessage}
      />
      <LoadingMask showLoading={props.isLoading} />
      <div>{props.webPage.content}</div>
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
      dispatch(getWebpagesByNameActionCreator(pageName)),
    updateHeader: (title: string, icon: string) =>
      dispatch(updateHeaderCreator(title, icon))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HTMLWebPage)
);
