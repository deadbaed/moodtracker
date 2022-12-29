<script setup lang="ts">
import OpenDatabase from "./components/OpenDatabase.vue";
import {useDatabaseStore} from "./stores/database";
import DownloadDatabase from "./components/DownloadDatabase.vue";
import NewDatabase from "./components/NewDatabase.vue";
import AddImage from "./components/AddImage.vue";

const databaseStore = useDatabaseStore();

</script>

<template>
  <div class="container">
    <h1>MoodTracker</h1>

    <!-- open or create -->
    <div class="mt-5">
      <OpenDatabase v-if="!databaseStore.isDatabaseSet"/>
      <NewDatabase v-else-if="!databaseStore.isNameSet"/>
    </div>

    <!-- main app -->
    <div class="mt-5" v-if="databaseStore.setupIsComplete">
      <h2>Hello {{databaseStore.name}}!</h2>

      <AddImage/>
      <DownloadDatabase/>
    </div>

  </div>
</template>
