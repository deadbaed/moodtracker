<script setup lang="ts">
import OpenDatabase from "./components/OpenDatabase.vue";
import {useDatabaseStore} from "./stores/database";
import DownloadDatabase from "./components/DownloadDatabase.vue";
import NewDatabase from "./components/NewDatabase.vue";


const databaseStore = useDatabaseStore();

</script>

<template>
  <div class="container">
    <h1>MoodTracker</h1>

    <OpenDatabase class="mt-5" v-if="!databaseStore.present"/>

    <div v-if="databaseStore.present" class="mt-5">
      <NewDatabase v-if="!databaseStore.isNameSet"/>
      <div>Hello {{databaseStore.name}}</div>
      <DownloadDatabase/>
    </div>


  </div>
</template>
