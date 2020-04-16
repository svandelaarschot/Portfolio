import { useEffect, useCallback, useState } from "react";
import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import styled from "styled-components";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import { IAppState } from "src/Redux/Store/Store";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";
import {
  updateHeaderCreator,
  getAuthenticationActionCreator,
  updateAuthenticationCreator,
  getWebpagesActionCreator
} from "src/Redux/Actions/ActionCreators";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import {
  AuthenticationActions,
  AuthenticationItem
} from "src/Redux/Reducers/AuthenticationReducer";
import { HeaderItem } from "src/components/Header/HeaderItem";
import { HeaderActions } from "src/Redux/Reducers/HeaderReducer";
import { Map, fromJS } from "immutable";
import { HTMLPage } from "../Classes/HTMLPage";
import {
  FetchWebPagesAction,
  APIError
} from "src/Redux/Reducers/WebPageReducer";
import { ToastMessage } from "src/components/controls/Toast";

interface WebpagesProps extends RouteComponentProps<any> {
  webPages: Map<number, HTMLPage>;
  authenticationItem: AuthenticationItem;
  headerItem: HeaderItem;
  updateHeader: (title: string, icon: string) => Promise<HeaderActions>;
  updateAuthentication: (
    isAuth: boolean,
    username?: string
  ) => Promise<AuthenticationActions>;
  getAuthentication: () => Promise<AuthenticationActions>;
  fetchWebpages: () => Promise<FetchWebPagesAction>;
  apiError: APIError;
}

const Container = styled.div``;

const Webpages = (props: WebpagesProps) => {
  let gridApi: GridApi;

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
    await props.fetchWebpages();
    SetToast();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const colDefs = [
    {
      headerName: "Title",
      field: "title"
    },
    {
      headerName: "IsActive",
      field: "isActive"
    }
  ];

  const OnToastClose = useCallback(() => {
    return;
  }, []);

  const onGridReady = (e: GridReadyEvent) => {
    gridApi = e.api;
    gridApi.sizeColumnsToFit();
  };

  const pages = fromJS(props.webPages);

  return (
    <>
      <ToastMessage
        closeButton={false}
        delay={3000}
        onClose={OnToastClose}
        show={showToast}
        title={ApiErrorTitle}
        message={ApiErrorMessage}
      />
      <Container className={"container-fluid"}>
        <div
          className="ag-theme-balham"
          style={{ width: "100%", height: "500px" }}
        >
          <AgGridReact
            rowSelection={"single"}
            deltaRowDataMode={true}
            columnDefs={colDefs}
            rowData={pages.toArray()}
            onGridReady={onGridReady}
          />
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = (store: IAppState) => {
  return {
    webPages: store.HTMLPageState.webPages,
    authenticationItem: store.AuthenticationState.authenticationItem,
    headerItem: store.HeaderState.headerItem,
    apiError: store.HTMLPageState.apiError
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    fetchWebpages: () => dispatch(getWebpagesActionCreator()),
    updateHeader: (title: string, icon: string) =>
      dispatch(updateHeaderCreator(title, icon)),
    updateAuthentication: (isAuth: boolean, username?: string) =>
      dispatch(updateAuthenticationCreator(isAuth, username)),
    getAuthentication: () => dispatch(getAuthenticationActionCreator())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Webpages)
);
