<script setup lang="ts"></script>

<template>
  <div class="wrapper-auth">
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper-auth {
  color: #fff;
  height: 100svh;
  background-color: #2148c0;
  padding: 1rem;
  display: grid;
  place-items: center;
  background-image: url(@/assets/background.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
