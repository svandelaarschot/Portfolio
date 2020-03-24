export const setAuthentication = (isAuth: boolean) => {
  localStorage.setItem("isAuth", `${isAuth}`);
};
export const getAuthentication = (): boolean => {
  return localStorage.getItem("isAuth") === "true";
};
