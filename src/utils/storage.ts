export const rmLocal = (key: string) => {
  localStorage.removeItem(key);
};
export const getLocal = (key: string): string | null => {
  return localStorage.getItem(key);
};
export const setLocal = (key: string, val: string) => {
  return localStorage.setItem(key, val);
};
export const clearLocal = () => {
  return localStorage.clear();
};
