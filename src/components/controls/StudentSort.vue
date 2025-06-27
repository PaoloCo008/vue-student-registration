<script setup lang="ts">
import { sortByOptions } from '@/lib/constants'
import useUrl from '../../composables/useUrl'

const sortByRef = useUrl('sortby', 'admission-desc', 'homepage')

// const sortByRef = ref<LocationQueryValue | LocationQueryValue[]>(
//   route.query.sortby || 'admission-desc',
// )

// watch(sortByRef, () => {
//   setUrlQuery('homepage', 'sortby', sortByRef.value as string)
// })
</script>

<template>
  <el-select placeholder="Sort By" size="large" v-model="sortByRef">
    <el-option
      v-for="options in sortByOptions"
      :key="options.value"
      :label="options.label"
      :value="options.value"
    />
  </el-select>
</template>

<style scoped></style>
