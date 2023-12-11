<template>
  <v-container>
    <PaymentsTable :payments="paymentsData" />
  </v-container>
</template>

<script setup>
import PaymentsTable from "~/components/PaymentsTable.vue";
import paymentsData from "~/static/payments.json";
</script>
