import React, { Component } from "react";
import DynamicPanel from "../Components/DynamicPanel";
import styled from "styled-components";

interface HomeState {}

const Container = styled.div``;

export class Home extends Component<{}, HomeState> {
  componentDidMount = () => {};

  componentDidUpdate = () => {};

  render() {
    return (
      <Container className="wrapper">
        <DynamicPanel title={"Welcome"} icon={"info-circle"} />
        <DynamicPanel title={"News"} icon={"newspaper"} />
        <DynamicPanel title={"Contact"} icon={"sign"} />
      </Container>
    );
  }
}
