<script setup lang="ts">
import { useStudentStore } from '../../stores/StudentsStore'

import StudentCard from '../cards/StudentCard.vue'

const studentStore = useStudentStore()
</script>

<template>
  <div class="card-wrapper">
    <StudentCard
      v-for="student in studentStore.getPaginatedStudents"
      :key="student.renderId"
      :student
    />
  </div>
</template>

<style scoped>
.card-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  place-items: center;
  gap: 2rem;
}

@media screen and (min-width: 850px) {
  .card-wrapper {
    grid-template-columns: repeat(2, minmax(280px, 1fr));
  }
}

@media screen and (min-width: 1200px) {
  .card-wrapper {
    grid-template-columns: repeat(3, minmax(280px, 1fr));
  }
}

@media screen and (min-width: 1500px) {
  .card-wrapper {
    grid-template-columns: repeat(4, minmax(280px, 1fr));
  }
}
</style>
