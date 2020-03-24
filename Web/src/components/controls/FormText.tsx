import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled, { ThemeProvider } from "styled-components";
import { BaseControlProps } from "./BaseControlProps";

interface FormTextProps extends BaseControlProps {
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

const FormTextContainer = styled.div`
  margin-bottom: ${props =>
    props.theme.marginBottom ? props.theme.marginBottom + "px !important" : ""};
`;
/* ============================ End Styling =================================== */

export const FormText = (props: FormTextProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e);
  };

  // Return JSX
  return (
    <ThemeProvider theme={props}>
      <FormTextContainer>
        <LabelText htmlFor={`${props.className}`}>
          {props.labelText}
          <EM>{props.isRequired ? "*" : ""}</EM>
        </LabelText>
        <CustomFormText
          onChange={onChange}
          required={props.isRequired}
          style={props.style}
          type={`${!props.type ? "text" : props.type}`}
          placeholder={props.placeholder}
          className={`form-control ${props.className}`}
        />
      </FormTextContainer>
    </ThemeProvider>
  );
};

// Defaults
FormText.defaultProps = {
  isRequired: false,
  className: "FormText",
  marginBottom: 0,
  isBold: true
};
