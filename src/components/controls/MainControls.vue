<script setup lang="ts">
import StudentCourseFilter from './StudentCourseFilter.vue'
import StudentSearchFilter from './StudentSearchFilter.vue'
import StudentSort from './StudentSort.vue'
</script>

<template>
  <div class="controls-wrapper">
    <StudentSearchFilter />
    <div class="control-group">
      <StudentCourseFilter />
      <StudentSort />
    </div>
  </div>
</template>

<style scoped>
.control-group {
  display: flex;
  gap: 1rem;
}

.controls-wrapper {
  margin-bottom: 2rem;
}
</style>
