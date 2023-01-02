<script setup lang="ts">
import {useNewMoodStore} from "../stores/newMood";

const newMoodStore = useNewMoodStore();
</script>

<template>
  <button class="btn btn-lg btn-primary" @click="newMoodStore.save()">Save</button>
</template>