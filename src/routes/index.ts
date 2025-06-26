import AuthView from '@/views/AuthView.vue'
import MainView from '@/views/MainView.vue'

import { createWebHistory, createRouter } from 'vue-router'
import { useAuthStore } from '../stores/AuthStore'
import StudentList from '@/components/students/StudentList.vue'
import SignInForm from '@/components/forms/SignInForm.vue'
import ChangePasswordForm from '@/components/forms/ChangePasswordForm.vue'
import FindAccountForm from '@/components/forms/FindAccountForm.vue'
import NotFound from '@/components/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: MainView,
      name: 'homepage',

      children: [
        {
          path: '/',
          component: StudentList,
          name: 'studentlist',
        },
      ],
    },
    {
      path: '',
      component: AuthView,

      redirect: { name: 'signin' },
      children: [
        {
          path: '/signin',
          component: SignInForm,
          name: 'signin',
        },
        {
          path: '/recover',
          name: 'recover',
          redirect: { name: 'findaccount' },
          children: [
            {
              path: 'findaccount',
              component: FindAccountForm,
              name: 'findaccount',
            },
            {
              path: 'passwordreset',
              component: ChangePasswordForm,
              name: 'passwordreset',
            },
          ],
        },
      ],
    },
    { path: '/:catchAll(.*)', name: 'notfound', component: NotFound },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.name === 'homepage' && !authStore.isAuthorized) {
    return next({ name: 'signin' })
  }

  if (to.name === 'signin' && authStore.isAuthorized) {
    return next({ name: 'homepage' })
  }

  if (to.name === 'passwordreset' && !authStore.passwordResetKey) {
    return next({ name: 'signin' })
  }

  if (from.name === 'passwordreset' && authStore.passwordResetKey) {
    localStorage.removeItem('passwordResetKey')
    authStore.passwordResetKey = null
  }

  next()
})

export default router
