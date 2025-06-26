<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const drawer = ref<boolean>(false)
const size = ref<number>(60)
const props = defineProps<{ header: string }>()

function handleCloseDrawer() {
  drawer.value = false
}

function handleOpenDrawer() {
  drawer.value = true
}

function onResize() {
  if (window.innerWidth <= 750) {
    size.value = 80
  } else if (window.innerWidth <= 1500) {
    size.value = 60
  } else {
    size.value = 30
  }
}

onMounted(() => {
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <slot name="trigger" :handleOpenDrawer></slot>
  <Teleport to="body">
    <el-drawer v-model="drawer" :size="`${size}%`">
      <template #header>
        <h3>{{ props.header }}</h3>
      </template>
      <slot name="default" :handleCloseDrawer></slot>
    </el-drawer>
  </Teleport>
</template>

<style scoped></style>
