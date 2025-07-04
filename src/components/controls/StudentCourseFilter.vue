<script setup lang="ts">
import useUrl from '@/composables/useUrl'
import { courses } from '@/lib/constants'

const courseRef = useUrl('course', 'all', 'homepage')
</script>

<template>
  <el-select placeholder="Filter by course" size="large" v-model="courseRef" fit-input-width>
    <el-option label="All Courses" value="all" />
    <el-option v-for="course in courses" :key="course" :label="course" :value="course" />
  </el-select>
</template>

<style scoped></style>
