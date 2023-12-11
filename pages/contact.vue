<template>
  <v-container>
    <h2>Napisz do nas</h2>
    <div class="mb-5"></div>
    <v-form ref="form" @submit.prevent="sendForm">
      <v-text-field
        v-model="form.subject"
        label="Temat"
        required
      ></v-text-field>
      <v-textarea
        v-model="form.message"
        label="Treść"
        rows="5"
        required
      ></v-textarea>
      <v-btn type="submit" color="primary">Wyślij</v-btn>
    </v-form>
    <div class="response-info">
      Odpowiedź zostanie wysłana na mail uczelniany w przeciągu 2 dni.
    </div>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  subject: "",
  message: "",
});

function sendForm() {
  console.log("Form data:", form.value);
  // Here you would normally handle form submission, e.g., sending data to a server
}
</script>

<style scoped>
.response-info {
  margin-top: 20px;
  color: grey;
  font-style: italic;
}
</style>
