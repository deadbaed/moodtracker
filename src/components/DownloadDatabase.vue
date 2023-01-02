<script setup lang="ts">
import {useDatabaseStore} from "../stores/database";
import {useNewMoodStore} from "../stores/newMood";

const databaseStore = useDatabaseStore();
const newMoodStore = useNewMoodStore();

function downloadFile() {
  const blob = databaseStore.download();

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = `${databaseStore.name}-${newMoodStore.getDate}.moodtracker`;
  link.click();
}
</script>

<template>
  <h2>Your mood has been saved</h2>
  <p>You are done! You can download your MoodTracker and close this page.</p>
  <p>See you tomorrow 👋</p>
  <button class="btn btn-primary" @click="downloadFile">Download your MoodTracker</button>

  <p class="mt-2">If you notice the date being incorrect, it is because the dates are stored in UTC format, it's normal!</p>
</template>