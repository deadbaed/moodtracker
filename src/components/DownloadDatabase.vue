<script setup lang="ts">
import {useDatabaseStore} from "../stores/database";

const databaseStore = useDatabaseStore();

function downloadFile() {
  const blob = databaseStore.download();

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = `${databaseStore.name}.moodtracker`;
  link.click();
}
</script>

<template>
  <button class="btn btn-primary" @click="downloadFile">Download your MoodTracker</button>
</template>