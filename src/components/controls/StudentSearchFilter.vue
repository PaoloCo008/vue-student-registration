<script setup lang="ts">
import useUrl from '@/composables/useUrl'
import { useDebounceFn } from '@vueuse/core'
import { ref, watch } from 'vue'
import { useRoute, type LocationQueryValue } from 'vue-router'

const route = useRoute()
const { setUrlQuery, removeUrlQuery } = useUrl()

const searchRef = ref<LocationQueryValue | LocationQueryValue[]>(route.query.search)

const debounce = useDebounceFn(() => {
  if (searchRef.value !== '') {
    setUrlQuery('homepage', 'search', searchRef.value as string)
  } else {
    removeUrlQuery('homepage', 'search')
  }
}, 500)

watch(searchRef, debounce)
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
