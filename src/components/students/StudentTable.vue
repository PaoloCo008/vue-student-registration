<script setup lang="ts">
import { useStudentStore } from '@/stores/StudentsStore'
import { ref } from 'vue'
import StudentForm from '@/components/forms/StudentForm.vue'

const studentStore = useStudentStore()

const drawer = ref(false)
</script>

<template>
  <el-table :data="studentStore.studentList" height="1150" style="width: 100%" stripe>
    <el-table-column prop="firstName" label="First Name" width="180" />
    <el-table-column prop="middleName" label="Middle Name " width="180" />
    <el-table-column prop="lastName" label="Last Name " width="180" />
    <el-table-column prop="address" label="Address" show-overflow-tooltip />
    <el-table-column prop="age" label="Age" />
    <el-table-column prop="birthdate" label="Birthdate" />
    <el-table-column prop="course" label="Course" show-overflow-tooltip />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="drawer = true">
          Edit
          <Teleport to="body">
            <el-drawer v-model="drawer" :size="60 + '%'">
              <StudentForm
                :student="studentStore.getStudentById(scope.$index + 1)"
                @edit="drawer = false"
              />
            </el-drawer>
          </Teleport>
        </el-button>
        <el-button
          link
          type="primary"
          size="small"
          @click="studentStore.deleteStudent(scope.$index + 1)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped></style>
