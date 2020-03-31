import React, { Component } from "react";
import { Theme } from "../../Enums/Theme";
import FrontendMenu from "./Data/FrontendMenu.json";
import BackendMenu from "./Data/BackendMenu.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { MenuButton, MenuButtonItem } from "./MenuButton";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Paths } from "src/Utils/Paths";
import { connect } from "react-redux";
import { IAppState } from "src/Redux/Store/Store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { updateHeaderCreator } from "src/Redux/Actions/ActionCreators";
import { HeaderItem } from "../Header/HeaderItem";
import { HeaderActions } from "src/Redux/Reducers/HeaderReducer";

export enum MenuType {
  Frontend = "Frontend",
  Backend = "Backend"
}

const Nav = styled.nav`
  height: ${props =>
    props.theme.menuBarHeight ? `${props.theme.menuBarHeight}px` : "auto"};
`;
const Brand = styled.a``;

interface MenuProps extends RouteComponentProps<any> {
  Theme: Theme;
  AppName: string;
  MenuType: MenuType;
  showBrand?: boolean;
  menuBarHeight?: number;
  enableRoutePrefix?: boolean;
  headerItem: HeaderItem;
  updateHeader: (title: string, icon: string) => Promise<HeaderActions>;
  logoutFunction?(): void;
}

const LI = styled.li``;

class Menu extends Component<MenuProps> {
  MenuItems: MenuButtonItem[];

  static defaultProps = {
    showBrand: true,
    enableRoutePrefix: true
  };

  constructor(props: MenuProps) {
    super(props);
    this.MenuItems =
      props.MenuType === MenuType.Frontend
        ? FrontendMenu
        : props.MenuType === MenuType.Backend
        ? BackendMenu
        : [];

    this.state = {
      Icon: "",
      Title: ""
    };
  }

  private isActive = (item: MenuButtonItem, isFirst: boolean) => {
    return (
      item.Url === this.props.location.pathname ||
      (isFirst && this.props.location.pathname === Paths.ROOT)
    );
  };

  private loadMenuData = () => {
    return this.MenuItems.map((item, i) => {
      return (
        <LI
          key={item.Id}
          className={`nav-item`}
          style={{
            position:
              item.Position === "right"
                ? "absolute"
                : item.Position === "left"
                ? "absolute"
                : "unset",
            left: item.Position !== "right" ? 0 : undefined,
            right: item.Position !== "left" ? 0 : undefined
          }}
        >
          <MenuButton
            isActive={this.isActive(item, i === 0)}
            Id={item.Id}
            Url={item.Url}
            Icon={item.Icon}
            onClick={this.onClick}
            Name={item.Name}
          />
        </LI>
      );
    });
  };
  RoutePrefix: string =
    this.props.history.location.pathname.split("/")[2] || "";

  componentWillUnmount = () => {
    this.RoutePrefix = "";
  };

  onClick = async (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    button: MenuButtonItem
  ) => {
    const icon = button.Icon;
    const title = `${
      this.props.enableRoutePrefix
        ? this.RoutePrefix
          ? this.RoutePrefix + " / "
          : ""
        : ""
    }${button.Name}`;
   
    if (button.Name.toUpperCase() !== "LOGOUT") {
      this.props.updateHeader(title, icon);
    } else {
      this.props.logoutFunction!();
    }
  };

  getTheme = () => {
    switch (this.props.Theme) {
      case Theme.Light:
        return "bg-light navbar-light";
      case Theme.Dark:
        return "bg-dark navbar-dark";
      default:
        return "bg-light navbar-light";
    }
  };

  render() {
    const ThemeClass = this.getTheme();
    return (
      <ThemeProvider theme={this.props}>
        <Nav className={`navbar navbar-expand-lg ${ThemeClass}`}>
          {this.props.showBrand && (
            <Brand className="navbar-brand" href="#">
              {this.props.AppName}
            </Brand>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav w-100">{this.loadMenuData()}</ul>
          </div>
        </Nav>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (store: IAppState) => {
  return {
    headerItem: store.HeaderState.headerItem
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    updateHeader: (title: string, icon: string) =>
      dispatch(updateHeaderCreator(title, icon))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
