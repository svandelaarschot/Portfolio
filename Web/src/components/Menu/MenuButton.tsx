import { NavLink } from "react-router-dom";
import React from "react";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { GetIconFontAwesomeByName } from "../../Utils/Utils";
import styled, { ThemeProvider } from "styled-components";
export interface MenuButtonItem {
  Id: number;
  Name: string;
  Icon: string;
  Url?: string;
  Position: string;
  IsModal?: boolean;
  ModalId?: string;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    button: MenuButtonItem
  ) => void;
  isActive?: boolean;
}

const ButtonText = styled.span`
  margin-left: 5px;
  margin-right: 5px;
`;

export const MenuButton = (props: MenuButtonItem) => {
  const onClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (props.onClick) {
      props.onClick!(event, props);
    }
  };

  return (
    <ThemeProvider theme={props}>
      <NavLink
        data-toggle={`${props.IsModal ? "modal" : ""}`}
        data-target={`#${props.ModalId ? props.ModalId : ""}`}
        className={`nav-link ${props.isActive ? "active" : ""}`}
        to={`${props.Url ? props.Url : "#"}`}
        onClick={onClick}
      >
        {GetIconFontAwesomeByName(props.Icon as IconName)}
        <ButtonText>{props.Name}</ButtonText>
      </NavLink>
    </ThemeProvider>
  );
};

MenuButton.defaultProps = {
  Position: "none"
};
