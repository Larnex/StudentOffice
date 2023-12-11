<template>
  <v-app-bar app>
    <v-toolbar-title>
      <nuxt-link to="/">
        <img src="../assets/layout_set_logo 1.png" alt="Logo" height="40" />
      </nuxt-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-if="authState.isLoggedIn">
      <!-- Navigation items -->
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/payments">
        <span>Płatności</span>
        <template v-if="unpaidPayments">
          <v-icon
            style="padding-left: 5px"
            icon="mdi-alert-circle"
            color="rgb(var(--v-theme-error))"
          ></v-icon> </template
      ></v-btn>
      <v-btn text to="/documents">Dokumenty</v-btn>
      <v-btn text to="/contact">Kontakty</v-btn>

      <!-- Logout button -->
      <v-btn text color="error" @click="handleLogout">Log Out</v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
// Your JavaScript content here
import { useRouter } from "vue-router";
import { useAuthState } from "~/composables/useAuthState";
import { logout } from "~/composables/useAuth";
import { useUnpaidPayments } from "~/composables/useUnpaidPayments";

const authState = useAuthState();
const { unpaidPayments } = useUnpaidPayments();
const router = useRouter();

const handleLogout = () => {
  logout();
  authState.value.isLoggedIn = false;
  router.push("/login");
};
</script>

<style>
/* Your CSS styles here */
.v-btn {
  font-weight: bold;
}
</style>
