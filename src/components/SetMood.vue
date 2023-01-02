<script lang="ts">
import slider from "vue3-slider";

export default {
  components: {
    "vue3-slider": slider
  }
};
</script>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useNewMoodStore} from "../stores/newMood";

const newMoodStore = useNewMoodStore();

const mood = ref<number>();
const setMood = (newMood: number) => {
  mood.value = newMood;
};

// Watch when mood value is changed
watch(mood, function(newValue, _oldValue) {
  if (newValue === undefined) {
    return;
  }
  newMoodStore.setMood(newValue);
});

// Set initial mood
setMood(2);

const scales = [
  {
    label: 'super bad',
    value: 0,
    css: 'btn-danger',
  },
  {
    label: 'bad',
    value: 1,
    css: 'btn-warning',
  },
  {
    label: 'neutral',
    value: 2,
    css: 'btn-secondary',
  },
  {
    label: 'good',
    value: 3,
    css: 'btn-info',
  },
  {
    label: 'super good',
    value: 4,
    css: 'btn-success',
  },
];
</script>

<template>
  <h2>How did you feel today?</h2>

  <!-- slider -->
  <div class="m-4">
    <vue3-slider v-model="mood"
                 :height="15"
                 :alwaysShowHandle="true"
                 :sticky=true
                 :min="0"
                 :max="4"
                 :step="1"
                 color="#0d6efd"
                 trackColor="rgba(0,0,0,0.15)"/>
  </div>

  <!-- buttons -->
  <div class="btn-group" role="group" aria-label="Basic mixed styles example">
    <button v-for="scale in scales" type="button" class="btn" :class="scale.css" @click="setMood(scale.value)">
      {{ scale.label }}
    </button>
  </div>

  <!-- current mood -->
  <div class="mt-1">Current mood: <code>{{ scales.at(mood).label }}</code></div>
</template>