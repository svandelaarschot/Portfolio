import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindows,
  faChrome,
  faHackerNews
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIconPrefixName } from "src/Utils/Utils";
import "bootstrap/dist/css/bootstrap.min.css";

const Card = styled.div``;
const Container = styled.div``;

interface Cards {
  CardName: string;
  Show: boolean;
}

interface HomeState {}

export class Home extends Component<{}, HomeState> {
  AllCards: Cards[] = [];

  componentDidMount = () => {};

  componentDidUpdate = () => {};

  render() {
    const hideCard = (event: React.MouseEvent<Element>) => {};

    return (
      <Container className="wrapper">
        <div className="row">
          <div className="col-sm">
            <Card className="card" id="CardWelcome">
              <div className="card-header">
                <strong>
                  <FontAwesomeIcon icon={faWindows} /> Welcome!
                  <FontAwesomeIconPrefixName
                    onClick={event => hideCard(event)}
                    style={{ cursor: "pointer" }}
                    className="float-right"
                    iconPrefix="far"
                    iconName="times-circle"
                  />
                </strong>
              </div>
              <div className="card-body">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
            </Card>
          </div>
          <div className="col-sm">
            <Card className="card" id="CardNews">
              <div className="card-header">
                <strong>
                  <FontAwesomeIcon icon={faHackerNews} /> News
                  <FontAwesomeIconPrefixName
                    onClick={event => hideCard(event)}
                    style={{ cursor: "pointer" }}
                    className="float-right"
                    iconPrefix="far"
                    iconName="times-circle"
                  />
                </strong>
              </div>
              <div className="card-body">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
            </Card>
          </div>
        </div>
        <Card className="card mt-4" id="CardQuickNav">
          <div className="card-header">
            <strong>
              <FontAwesomeIcon icon={faChrome} /> Quick Navigation
              <FontAwesomeIconPrefixName
                onClick={event => hideCard(event)}
                style={{ cursor: "pointer" }}
                className="float-right"
                iconPrefix="far"
                iconName="times-circle"
              />
            </strong>
          </div>
          <div className="card-body">
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
          </div>
        </Card>
      </Container>
    );
  }
}
