import React, { Component } from "react";
import {
  AppHeader,
  AppHeaderImage,
  AppHeaderTitle,
  AppHeaderLine
} from "./styles";
import { GetIconFontAwesomeByName } from "../../Utils/Utils";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderContext from "../Header/HeaderContext";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Paths } from "src/Utils/Paths";

interface HeaderProps {}

type Props = HeaderProps & RouteComponentProps<any>;

class Header extends Component<Props> {
  static contextType = HeaderContext;

  componentDidMount() {
    const { setHeaderItem } = this.context;
    if (this.props.location.pathname === Paths.ROOT) {
      setHeaderItem({
        icon: "home",
        title: "Home"
      });
    }
  }

  render() {
    const { HeaderItem } = this.context;
    return (
      <AppHeader id="Header">
        <AppHeaderTitle id="HeaderTitle">
          {GetIconFontAwesomeByName(HeaderItem.icon)}
          <span>&nbsp;{HeaderItem.title}</span>
        </AppHeaderTitle>
        <AppHeaderLine />
        <AppHeaderImage />
      </AppHeader>
    );
  }
}

export default withRouter(Header);
