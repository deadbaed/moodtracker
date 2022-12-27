<script setup lang="ts">
import OpenDatabase from "./components/OpenDatabase.vue";
import {useDatabaseStore} from "./stores/database";


const databaseStore = useDatabaseStore();

</script>

<template>
  <div class="container">
    <h1>MoodTracker</h1>
    <OpenDatabase/>


    <div>is database present <code>{{ databaseStore.present }}</code></div>
  </div>
</template>
