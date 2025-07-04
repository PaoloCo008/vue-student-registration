import { ElMessage, ElMessageBox } from 'element-plus'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import type { Student } from '@/types/globals'

import useLocalStorage from '@/composables/useLocalStorage'

import { students } from '@/lib/constants'
import { getFullName } from '@/lib/helpers'

export const useStudentStore = defineStore('students', () => {
  const route = useRoute()

  const studentList = useLocalStorage<Student[]>('students', students)

  const getStudentById = computed(() => (id: string) => {
    return studentList.value.find((student) => student.id === id)
  })

  const getFilteredStudents = computed(() => {
    const searchQuery = route.query.search as string
    const courseQuery = (route.query.course as string) || ''

    let queries = [...new Set(searchQuery?.split(' ') || [])]

    if (queries.length > 1) {
      queries = queries.filter((query, i, arr) => {
        const regex = new RegExp(`^${query}`, 'gim')

        if (arr.filter((q) => q !== query).some((el: string) => regex.test(el))) return false

        return true
      })
    }

    let filteredStudents = [...studentList.value]

    if (courseQuery) {
      filteredStudents = filteredStudents.filter((s) => s.course === courseQuery)
    }

    if (searchQuery) {
      filteredStudents = queries.reduce((acc, query) => {
        const regex = new RegExp(`^${query}|${query}`, 'gim')

        return acc.filter((student) => {
          const filterFields = ['firstName', 'middleName', 'lastName', 'address']

          for (let i = 0; i < filterFields.length; i++) {
            if (regex.test(student[filterFields[i] as keyof Student] as string)) {
              filterFields.splice(i, 1)
              return true
            }
          }
          return false
        })
      }, filteredStudents)
    }

    return filteredStudents
  })

  const getSortedStudents = computed(() => {
    const sortQuery = (route.query.sortby as string) || 'admission-asc'

    const [field, direction] = sortQuery.split('-')
    const modifier = direction === 'asc' ? 1 : -1

    const students = getFilteredStudents.value

    if (field === 'age') {
      return students.sort((a, b) => (a[field] - b[field]) * modifier)
    }

    if (field === 'name') {
      return students.sort(
        (a, b) =>
          getFullName(a.firstName, a.lastName, a.middleName).localeCompare(
            getFullName(b.firstName, b.lastName, b.middleName),
          ) * modifier,
      )
    }

    if (field === 'admission') {
      return students.sort(
        (a, b) =>
          (new Date(b.registeredDate).getTime() - new Date(a.registeredDate).getTime()) * modifier,
      )
    }

    return students
  })

  const getStudentCount = computed(() => {
    return getSortedStudents.value.length
  })

  function registerStudent(student: Student) {
    studentList.value = [student, ...studentList.value]

    ElMessage({
      type: 'success',
      message: `User successfully registered`,
    })
  }

  function deleteStudent(id: string) {
    ElMessageBox.confirm(
      'Are you sure you want to delete this student?',
      `Deleting user ${getStudentById.value(id)?.firstName}`,
      {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
      },
    )
      .then(() => {
        studentList.value = studentList.value.filter((student) => student.id !== id)
        ElMessage({
          type: 'success',
          message: 'User successfully deleted',
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Delete canceled',
        })
      })
  }

  function editStudent(id: string, newStudentData: Student) {
    setTimeout(() => {
      studentList.value = studentList.value.map((student) =>
        student.id === id ? newStudentData : student,
      )
    }, 200)

    setTimeout(() => {
      ElMessage({
        type: 'success',
        message: `User successfully editted`,
      })
    }, 500)
  }

  return {
    studentList,
    getStudentCount,
    getStudentById,
    getSortedStudents,
    registerStudent,
    deleteStudent,
    editStudent,
  }
})
