<template>
  <v-container>
    <v-row justify="end">
      <v-col cols="12" sm="3">
        <v-select
          v-model="selectedWeek"
          :items="weekNumbers"
          label="Tydzień"
          class="week-selector"
        ></v-select>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="currentWeekSchedule"
      class="elevation-1"
    >
      <template #item="{ item }">
        <tr>
          <td v-for="(value, key) in item" :key="key" class="table-cell">
            {{ value }}
          </td>
        </tr>
      </template>
    </v-data-table>

    <div class="spacer-between-containers"></div>

    <NewsList :news="newsData" />
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import NewsList from "~/components/NewsList.vue";
import scheduleData from "~/static/schedule.json";
import newsData from "~/static/news.json";

definePageMeta({
  middleware: ["auth"],
});

// Extract week numbers from schedule data
const weekNumbers = computed(() => {
  return scheduleData.map((weekInfo) => weekInfo.week);
});

const selectedWeek = ref(1); // Default to the first week

const currentWeekSchedule = computed(() => {
  const weekSchedule = scheduleData.find(
    (week) => week.week === selectedWeek.value,
  );
  return weekSchedule ? weekSchedule.schedule : [];
});

const headers = [
  {
    title: "Dzień",
    key: "day",
    headerProps: {
      style:
        "background: rgb(var(--v-theme-primary)); color: white; font-weight: bold;",
    },
  },
  {
    title: "Godzina",
    key: "time",
    headerProps: {
      style:
        "background: rgb(var(--v-theme-primary)); color: white; font-weight: bold;",
    },
  },
  {
    title: "Przedmiot",
    key: "course",
    headerProps: {
      style:
        "background: rgb(var(--v-theme-primary)); color: white; font-weight: bold;",
    },
  },
  {
    title: "Sala",
    key: "room",
    headerProps: {
      style:
        "background: rgb(var(--v-theme-primary)); color: white; font-weight: bold;",
    },
  },
  {
    title: "Wykładowca",
    key: "instructor",
    headerProps: {
      style:
        "background: rgb(var(--v-theme-primary)); color: white; font-weight: bold;",
    },
  },
  {
    title: "Grupa",
    key: "group",
    headerProps: {
      style:
        "background: rgb(var(--v-theme-primary)); color: white; font-weight: bold;",
    },
  },
  {
    title: "Typ zajęć",
    key: "classType",
    headerProps: {
      style:
        "background: rgb(var(--v-theme-primary)); color: white; font-weight: bold;",
    },
  },
  {
    title: "Data",
    key: "date",
    headerProps: {
      style:
        "background: rgb(var(--v-theme-primary)); color: white; font-weight: bold;",
    },
  },
];
</script>

<style>
.v-table .v-data-table-footer {
  display: none;
}
.table-cell {
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Box shadow */
}

.v-table > .v-table__wrapper > table {
  border-spacing: 2px;
}
.week-selector {
  max-width: 300px; /* Adjust this value to control the width */
}

.spacer-between-containers {
  margin-top: 35px; /* Adjust the space as needed */
}
</style>
