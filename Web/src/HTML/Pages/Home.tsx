import React from "react";
import DynamicPanel from "../Components/DynamicPanel";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Container = styled.div``;

const Home = () => {
    return (
      <Container className="wrapper">
        <DynamicPanel title={"Welcome"} icon={"info-circle"} />
        <DynamicPanel title={"News"} icon={"newspaper"} />
        <DynamicPanel title={"Contact"} icon={"sign"} />
      </Container>
    );
}

export default withRouter(Home);
