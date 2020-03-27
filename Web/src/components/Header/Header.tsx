import React, { useEffect } from "react";
import {
  AppHeader,
  AppHeaderImage,
  AppHeaderTitle,
  AppHeaderLine
} from "./styles";
import { GetIconFontAwesomeByName } from "../../Utils/Utils";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IAppState } from "src/Redux/Store/Store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import {
  updateHeaderCreator,
  getHeaderActionCreator
} from "src/Redux/Actions/ActionCreators";
import {
  UpdateHeaderAction,
  GetHeaderAction
} from "src/Redux/Reducers/HeaderReducer";
import { connect } from "react-redux";
import { HeaderItem } from "./HeaderItem";

interface Props {
  headerItem: HeaderItem;
  updateHeader: (title: string, icon: string) => Promise<UpdateHeaderAction>;
  getHeader: () => Promise<GetHeaderAction>;
}

const Header = (props: Props & RouteComponentProps<any>) => {
  useEffect(() => {
    props.getHeader();
  });

  return (
    <AppHeader id="Header">
      <AppHeaderTitle id="HeaderTitle">
        {GetIconFontAwesomeByName(props.headerItem.icon)}
        <span>&nbsp;{props.headerItem.title}</span>
      </AppHeaderTitle>
      <AppHeaderLine />
      <AppHeaderImage />
    </AppHeader>
  );
};

const mapStateToProps = (store: IAppState) => {
  return {
    headerItem: store.HeaderState.headerItem
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    updateHeader: (title: string, icon: string) =>
      dispatch(updateHeaderCreator(title, icon)),
    getHeader: () => dispatch(getHeaderActionCreator())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
