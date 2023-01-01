<script lang="ts">
import Camera from "simple-vue-camera";

export default {
  components: {
    "camera": Camera
  }
};
</script>

<script setup lang="ts">
import {PhotoIcon, CameraIcon, VideoCameraIcon, VideoCameraSlashIcon} from '@heroicons/vue/20/solid';
import {ref} from "vue";

// Upload existing image
const image = ref<string>();

function loadImage($event: Event) {
  // get file from html form
  const target = $event.target as HTMLInputElement;
  let file = target.files![0];
  image.value = file.name;
  console.log(file);
}

// Take image from webcam
const cameraRef = ref<InstanceType<typeof Camera>>();
const cameraSpinner = ref(false);
const canTakePicture = ref(false);
const errorMsg = ref<string>();
const cameraPicture = ref<{ blob: Blob, url: string } | undefined>();

const startCamera = () => {
  console.log('starting camera');
  cameraRef.value?.start();
  cameraSpinner.value = true;
}
const stopCamera = () => {
  console.log('stopping camera');
  cameraRef.value?.stop();
}
const takePicture = () => {
  console.log('taking picture');
  cameraRef.value?.snapshot();
}

// Camera callbacks
const started = () => {
  console.log("Camera has started");
  cameraSpinner.value = false;
  canTakePicture.value = true;
};
const stopped = () => {
  console.log("Camera has stopped");
  canTakePicture.value = false;
};
const snapshot = (blob: Blob) => {
  console.log("A snapshot has been taken");
  const url = URL.createObjectURL(blob);
  cameraPicture.value = {blob, url};
}
const error = (error: Error) => {
  console.log("error", error);
  errorMsg.value = error.message;
}
</script>

<template>
  <h2>Add selfie</h2>

  <div>
    <!-- upload image -->
    <h3>From existing image</h3>
    <div>
      <button class="btn btn-primary" onclick="document.getElementById('add-image').click();">
        <PhotoIcon style="width: 1.25rem; height: 1.25rem;" class="me-1"/>
        Add image
      </button>
      <input class="d-none" id='add-image' type='file' accept="image/jpeg" @change="loadImage($event)"/>
      <div><code>{{ image }}</code></div>
    </div>
  </div>

  <!-- from webcam -->
  <div class="mt-2">
    <h3>Take picture with webcam</h3>
    <div class="mb-1">
      <div class="alert alert-danger" role="alert" v-if="errorMsg">{{ errorMsg }}</div>

      <!-- start webcam -->
      <button class="btn btn-success me-1" @click="startCamera" :disabled="canTakePicture">
        <VideoCameraIcon style="width: 1.25rem; height: 1.25rem;" class="me-1"/>
        Start camera
      </button>

      <!-- stop camera -->
      <button class="btn btn-danger me-1" @click="stopCamera">
        <VideoCameraSlashIcon style="width: 1.25rem; height: 1.25rem;" class="me-1"/>
        Stop camera
      </button>

      <!-- take pic from webcam -->
      <button class="btn btn-primary me-1" @click="takePicture" :disabled="!canTakePicture">
        <CameraIcon style="width: 1.25rem; height: 1.25rem;" class="me-1"/>
        Take picture
      </button>
    </div>

    <div>
      <!-- webcam spinner -->
      <div class="spinner-border" role="status" v-if="cameraSpinner">
        <span class="visually-hidden">Loading...</span>
      </div>

      <!-- webcam -->
      <camera :resolution="{ width: 800, height: 600 }" ref="cameraRef" :autoplay="false"
              @started="started"
              @stopped="stopped"
              @snapshot="snapshot"
              @error="error"
      ></camera>

      <!-- picture taken from webcam -->
      <img v-if="cameraPicture !== undefined"
           :src="cameraPicture.url"
           alt="image from webcam"
           class="img-thumbnail img-fluid">
    </div>
  </div>
</template>
