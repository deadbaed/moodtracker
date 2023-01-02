<script setup lang="ts">
import {ref} from "vue";
import {useNewMoodStore} from "../stores/newMood";

const newMoodStore = useNewMoodStore();

const text = ref<string>();

function saveText() {
  // On empty text, set to null
  if (text.value === '') {
    text.value = undefined;
    newMoodStore.noText();
  }
  if (text.value === undefined) {
    return;
  }

  // Store text to store
  newMoodStore.setText(text.value);
}
</script>

<template>
  <h2>What happened today?</h2>
  <textarea v-model="text" v-on:change="saveText" class="mb-3 form-control" rows="3"></textarea>
</template>