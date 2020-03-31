import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";

interface Props {
  showLoading?: boolean;
  loadingText?: string;
}

const CSS = createGlobalStyle`

.LoadingMask {  
    margin: 0 auto;
    display: block;
    overflow: hidden;
  }

  .LoadingText {
    display:block;
    margin: 0 auto;
    width:100%;
    color: "#5E5E5E";
    font-weight: bold;
    text-align:center;
    font-size:24px;
    align-items:center;
  }

  .ImageWrapper {
    margin: 0 auto;
    width:100%;
  }

`;

const LoadingMaskContrainer = styled.div`
  height: 100%;
  width: 100%;
`;

export const LoadingMask = (props: Props) => {
  return (
    <>
      <CSS />
      <LoadingMaskContrainer>
        <div className={"ImageWrapper"}>
          <img
            className="LoadingMask"
            src="images/loading2.gif"
            alt="loading"
          />
          <span className={"LoadingText"}>{props.loadingText}</span>
        </div>
      </LoadingMaskContrainer>
    </>
  );
};

LoadingMask.defaultProps = {
  loadingText: "Loading..."
};
