import "bootstrap/dist/css/bootstrap.min.css";
import styled, { ThemeProvider } from "styled-components";
import * as React from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { BaseControlProps } from "./BaseControlProps";

interface Props extends BaseControlProps {
  enableShowPassword?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Source: [https://www.robinwieruch.de/react-styled-components]
/* ============================ Styling ====================================== */
const CustomFormText = styled.input``;

const EM = styled.em`
  color: red;
  margin-left: 2px;
`;

const LabelText = styled.label`
  display: ${props => (props.theme.labelText ? "block" : "none")};
  font-weight: ${props => (props.theme.isBold ? "bold" : "normal")};
`;

const EyesWrapper = styled.div`
  position: relative;
  float: right;
  top: -30px;
  right: 30px;
`;

const EyesOn = styled(Visibility)`
  cursor: pointer;
  position: absolute;
  display: ${props => (props.theme.showPassword ? "block" : "none")};
`;

const EyesOff = styled(VisibilityOff)`
  cursor: pointer;
  position: absolute;
  display: ${props => (props.theme.showPassword ? "block" : "none")};
`;

const FormTextContainer = styled.div`
  margin-bottom: ${props => props.theme.marginBottom + "px !important"};
`;
/* ============================ End Styling ====================================== */

// Form Password Control.
export const FormPassword = (props: Props) => {
  const [state, setState] = React.useState({
    showPassword: false,
    value: "",
    hasValue: false
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      value: e.target.value,
      showPassword: state.showPassword,
      hasValue: e.target.value.length > 0
    });
    props.onChange(e);
  };

  const showPassword = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ): void => {
    setState({
      showPassword: !state.showPassword,
      value: state.value,
      hasValue: state.hasValue
    });
  };

  // Return JSX
  return (
    <ThemeProvider theme={props}>
      <FormTextContainer>
        <LabelText>
          {props.labelText}
          <EM>{props.isRequired ? "*" : ""}</EM>
        </LabelText>
        <CustomFormText
          style={props.style}
          defaultValue={state.value}
          required={props.isRequired}
          onChange={onChange}
          type={`${state.showPassword ? "text" : "password"}`}
          placeholder={props.placeholder}
          className={`form-control ${props.className}`}
        />
        <EyesWrapper>
          {state.showPassword ? (
            <EyesOn onClick={showPassword} className={"ShowPassword"} />
          ) : (
            <EyesOff onClick={showPassword} className={"ShowPassword"} />
          )}
        </EyesWrapper>
      </FormTextContainer>
    </ThemeProvider>
  );
};

// Set default props
FormPassword.defaultProps = {
  className: "FormPassword",
  enableShowPassword: true,
  marginBottom: 0,
  isBold: true,
  value: "",
  isRequired: false
};
