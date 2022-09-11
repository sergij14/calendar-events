export const getDataFromLS = <T>(key: string) => {
  const data = localStorage.getItem(key) || "[]";
  const json = JSON.parse(data) as T;

  return json;
};
