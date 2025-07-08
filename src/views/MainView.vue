<script setup lang="ts">
import AppDrawer from '@/components/AppDrawer.vue'
import AppPagination from '@/components/AppPagination.vue'
import MainControls from '@/components/controls/MainControls.vue'
import StudentForm from '@/components/forms/StudentForm.vue'
import StudentList from '@/components/students/StudentList.vue'

import { useAuthStore } from '@/stores/AuthStore'
import { useStudentStore } from '@/stores/StudentsStore'
import { type DropdownInstance } from 'element-plus'

const authStore = useAuthStore()
const studentStore = useStudentStore()

import { ref } from 'vue'

const dropdown = ref<DropdownInstance>()

function showClick() {
  if (!dropdown.value) return
  dropdown.value.handleOpen()
}
</script>

<template>
  <el-container>
    <!-- Header -->
    <el-header>
      <el-button circle @click="showClick">
        <el-dropdown ref="dropdown" trigger="click">
          <el-avatar
            class="mr-3"
            :size="32"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="authStore.logoutUser"> Logout </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-button>
      <p class="header__user">{{ authStore.user.username }}</p>
    </el-header>

    <!-- Body -->
    <el-main>
      <div class="wrapper">
        <header class="body-header">
          <h2 class="body-header__main">Registered Students</h2>

          <el-tag effect="dark" round>
            <span v-if="studentStore.getPaginatedStudentCount !== 1">
              {{ studentStore.getPaginatedStudentCount }} Students
            </span>
            <span v-else> 1 Student </span>
          </el-tag>
        </header>

        <!-- Controls -->
        <MainControls />

        <!-- Student List -->
        <StudentList v-if="!!studentStore.getPaginatedStudentCount" />
        <el-empty v-else description="No current students" />

        <!-- Pagination -->
        <AppPagination v-if="!!studentStore.getPaginatedStudentCount" />
      </div>
    </el-main>

    <AppDrawer header="Register Student">
      <template #trigger="props">
        <el-button round @click="props.handleOpenDrawer" class="register__button">
          <template #icon>
            <el-icon><UserFilled /></el-icon
          ></template>
          Register
        </el-button>
      </template>
      <template #default="props">
        <StudentForm @register="props.handleCloseDrawer" />
      </template>
    </AppDrawer>
  </el-container>
</template>

<style scoped>
.body-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  gap: 1rem;
}

.body-header__main {
  font-size: 1.625rem;
  margin-bottom: 2.5rem;
  letter-spacing: 1px;
  margin: auto 0;
}

.el-header {
  background-color: hsla(225, 68%, 47%, 0.9);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 2px solid #1640bc;
  padding: 0 4.125rem;
}

.header__user {
  color: #fff;
  text-transform: uppercase;
  margin: 0.25rem 0 0 1rem;
}

.register__button {
  background-color: rgb(255, 255, 255);
  font-size: 1.25rem;
  padding: 1.25rem 1.5rem;
  position: fixed;
  bottom: 2.5rem;
  right: 2rem;
  z-index: 999;
}

.el-main {
  height: calc(100svh - 60px);
  width: 100%;
}

.wrapper {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0.75rem 0 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.el-tag--dark {
  --el-tag-bg-color: rgb(68, 91, 237);
}

@media screen and (min-width: 550px) {
  .el-main {
    padding: 3.5rem 4.125rem;
  }

  .body-header__main {
    font-size: 2.25rem;
  }
}
</style>
