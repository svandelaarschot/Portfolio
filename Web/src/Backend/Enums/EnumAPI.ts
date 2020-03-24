export enum API_TYPE {
  HTMLPage,
  Users,
  News
}

export const API_TYPE_LABEL = new Map<number, string>([
  [API_TYPE.HTMLPage, "HTMLPage"],
  [API_TYPE.News, "News"],
  [API_TYPE.Users, "Users"]
]);
