<script setup>
import { computed } from "vue";
import Header from "~/components/Header.vue";
import { useAuthState } from "~/composables/useAuthState";

const authState = useAuthState();
const userEmail = computed(() => {
  if (process.client) {
    return localStorage.getItem("userEmail") || "Użytkownik";
  }
  return "Użytkownik";
});
</script>

<template>
  <v-app>
    <Header />
    <v-main>
      <div v-if="authState.isLoggedIn" class="welcome-container">
        Witam, {{ userEmail }}
      </div>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<style scoped>
.welcome-container {
  text-align: left;
  padding: 5px 20px;
  color: rgb(var(--v-theme-secondary)); /* Adjust the color as needed */
  font-size: 1.1em;
  font-weight: bold;
}
</style>
