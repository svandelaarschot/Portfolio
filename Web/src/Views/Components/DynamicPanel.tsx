import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIconPrefixName } from "../../Utils/Utils";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";

interface DynamicPanelProps {
  title: string;
  body?: string;
  icon?: IconProp;
  showCloseButton?: boolean;
}

const Container = styled.div`
  justify-content: space-between;
  ?
  flex-direction: row;
  align-content: stretch;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right:5px;
`;

const DynamicPanel = (props: React.PropsWithChildren<DynamicPanelProps>) => {
  
  const [showPanel, setShowPanel] = useState(true);
  
  const Panel = styled.div`
    margin-bottom: 10px;
    min-width: 400px;
    display:${showPanel ? "block" : "none"};
  `;

  const hidePanel = (event: React.MouseEvent<Element, MouseEvent>) => {
    setShowPanel(false)
  };

  const TO_ID = (input: string): string => {
    return `DYNAMICPANEL_${input.replace(" ", "_").toUpperCase()}`;
  };


  return (
    <ThemeProvider theme={props}>
      <Container className="wrapper">
        <div className="row">
          <div className="col-sm">
            <Panel id={TO_ID(props.title)} className="card">
              <div className="card-header">
                <strong>
                  {props.icon && <Icon icon={props.icon!} />}
                  {props.title}
                  {props.showCloseButton && <FontAwesomeIconPrefixName
                    onClick={hidePanel}
                    style={{ cursor: "pointer" }}
                    className="float-right"
                    iconPrefix="far"
                    iconName="times-circle"
                  />}
                </strong>
              </div>
              <div className="card-body">
                <p className="card-text">
                  {props.body}
                  {props.children}
                </p>
              </div>
            </Panel>
          </div>
        </div>
        <div>
          
        </div>
      </Container>
    </ThemeProvider>
  );
};

DynamicPanel.defaultProps = {
  showCloseButton: true,
}

export default DynamicPanel;
