<script setup lang="ts">

import {ref} from "vue";
import {MapPinIcon} from '@heroicons/vue/20/solid';
import {Location} from "../stores/newMood";

const errorMsg = ref<string>();
const showSpinner = ref(false);
const location = ref<Location | undefined>();

function locatorButtonPressed() {
  showSpinner.value = true;
  navigator.geolocation.getCurrentPosition(
      position => {
        showSpinner.value = false;

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        if (location.value === undefined) {
          location.value = {latitude, longitude};
        } else {
          location.value.latitude = latitude;
          location.value.longitude = longitude;
        }
      },
      error => {
        showSpinner.value = false;
        errorMsg.value = error.message;
        console.log(error.message);
      },
  )
}
</script>

<template>
  <h2>Where are you?</h2>
  <div class="mb-2">
    <button @click="locatorButtonPressed" class="btn btn-primary mt-2" :disabled="showSpinner">
      <!-- normal -->
      <MapPinIcon v-if="!showSpinner" style="width: 1.25rem; height: 1.25rem;" class="me-1" />
      <span v-if="!showSpinner">Get location</span>

      <!-- pressed -->
      <span v-if="showSpinner" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
      <span v-if="showSpinner">Getting location...</span>
    </button>
  </div>

  <div class="alert alert-danger" role="alert" v-if="errorMsg">{{ errorMsg }}</div>

  <div v-if="location">
    <ul>
      <li>latitude: <code>{{ location.latitude }}</code></li>
      <li>longitude: <code>{{ location.longitude }}</code></li>
    </ul>
    <ul>
      <li><a target="_blank" :href="'https://maps.apple.com/?address=' + location.latitude + ',' + location.longitude">
        open in apple maps</a></li>
      <li><a target="_blank" :href="'https://www.google.com/maps/search/?api=1&query=' + location.latitude + ',' + location.longitude">
        open in google maps</a></li>
    </ul>
  </div>
</template>