export const login = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};
