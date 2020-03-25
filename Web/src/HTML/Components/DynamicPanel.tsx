import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIconPrefixName } from "../../Utils/Utils";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface DynamicPanelProps {
  title: string;
  body?: string;
  icon?: IconProp;
  showCloseButton?: boolean;
}

const Panel = styled.div`
  margin-bottom: 10px;
  min-width: 400px;
`;

const Container = styled.div`
  justify-content: space-between;
  flex-direction: row;
  align-content: stretch;
`;

const DynamicPanel = (props: React.PropsWithChildren<DynamicPanelProps>) => {
  const hidePanel = (event: React.MouseEvent<Element, MouseEvent>) => {};

  const TO_ID = (input: string): string => {
    return `DYNAMICPANEL_${input.replace(" ", "_").toUpperCase()}`;
  };

  return (
    <Container className="wrapper">
      <div className="row">
        <div className="col-sm">
          <Panel id={TO_ID(props.title)} className="card">
            <div className="card-header">
              <strong>
                <FontAwesomeIcon icon={props.icon} /> {props.title}
                <FontAwesomeIconPrefixName
                  onClick={hidePanel}
                  style={{ cursor: "pointer" }}
                  className="float-right"
                  iconPrefix="far"
                  iconName="times-circle"
                />
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
    </Container>
  );
};

export default DynamicPanel;
