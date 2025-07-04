<script setup lang="ts">
import { reactive, ref } from 'vue'

import type { FormInstance, FormRules } from 'element-plus'
import type { LoginForm } from '@/types/forms'

import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()

const loginFormRef = ref<FormInstance>()
const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
})

function validateLoginPassword(rule: any, value: any, callback: any) {
  if (value === '') {
    callback(new Error('Password is required'))
  } else if (value !== authStore.user.password) {
    callback(new Error('Please provide a valid password.'))
  } else {
    callback()
  }
}

function validateLoginUsername(rule: any, value: any, callback: any) {
  if (value === '') {
    callback(new Error('Username is required'))
  } else if (value !== authStore.user.username) {
    callback(new Error('Please provide a valid username.'))
  } else {
    callback()
  }
}

const loginFormRules = reactive<FormRules<LoginForm>>({
  username: [{ validator: validateLoginUsername }],
  password: [
    { min: 6, message: 'Password must be at least 6 characters long.' },
    { max: 100, message: 'Password cannot exceed 100 characters.' },
    { validator: validateLoginPassword },
  ],
})

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      authStore.loginUser()
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <el-form
    ref="loginFormRef"
    :rules="loginFormRules"
    :model="loginForm"
    @submit.prevent="submitForm(loginFormRef)"
  >
    <el-form-item prop="username">
      <el-input v-model.trim="loginForm.username" placeholder="username" :validate-event="false">
        <template #prefix>
          <el-icon><User /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model.trim="loginForm.password"
        placeholder="password"
        :validate-event="false"
        show-password
      >
        <template #prefix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-button type="primary" native-type="submit"> Login </el-button>
    <RouterLink :to="{ name: 'recover' }" class="form__link">Forgot Password?</RouterLink>
  </el-form>
</template>

<style scoped>
.el-form {
  max-width: 400px;
  width: 100%;
}

:deep(.el-input) {
  --el-input-placeholder-color: rgba(255, 255, 255, 0.75);
  --el-input-icon-color: rgba(255, 255, 255, 0.75);
}

:deep(.el-form-item) {
  margin-bottom: 1.25rem;
}

:deep(.el-input__wrapper) {
  background-color: transparent;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 0.125rem;
}

:deep(.el-input__inner) {
  padding-left: 1.25rem;
  letter-spacing: 1px;
  font-size: 1.125rem;
  color: rgb(255, 255, 255);
}

:deep(.el-input__inner::placeholder) {
  text-transform: uppercase;
}

:deep(.el-input__prefix) {
  font-size: 1.75rem;
}

.el-button {
  font-size: 1rem;
  background-color: rgb(255, 255, 255);
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgb(33, 72, 192);
  width: 100%;
  padding: 1.5rem;
  margin-top: 1rem;
}

.form__link {
  text-align: right;
  color: white;
  font-size: 1.125rem;
  margin-top: 0.5rem;
  display: inline-block;
  width: 100%;
}

.form__link:hover {
  background: none;
  text-decoration: underline;
}
</style>
