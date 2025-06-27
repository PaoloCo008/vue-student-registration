import { ElMessage, ElMessageBox } from 'element-plus'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import type { Student } from '@/types/globals'

import useLocalStorage from '@/composables/useLocalStorage'

import { getFullName } from '@/lib/helpers'

export const useStudentStore = defineStore('students', () => {
  const route = useRoute()

  const studentList = useLocalStorage<Student[]>('students', [])

  const getStudentById = computed(() => (id: string) => {
    return studentList.value.find((student) => student.id === id)
  })

  const getFilteredStudents = computed(() => {
    const searchQuery = route.query.search as string
    const courseQuery = route.query.course as string

    let filteredStudents = [...studentList.value]

    if (courseQuery) {
      filteredStudents = filteredStudents.filter((s) => s.course === courseQuery)
    }

    if (searchQuery) {
      filteredStudents = filteredStudents.filter(
        (s) =>
          getFullName(s.firstName, s.lastName, s.lastName)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          s.address.toLocaleLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return filteredStudents
  })

  const getSortedStudents = computed(() => {
    const sortQuery = (route.query.sortby as string) || 'admission-desc'

    const [field, direction] = sortQuery.split('-')
    const modifier = direction === 'asc' ? 1 : -1

    const students = getFilteredStudents.value

    if (field === 'age') {
      return students.sort((a, b) => (a[field] - b[field]) * modifier)
    }

    return students
  })

  const getStudentCount = computed(() => {
    return getSortedStudents.value.length
  })

  function registerStudent(student: Student) {
    studentList.value = [...studentList.value, student]

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

  function editStudent(id: string | undefined, newStudentData: Student) {
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
