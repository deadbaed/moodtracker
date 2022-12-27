<script setup lang="ts">
import {useDatabaseStore} from "../stores/database";

const databaseStore = useDatabaseStore();

function loadFile($event: Event) {
  // get file from html form
  const target = $event.target as HTMLInputElement;
  let file = target.files![0];

  // check file extension
  const fileExtension = file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2);
  if (fileExtension !== "moodtracker") {
    // reset form, show error
    target.value = '';
    alert("please give a \"moodtracker\" file");
    return;
  }

  let fileReader = new FileReader();
  fileReader.onload = function (file) {
    // open file as arraybuffer
    let arrayBuffer = file.target?.result as ArrayBuffer;

    // open as database
    databaseStore.loadFromFile(arrayBuffer);
  };
  fileReader.readAsArrayBuffer(file);
}
</script>

<template>
  <h2>Get started</h2>

  <!-- existing -->
  <div class="mb-1">
    <button class="btn btn-primary" onclick="document.getElementById('existing-file').click();">
      Open existing MoodTracker
    </button>
    <input class="d-none" id='existing-file' type='file' accept=".moodtracker" @change="loadFile($event)"/>
  </div>

  <!-- create new -->
  <button class="btn btn-primary me-1" @click="databaseStore.createNew()">Create new MoodTracker</button>
</template>
