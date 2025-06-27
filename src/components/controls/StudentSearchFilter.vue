<script setup lang="ts">
import useUrl from '@/composables/useUrl'

const searchRef = useUrl('search', '', 'homepage', { debounce: true })
</script>

<template>
  <el-input v-model="searchRef" placeholder="Search by name or address" />
</template>

<style scoped>
.el-input {
  margin-bottom: 0.75rem;
}

:deep(.el-input__wrapper) {
  padding: 0.5rem 1rem;
}
</style>
