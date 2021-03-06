import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./Backend/Views/Login";
import { Provider } from "react-redux";
import { configureStore } from "./Redux/Store/Store";
import Home from "./Views/Pages/Home";
import HTMLWebPage from "./Views/Components/HTMLWebPage";
import { Contact } from "./Views/Pages/Contact";
import CPanel from "./Backend/Views/CPanel";
import Header from "./components/Header/Header";
import Menu, { MenuType } from "./components/Menu/Menu";
import { Theme } from "./Enums/Theme";
import "bootstrap/dist/css/bootstrap.min.css";
import { Paths } from "./Utils/Paths";

/*
  React Routing: https://reacttraining.com/react-router/web/guides/philosophy
*/
const App = ({ store = configureStore() }) => {
  return (
    <Provider store={store}>
      <Router>
        <Menu
          MenuType={MenuType.Frontend}
          Theme={Theme.Dark}
          AppName="Stefan van de Laarschot"
          enableRoutePrefix={false}
        />
        <Header />
        <div className="container-fluid mt-3">
          <Route exact path={Paths.ROOT}>
            <Home />
          </Route>
          <Route path={Paths.FRONTEND_HOME}>
            <Home />
          </Route>
          <Route path={Paths.FRONTEND_ABOUT}>
            <HTMLWebPage webPageName={"AboutMe"} />
          </Route>
          <Route path={Paths.FRONTEND_SKILLS}>
            <HTMLWebPage webPageName={"Skills"} />
          </Route>
          <Route path={Paths.FRONTEND_PROJECTS}>
            <HTMLWebPage webPageName={"Projects"} />
          </Route>
          <Route path={Paths.FRONTEND_CONTACT}>
            <Contact />
          </Route>
          <Route path={Paths.LOGIN}>
            <Login />
          </Route>
          <Switch>
            <Route path={Paths.CPANEL}>
              <CPanel />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
