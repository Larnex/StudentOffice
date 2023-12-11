// composables/useAuthState.ts

import { useState } from "#app";

export const useAuthState = () => {
  const authState = useState("auth", () => ({
    isLoggedIn: false,
  }));

  if (process.client) {
    // Client-side logic
    const userEmail = localStorage.getItem("userEmail");
    authState.value.isLoggedIn = !!userEmail; // Sets to true if userEmail exists
  }

  return authState;
};
