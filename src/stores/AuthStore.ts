import type { User } from '@/types/globals'

import useLocalStorage from '@/composables/useLocalStorage'

import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import { v4 as uuidv4 } from 'uuid'
import { ElMessage } from 'element-plus'

export const useAuthStore = defineStore('auth', () => {
  const isAuthorized = useLocalStorage<boolean>('isAuthorized', false)
  const user = useLocalStorage<User>('user', {
    username: import.meta.env.VITE_ADMIN_USERNAME,
    password: import.meta.env.VITE_ADMIN_PASSWORD,
  })
  const passwordResetKey = useLocalStorage<string | null>('passwordResetKey', null)

  const router = useRouter()

  function loginUser() {
    isAuthorized.value = true

    router.push({ name: 'homepage' })
    ElMessage({
      message: `Welcome, ${user.value.username}`,
      type: 'success',
    })
  }

  function logoutUser() {
    isAuthorized.value = false
    router.push({ name: 'signin' })
    ElMessage({
      message: 'Successfully logged out',
      type: 'success',
    })
  }

  function changePassword(newPassword: string) {
    user.value.password = newPassword
    passwordResetKey.value = null
    router.push({ name: 'signin' })
    ElMessage({
      message: 'Password successfully changed',
      type: 'success',
    })
  }

  function recoverAccount() {
    passwordResetKey.value = uuidv4()
    router.push({ name: 'passwordreset' })
  }

  return {
    passwordResetKey,
    user,
    isAuthorized,
    changePassword,
    loginUser,
    logoutUser,
    recoverAccount,
  }
})
