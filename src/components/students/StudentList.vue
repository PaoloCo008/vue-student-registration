<script setup lang="ts">
import { useStudentStore } from '../../stores/StudentsStore'

import StudentCard from '../cards/StudentCard.vue'

const studentStore = useStudentStore()
</script>

<template>
  <el-space :size="20" wrap>
    <StudentCard
      v-for="student in studentStore.getSortedStudents"
      :key="student.renderId"
      :student
    />
  </el-space>
</template>

<style scoped>
.el-space {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>
