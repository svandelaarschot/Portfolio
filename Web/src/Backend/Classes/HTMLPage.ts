import { Record } from "immutable";

export const HTMLPageRecord = Record({
  id: 0,
  title: "",
  content: "",
  isActive: true
});

export class HTMLPage extends HTMLPageRecord {}
