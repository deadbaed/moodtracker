<script setup lang="ts">
import {useDatabaseStore} from "../stores/database";
import {ref} from "vue";

const databaseStore = useDatabaseStore();

const name = ref("");
function saveName() {
  databaseStore.setName(name.value);
}

</script>

<template>
  <h2>Welcome!</h2>

  <p>What's your name?</p>
  <div class="mb-3">
    <input v-model="name" type="text" class="form-control" placeholder="My name is...">
    <button @click="saveName" class="btn btn-primary mt-1">Save</button>
  </div>
</template>