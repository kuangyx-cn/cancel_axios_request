<template>
  <div class="home">
    <input
      v-model="a"
      placeholder=""
      size="normal"
      clearable
      @change=""
    />
    <router-link to="/test">to test page</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import http from '../utils/http'
const a = ref("");

watchEffect(() => {
  console.log(a.value,'eff');
  http.get('/')
})

</script>

<style lang="scss" scoped></style>
