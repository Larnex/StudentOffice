<template>
  <v-container class="email-form-container">
    <!-- Title with different color parts -->
    <h2 class="mb-10">
      <span class="title-primary">Online</span>
      <span class="title-info"> biuro obsługi studenta</span>
    </h2>

    <v-fade-transition>
      <div v-if="otpSent">
        <p>Please check your email for the OTP.</p>
      </div>
    </v-fade-transition>

    <v-fade-transition>
      <v-form v-if="!otpSent" @submit.prevent="sendOtp">
        <!-- Text field centered and more narrow -->
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          required
          class="email-input"
        ></v-text-field>
        <v-btn type="submit" color="primary">Log In</v-btn>
      </v-form>
    </v-fade-transition>
  </v-container>
</template>

<script>
import { useAuthState } from "~/composables/useAuthState";
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    sendOtp() {
      if (process.client) {
        window.localStorage.setItem("userEmail", this.email);
        const authState = useAuthState();
        authState.value.isLoggedIn = true;
      }
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.email-form-container {
  text-align: center;
}

.title-primary {
  color: rgb(var(--v-theme-primary));
}

.title-info {
  color: rgb(var(--v-theme-info));
}

.email-input {
  max-width: 500px; /* Adjust the width as needed */
  margin: auto; /* Center the input field */
}
</style>
