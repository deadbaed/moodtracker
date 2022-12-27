<script setup lang="ts">
import OpenDatabase from "./components/OpenDatabase.vue";
import {useDatabaseStore} from "./stores/database";


const databaseStore = useDatabaseStore();

</script>

<template>
  <div class="container">
    <h1>MoodTracker</h1>

    <div class="mt-5">
      <OpenDatabase v-if="!databaseStore.present"/>
    </div>


  </div>
</template>
