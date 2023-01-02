<script setup lang="ts">
import OpenDatabase from "./components/OpenDatabase.vue";
import {useDatabaseStore} from "./stores/database";
import {useNewMoodStore} from "./stores/newMood";
import DownloadDatabase from "./components/DownloadDatabase.vue";
import NewDatabase from "./components/NewDatabase.vue";
import AddImage from "./components/AddImage.vue";
import SetMood from "./components/SetMood.vue";
import InsertDescription from "./components/InsertDescription.vue";
import GetLocation from "./components/GetLocation.vue";
import Save from "./components/Save.vue";

const databaseStore = useDatabaseStore();
const newMoodStore = useNewMoodStore();

const geolocationTest = () => 'geolocation' in navigator;

</script>

<template>
  <div class="container my-2">
    <h1>MoodTracker</h1>

    <!-- open or create -->
    <div class="mt-5">
      <OpenDatabase v-if="!databaseStore.isDatabaseSet"/>
      <NewDatabase v-else-if="!databaseStore.isNameSet"/>
    </div>

    <!-- main app -->
    <div class="mt-5" v-if="databaseStore.setupIsComplete && !newMoodStore.isMoodSaved">
      <h2>Hello {{ databaseStore.name }}!</h2>

      <SetMood/>
      <InsertDescription/>
      <GetLocation v-if="geolocationTest()"/>
      <AddImage/>

      <Save/>
    </div>

    <!-- final -->
    <div class="mt-5" v-if="newMoodStore.isMoodSaved">
      <DownloadDatabase/>
    </div>

    <footer>
      <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
        <p>Made with ❤️ by <a href="https://philippeloctaux.com">phil</a></p>
      </div>
    </footer>

  </div>
</template>
