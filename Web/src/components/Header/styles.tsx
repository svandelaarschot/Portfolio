import styled from "styled-components";

export const HEADER_WIDTH: string = "100%";
export const MIN_HEADER_HEIGHT: string = "250";

export const AppHeaderLine = styled.div`
  position: absolute;
  z-index: 99;
  background-color: white;
  width: 30%;
  height: 1px;
  top: 60px;
  left: 10px;
  opacity: 0.1;
`;

export const AppHeaderTitle = styled.div`
  position: absolute;
  color: white;
  font-style: bold;
  font-size: 30px;
  margin-top: 10px;
  margin-left: 10px;
  opacity: 0.1;
`;

export const AppHeaderImage = styled.div`
  width: ${HEADER_WIDTH};
  min-height: ${MIN_HEADER_HEIGHT}px;
  background: url(/images/header.png) no-repeat;
  background-position: center -240px;
`;

export const AppHeader = styled.header`
  width: ${HEADER_WIDTH};
  min-height: ${MIN_HEADER_HEIGHT}px;
  background-color: #ccc;
  border-bottom: 10px solid #343a40;
  position: relative;
`;
