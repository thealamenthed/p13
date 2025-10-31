const KEY = "argbank_token";
export const getToken = () => localStorage.getItem(KEY); // renvoie le token si il est present dans le localStorage
export const setToken = (t) => localStorage.setItem(KEY, t); // stocke le token dans le localStorage
export const clearToken = () => localStorage.removeItem(KEY); // efface le token dans le localStorage
