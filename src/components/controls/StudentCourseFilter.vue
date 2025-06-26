<script setup lang="ts">
import useUrl from '@/composables/useUrl'
import { courses } from '@/lib/constants'
import { ref, watch } from 'vue'
import { useRoute, type LocationQueryValue } from 'vue-router'

const { setUrlQuery, removeUrlQuery } = useUrl()
const route = useRoute()
const courseRef = ref<LocationQueryValue | LocationQueryValue[]>(route.query.course)

watch(courseRef, () => {
  if (courseRef.value !== 'all') {
    setUrlQuery('homepage', 'course', courseRef.value as string)
  } else {
    removeUrlQuery('homepage', 'course')
  }
})
</script>

<template>
  <el-select placeholder="Filter by course" size="large" v-model="courseRef">
    <el-option label="All Courses" value="all" />
    <el-option v-for="course in courses" :key="course" :label="course" :value="course" />
  </el-select>
</template>

<style scoped></style>
