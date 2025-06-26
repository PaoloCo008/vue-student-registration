<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function handleBack() {
  router.go(-1)
}
</script>

<template>
  <div class="wrapper">
    <h1>Page Not found</h1>
    <el-button @click="handleBack">&lArr; Back</el-button>
  </div>
</template>

<style scoped>
h1 {
  font-size: 4rem;
}

.wrapper {
  width: 100vw;
  height: 100svh;
  display: grid;
  place-content: center;
  text-align: center;
  gap: 2rem;
}

.el-button {
  width: 100px;
  padding: 1.5rem;
  margin: 0 auto;
}

@media screen and (min-width: 750px) {
  h1 {
    font-size: 8rem;
  }
}
</style>
