export default defineNuxtRouteMiddleware((to) => {
  let userEmail;

  if (process.client) {
    userEmail = window.localStorage.getItem("userEmail");
  }

  if (!userEmail && to.path !== "/login") {
    // Redirect to login if no user email is stored
    return navigateTo("/login");
  }
});
