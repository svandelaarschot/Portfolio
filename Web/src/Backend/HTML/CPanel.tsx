import { useEffect, useState } from "react";
import React from "react";
import Menu, { MenuType } from "src/components/Menu/Menu";
import { Theme } from "src/Enums/Theme";
import styled, { createGlobalStyle } from "styled-components";
import {
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
  withRouter
} from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Webpages } from "./Webpages";
import Paths from "src/Utils/Paths";
import { ToastMessage } from "src/components/controls/Toast";
import { setAuthentication, getAuthentication } from "src/Utils/Authentication";

interface CPanelProps extends RouteComponentProps<any> {}

const CSS = createGlobalStyle`
.container-fluid,
.container-fluid.mt-3 {
  margin-top:0 !important;
  padding:0 !important;
}
#Header {
  border-bottom:unset;
}
`;

const CPanelContent = styled.div`
  padding: 10px;
`;

const CPanel = (props: CPanelProps) => {
  
  const [isAuth, setIsAuth] = useState(getAuthentication());

  useEffect(() => {
    if (!isAuth) {
      props.history.push(Paths.LOGIN);
    }
  }, [isAuth, setIsAuth, props.history]);

  const OnToastClose = () => {
    setAuthentication(false);
    setIsAuth(getAuthentication());
    props.history.push(Paths.LOGIN);
  };

  return (
    <>
      <CSS />
      <Menu
        menuBarHeight={40}
        showBrand={false}
        MenuType={MenuType.Backend}
        Theme={Theme.Dark}
        AppName="Backend"
      />
      <CPanelContent>
        <Switch>
          <Redirect exact from={Paths.CPANEL} to={Paths.CPANEL_DASHBOARD} />
          <Route exact path={Paths.CPANEL_DASHBOARD}>
            <Dashboard RouteLocation={window.location} />
          </Route>
          <Route exact path={Paths.CPANEL_WEBPAGES}>
            <Webpages RouteLocation={window.location} />
          </Route>
          <Route exact path={Paths.CPANEL_LOGOUT}>
            <ToastMessage
              closeButton={false}
              delay={1000}
              onClose={OnToastClose}
              show={!isAuth}
              title={"Logout"}
              message={"You will be logged-out and redirected!"}
            />
          </Route>
        </Switch>
      </CPanelContent>
    </>
  );
};

export default withRouter(CPanel);
