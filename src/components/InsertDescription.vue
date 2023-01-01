<script setup lang="ts">

import {ref} from "vue";

const text = ref("");

function saveText() {
  console.log(text.value);
}
</script>

<template>
  <h2>What happened today?</h2>
  <textarea v-model="text" v-on:change="saveText" class="mb-3 form-control" rows="3"></textarea>
</template>