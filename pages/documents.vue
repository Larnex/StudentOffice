<template>
  <v-container>
    <!-- Success Notification -->
    <v-alert v-if="showSuccess" type="success" class="mb-3">
      Wniosek został pomyślnie złożony!
    </v-alert>
    <!-- Document Request Form -->
    <v-form @submit.prevent="submitRequest">
      <v-select
        v-model="selectedDocument"
        :items="documentTypes"
        label="Rodzaj dokumentu"
        required
      ></v-select>
      <v-textarea
        v-model="comments"
        label="Komentarze"
        hint="Dodatkowe informacje dotyczące wniosku"
        rows="3"
      ></v-textarea>
      <v-btn type="submit" color="primary">Złóż wniosek</v-btn>
    </v-form>

    <!-- Spacer -->
    <div class="my-5"></div>

    <!-- List of Requests -->
    <v-data-table :items="requests" class="requests-table" :headers="headers">
      <template #item="{ item }">
        <tr class="table-row-requests">
          <td v-for="(value, key) in item" :key="key">
            <template v-if="key === 'status'">
              <span
                :style="{
                  color:
                    item[key] === 'Zrealizowane'
                      ? 'rgb(var(--v-theme-success))'
                      : item[key] === 'W trakcie'
                        ? 'rgb(var(--v-theme-primary))'
                        : '',
                }"
              >
                {{ value }}
              </span>
            </template>
            <template v-else-if="key === 'download' && item[key]">
              <v-btn small class="action-btn">
                {{ value }}
              </v-btn>
            </template>
            <template v-else>
              {{ value }}
            </template>
          </td>
          <td v-if="!item.download">&nbsp;</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import initialRequests from "~/static/documents.json"; // Load the requests data

const requests = ref([...initialRequests]);

const selectedDocument = ref("");
const comments = ref("");
const showSuccess = ref(false);
const documentTypes = [
  "Potwierdzenie statusu studenta",
  "Zaświadczenie o studiowaniu",
  "Inne",
];

const headers = [
  { title: "Data", key: "date" },
  { title: "Dokument", key: "document" },
  { title: "Status", key: "status" },
  { title: "", key: "download", sortable: false },
];

function submitRequest() {
  // Add the new request to the list
  const newRequest = {
    date: new Date().toLocaleDateString("pl-PL"), // Current date in Polish format
    document: selectedDocument.value,
    status: "W trakcie", // Default status for new requests
    download: "", // No download link for new requests
  };
  requests.value.unshift(newRequest); // Add to the beginning of the list

  showSuccess.value = true;
  // Reset form fields
  selectedDocument.value = "";
  comments.value = "";
  setTimeout(() => (showSuccess.value = false), 3000); // Hide success message after 3 seconds
}
</script>

<style>
.requests-table > .v-table__wrapper > table {
  border-collapse: separate;
  border-spacing: 0 8px !important; /* Add space between rows */
}

.table-row-requests {
  background: #f5f5f5;
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* To ensure rounded corners */
}

.table-row-requests > td {
  background: #f5f5f5; /* Ensure cell backgrounds match the row */
  border: none; /* Remove any default cell borders */
}

.table-row-requests:first-child td:first-child {
  border-top-left-radius: 10px;
}
.table-row-requests:first-child td:last-child {
  border-top-right-radius: 10px;
}

.table-row-requests:last-child td:first-child {
  border-bottom-left-radius: 10px;
}
.table-row-requests:last-child td:last-child {
  border-bottom-right-radius: 10px;
}

.action-btn {
  transition: background-color 0.3s ease;
  background-color: rgb(var(--v-theme-primary));
  color: white;
}

.action-btn:active {
  background-color: rgb(var(--v-theme-success));
}
</style>
