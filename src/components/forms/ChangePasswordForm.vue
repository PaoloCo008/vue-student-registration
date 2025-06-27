<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { PasswordResetForm } from '@/types/forms'

import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()

const passwordResetFormRef = ref<FormInstance>()
const passwordResetForm = reactive<PasswordResetForm>({
  newPassword: '',
  passwordConfirm: '',
})

function validatePasswordConfirm(rule: any, value: any, callback: any) {
  if (value === '') {
    callback(new Error('Please re-enter your new password'))
  } else if (value !== passwordResetForm.newPassword) {
    callback(new Error("Password don't match"))
  } else {
    callback()
  }
}

function validateNewPassword(rule: any, value: any, callback: any) {
  if (value === '') {
    return callback(new Error('Please enter your new password'))
  }

  if (!/[A-Z]/.test(value)) {
    return callback(new Error('Password must contain at least one uppercase letter.'))
  }

  if (!/[a-z]/.test(value)) {
    return callback(new Error('Password must contain at least one lowercase letter.'))
  }

  if (!/[0-9]/.test(value)) {
    return callback(new Error('Password must contain at least one number.'))
  }

  if (!/[^a-zA-Z0-9]/.test(value)) {
    return callback(new Error('Password must contain at least one special character.'))
  }

  return callback()
}

const changePasswordRules = reactive<FormRules<PasswordResetForm>>({
  newPassword: [
    { min: 6, message: 'Password must be at least 6 characters long.' },
    { max: 100, message: 'Password cannot exceed 100 characters.' },
    { validator: validateNewPassword, trigger: 'blur' },
  ],
  passwordConfirm: [{ validator: validatePasswordConfirm, trigger: 'blur' }],
})

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      authStore.changePassword(passwordResetForm.newPassword)
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <el-form ref="passwordResetFormRef" :rules="changePasswordRules" :model="passwordResetForm">
    <el-form-item prop="newPassword">
      <el-input
        v-model.trim="passwordResetForm.newPassword"
        placeholder="New Password"
        type="password"
        show-password
      >
        <template #prefix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="passwordConfirm">
      <el-input
        v-model.trim="passwordResetForm.passwordConfirm"
        placeholder="Password Confirm"
        type="password"
        show-password
      >
        <template #prefix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(passwordResetFormRef)">
        Reset Password
      </el-button>
    </el-form-item>
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
</style>
