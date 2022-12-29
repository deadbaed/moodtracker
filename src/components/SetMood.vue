<script lang="ts">
import slider from "vue3-slider";

export default {
  components: {
    "vue3-slider": slider
  }
};
</script>

<script setup lang="ts">
import {ref} from "vue";

const mood = ref(2);
const scales = [
  {
    label: 'super bad',
    value: 0,
  },
  {
    label: 'bad',
    value: 1,
  },
  {
    label: 'neutral',
    value: 2,
  },
  {
    label: 'good',
    value: 3,
  },
  {
    label: 'super good',
    value: 4,
  },
];

</script>

<template>
  <h2>How did you feel today?</h2>
  <div class="mt-4 mb-4">
    <vue3-slider v-model="mood" :height="10" :alwaysShowHandle="true" :sticky=true :min="0" :max="4"
                 :step="1"
                 color="#0d6efd" trackColor="rgba(0,0,0,0.15)"/>
  </div>
  <div>{{ scales.at(mood).label }}</div>
</template>