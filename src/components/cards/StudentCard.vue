<script setup lang="ts">
import type { Student } from '@/types/globals.js'

import { computed } from 'vue'

import { useStudentStore } from '../../stores/StudentsStore.ts'
import StudentForm from '@/components/forms/StudentForm.vue'

import { getFullName, truncate } from '../../lib/helpers.ts'
import AppDrawer from '../AppDrawer.vue'

const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const props = defineProps<{ student: Student }>()

const { id, firstName, middleName, lastName, birthdate, address, age, course } = props.student

const studentStore = useStudentStore()

const fullName = computed(() => getFullName(firstName, middleName, lastName))
</script>

<template>
  <el-card>
    <el-avatar :size="100" :src="circleUrl" />
    <el-dropdown trigger="click">
      <el-button circle>
        <template #icon>
          <el-icon><MoreFilled /></el-icon>
        </template>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <AppDrawer header="Edit Student">
            <template #trigger="props">
              <el-dropdown-item @click="props.handleOpenDrawer"> Edit </el-dropdown-item>
            </template>
            <template #default="props">
              <StudentForm :student @edit="props.handleCloseDrawer" />
            </template>
          </AppDrawer>

          <el-dropdown-item @click="studentStore.deleteStudent(id)">Delete</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <h3 class="card__name">{{ fullName }}</h3>
    <p class="card__course">{{ course }}</p>

    <el-row>
      <!-- <el-table :data="student" style="width: 100%">
        <el-table-column prop="birthdate" width="180" />
        <el-table-column prop="age" width="180" />
        <el-table-column prop="address" />
      </el-table> -->
      <el-tooltip class="box-item" effect="dark" :content="birthdate" placement="top">
        <el-col :span="9">
          <span class="label">Birthdate:</span>
          <p>
            {{ truncate(birthdate, 10) }}
          </p>
        </el-col>
      </el-tooltip>
      <el-col :span="5">
        <span class="label">Age:</span>
        <p>
          {{ age }}
        </p>
      </el-col>
      <el-tooltip class="box-item" effect="dark" :content="address" placement="top">
        <el-col :span="9">
          <span class="label">Address:</span>
          <p>
            {{ truncate(address, 8) }}
          </p>
        </el-col>
      </el-tooltip>
    </el-row>
  </el-card>
</template>

<style scoped>
.card__name {
  margin-bottom: 0.25rem;
}

.card__course {
  margin-bottom: 2rem;
}

.el-avatar {
  margin-bottom: 1.5rem;
  height: 100px;
}

.el-card {
  height: 350px;
  position: relative;
  border-radius: 1rem;
  text-align: center;
  padding: 0.5rem;
  box-shadow: 2px 2px 8px rgb(75, 160, 238, 0.5);
}

:deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

:deep(.el-avatar) {
  max-width: 100px;
  height: 100px;
  display: table;
}

:deep(.el-avatar img) {
  display: block;
  max-width: 100px;
  max-width: 100px;
}

.el-dropdown {
  position: absolute;
  top: 10px;
  right: 10px;
}

.el-row {
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.el-col {
  width: 100%;
}

.label {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 0.75rem;
}
</style>
