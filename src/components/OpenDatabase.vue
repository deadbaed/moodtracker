<script setup lang="ts">
import {SQL} from "../main";

function loadFile($event: Event) {
  // get file from html form
  const target = $event.target as HTMLInputElement;
  let file = target.files![0];

  let fileReader = new FileReader();
  fileReader.onload = function (file) {
    // open file as arraybuffer
    let arrayBuffer = file.target?.result as ArrayBuffer;

    // convert to uint8array and open sqlite database
    let uInt8Array = new Uint8Array(arrayBuffer);
    let db = new SQL.Database(uInt8Array);
    console.log(db);

    const moods = db.exec("select * from mood");
    console.log(moods);
  };
  fileReader.readAsArrayBuffer(file);
}
</script>

<template>
  <h2>Get started</h2>
  <div class="mb-3">
    <label for="existing-file" class="form-label">Open existing MoodTracker</label>
    <input class="form-control" id='existing-file' type='file' @change="loadFile($event)"/>
  </div>

  <button class="btn btn-primary me-1">Create new MoodTracker</button>
</template>
