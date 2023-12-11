export const logout = () => {
  if (process.client) {
    window.localStorage.removeItem("userEmail");
  }
};
