import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { Button } from "../../components/controls/Button";
import { FormText } from "../../components/controls/FormText";
import { FormPassword } from "src/components/controls/FormPassword";
import { LockOpen } from "@material-ui/icons";
import { ColorType } from "src/components/controls/BaseControlProps";
import { ToastMessage } from "src/components/controls/Toast";
import { useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Paths } from "src/Utils/Paths";
import { ThunkDispatch } from "redux-thunk";
import {
  updateAuthenticationCreator,
  getAuthenticationActionCreator
} from "src/Redux/Actions/ActionCreators";
import { IAppState } from "src/Redux/Store/Store";
import { connect } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import {
  AuthenticationActions,
  AuthenticationItem
} from "src/Redux/Reducers/AuthenticationReducer";

/* Always put styled-components outside the class or functional components !!! */
const LoginContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  max-width: 50%;
  min-height: 32%;
  margin: 0 auto;
`;
const H1 = styled.h1`
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #ccc !important;
  padding-bottom: 5px;
`;

const LoginForm = styled.form``;
const LoginFormContainer = styled.div`
  margin-bottom: 10px;
`;

const SignInIcon = styled(LockOpen)`
  float: left;
  margin-right: 5px;
`;
/*============================================================ */

interface LoginProps {
  authenticationItem: AuthenticationItem;
  updateAuthentication: (
    isAuth: boolean,
    username?: string
  ) => Promise<AuthenticationActions>;
  getAuthentication: () => Promise<AuthenticationActions>;
}

const Login = (props: LoginProps) => {
  const history = useHistory();
  const [showToast, setShowToast] = React.useState(false);
  const [toastTitle, setToastTitle] = React.useState("");
  const [toastMessage, setToastMessage] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    props.getAuthentication();
    if (props.authenticationItem.isAuth) {
      history.push({ pathname: Paths.CPANEL });
    } else {
      setShowToast(false);
    }
  }, []);

  const handleLogin = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (userName && password) {
      // Do Fetch Login Logic here.... and Set the isAuth!
      setShowToast(false);
      props.updateAuthentication(true, userName);
      history.push({ pathname: Paths.CPANEL });
    } else {
      setShowToast(true);
      setToastTitle("Required Field");
      setToastMessage("Username and or Password is not filled in!");
    }
  };

  const OnToastClose = () => {
    setShowToast(false);
  };

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <LoginContainer className={"LoginContainer"}>
      <ToastMessage
        closeButton={false}
        delay={1000}
        onClose={OnToastClose}
        show={showToast}
        title={toastTitle}
        message={toastMessage}
      />
      <H1>
        <SignInIcon /> Backend - Login
      </H1>
      <LoginForm action="/api/backend/Login">
        <LoginFormContainer className={"form-group"}>
          <FormText
            value={userName}
            onChange={onChangeUserName}
            marginBottom={5}
            placeholder={"Username..."}
            labelText={"Username:"}
          />
          <FormPassword
            value={password}
            onChange={onChangePassword}
            placeholder={"Password..."}
            labelText={"Password:"}
          />
        </LoginFormContainer>
        <Button
          type={"button"}
          onClick={handleLogin}
          colorType={ColorType.info}
          buttonText="Login"
        />
      </LoginForm>
    </LoginContainer>
  );
};

const mapStateToProps = (store: IAppState) => {
  return {
    authenticationItem: store.AuthenticationState.authenticationItem
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    updateAuthentication: (isAuth: boolean, username?: string) =>
      dispatch(updateAuthenticationCreator(isAuth, username)),
    getAuthentication: () => dispatch(getAuthenticationActionCreator())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
