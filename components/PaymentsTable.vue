<template>
  <v-container>
    <v-data-table :items="payments" class="payments-table" :headers="headers">
      <template #item="{ item }">
        <tr class="table-row-payments">
          <td v-for="(key, index) in Object.keys(item)" :key="index">
            <template v-if="key === 'status'">
              <span
                v-if="item['status'] === 'Zapłacone'"
                :style="{
                  color:
                    item[key] === 'Zapłacone'
                      ? 'rgb(var(--v-theme-success))'
                      : '',
                }"
              >
                {{ item[key] }}
              </span>

              <v-btn
                v-if="item['status'] === 'Zapłać online'"
                small
                class="pay-online-btn"
                @click="handlePayment(item)"
              >
                Zapłać online
              </v-btn>
            </template>
            <template v-else-if="key === 'confirmation'">
              <v-btn
                v-if="item['status'] === 'Zapłacone'"
                small
                :style="{
                  backgroundColor: 'rgb(var(--v-theme-primary))',
                  color: 'white',
                }"
              >
                Potwierdzenie
              </v-btn>
            </template>
            <template v-else>
              {{ item[key] }}
            </template>
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- Spacer -->
    <div class="spacer"></div>

    <!-- Bank Account Details -->
    <div class="bank-accounts">
      <h3>Konta bankowe</h3>
      <ul>
        <li><strong>Czesne:</strong> PL25 1750 1312 0190 0000 1494 8821</li>
        <li><strong>Inne:</strong> PL57 1750 1312 0190 0000 1494 8827</li>
        <li><strong>Odsetki:</strong> PL68 1750 1312 0190 0000 1494 8823</li>
        <li><strong>Wpisowe:</strong> PL95 1750 1312 0190 0000 1494 8822</li>
        <li><strong>Szkolenie:</strong> PL84 1750 1312 0190 0000 1494 8826</li>
      </ul>
    </div>
  </v-container>
</template>

<script setup>
import { useUnpaidPayments } from "~/composables/useUnpaidPayments";

const { setUnpaidStatus } = useUnpaidPayments();

const handlePayment = (item) => {
  item.status = "Zapłacone";
  // Check if there are any unpaid payments left
  const hasUnpaid = props.payments.some(
    (payment) => payment.status === "Zapłać online",
  );
  console.log(
    "🚀 ~ file: PaymentsTable.vue:77 ~ handlePayment ~ hasUnpaid:",
    hasUnpaid,
  );
  setUnpaidStatus(hasUnpaid);
};

const props = defineProps({
  payments: Array,
});

const headers = [
  {
    title: "Termin płatności",
    key: "paymentDate",
    headerProps: { style: "background: white; font-weight: bold;" },
  },
  {
    title: "Kwota",
    key: "amount",
    headerProps: { style: "background: white; font-weight: bold;" },
  },
  {
    title: "Tytuł",
    key: "title",
    headerProps: { style: "background: white; font-weight: bold;" },
  },
  {
    title: "Status",
    key: "status",
    headerProps: { style: "background: white; font-weight: bold;" },
  },
  {
    title: "",
    key: "confirmation",
    headerProps: { style: "background: white; font-weight: bold;" },
  },
];
</script>

<style>
.payments-table > .v-table__wrapper > table {
  border-collapse: separate;
  border-spacing: 0 8px !important; /* Add space between rows */
}
.table-row-payments {
  background: #f5f5f5;
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* To ensure rounded corners */
}

.table-row-payments > td {
  background: #f5f5f5; /* Ensure cell backgrounds match the row */
  border: none; /* Remove any default cell borders */
}

.table-row-payments:first-child td:first-child {
  border-top-left-radius: 10px;
}
.table-row-payments:first-child td:last-child {
  border-top-right-radius: 10px;
}

.table-row-payments:last-child td:first-child {
  border-bottom-left-radius: 10px;
}
.table-row-payments:last-child td:last-child {
  border-bottom-right-radius: 10px;
}

.table-row-payments .v-btn {
  margin: 0;
  text-transform: none; /* To keep the button text as provided */
}

.pay-online-btn {
  transition: background-color 0.3s ease;
  background-color: rgb(var(--v-theme-accent));
  color: white;
}

.pay-online-btn:active {
  background-color: rgb(var(--v-theme-success));
}

.spacer {
  margin-top: 50px; /* Large space for visual separation */
}

.bank-accounts {
  padding: 20px;
  background-color: #f0f0f0; /* Light background for the section */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.bank-accounts h3 {
  color: rgb(var(--v-theme-primary)); /* Primary theme color */
  margin-bottom: 15px; /* Space below the title */
}

.bank-accounts ul {
  list-style: none; /* Remove default list styling */
  padding: 0;
}

.bank-accounts li {
  margin-bottom: 10px; /* Space between items */
  font-size: 1.1em; /* Slightly larger font size */
}
</style>
