import { HTMLPage } from "src/Redux/Reducers/WebPageReducer";

export const DefaultHTMLPage: HTMLPage = {
  Id: 0,
  Title: "Not Found",
  Content: "This page is not found or is not been added yet!",
  IsActive: true
};

export const ErrorHTMLPage: HTMLPage = {
  Id: 0,
  Title: "Error",
  Content: "API Error!",
  IsActive: true
};
