<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { FindAccountForm } from '@/types/forms'

import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()

const findAccountFormRef = ref<FormInstance>()
const passwordResetForm = reactive<FindAccountForm>({
  username: '',
})

function validateUsername(rule: any, value: any, callback: any) {
  if (value === '') {
    callback(new Error('Please enter your username.'))
  } else if (value !== authStore.user.username) {
    callback(new Error('No user found with that username.'))
  } else {
    callback()
  }
}

const findAccountRules = reactive<FormRules<FindAccountForm>>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
})

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      authStore.recoverAccount()
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <el-form
    ref="findAccountFormRef"
    :rules="findAccountRules"
    :model="passwordResetForm"
    @submit.prevent="submitForm(findAccountFormRef)"
  >
    <h1>Account Recovery</h1>

    <p>Please enter a username of one of your accounts to reset your password</p>
    <el-form-item prop="username">
      <el-input v-model.trim="passwordResetForm.username" placeholder="Username">
        <template #prefix>
          <el-icon><User /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" native-type="submit"> Search </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.el-form {
  max-width: 400px;
  width: 100%;
}

h1 {
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  margin-bottom: 1rem;
}

p {
  margin-bottom: 0.75rem;
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
</style>
