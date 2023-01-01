<script setup lang="ts">
import {CameraIcon} from '@heroicons/vue/20/solid';
import {ref} from "vue";


const image = ref("");
function loadImage($event: Event) {
  // get file from html form
  const target = $event.target as HTMLInputElement;
  let file = target.files![0];
  image.value = file.name;
  console.log(file);
}
</script>

<template>
  <h2>Add selfie</h2>
  <button class="btn btn-primary" onclick="document.getElementById('add-image').click();">
    <CameraIcon style="width: 1.25rem; height: 1.25rem;" class="me-1" />
    Add image
  </button>
  <input class="d-none" id='add-image' type='file' accept="image/jpeg" @change="loadImage($event)"/>
  <div><code>{{image}}</code></div>
</template>
