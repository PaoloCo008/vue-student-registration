<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

import { courses } from '@/lib/constants'

import { computed, reactive, ref, watch } from 'vue'
import { useStudentStore } from '../../stores/StudentsStore'

import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import type { Student } from '@/types/globals'
import type { StudentForm } from '@/types/forms'
import { calculateAge } from '@/lib/helpers'

const props = defineProps<{ student?: Student }>()
const emits = defineEmits<{ (e: 'register'): void; (e: 'edit'): void }>()

const studentStore = useStudentStore()

const isEditing = computed(() => !!props.student)

const studentFormRef = ref<FormInstance>()
const studentForm = reactive<StudentForm>({
  firstName: props.student?.firstName || '',
  middleName: props.student?.middleName || '',
  lastName: props.student?.lastName || '',
  birthdate: props.student?.birthdate || new Date(),
  age: props.student?.age || '',
  address: props.student?.address || '',
  course: props.student?.course || courses[0],
})

function validateAge(rule: any, value: any, callback: any) {
  if (value === '') {
    callback(new Error('Age is required'))
  } else if (value < 18) {
    callback(new Error('Age should be greater than 18'))
  } else if (value > 100) {
    callback(new Error('Age should not go over 100'))
  } else if (typeof value !== 'number') {
    callback(new Error('Age should be a number'))
  } else {
    callback()
  }
}

const studentFormRules = reactive<FormRules<StudentForm>>({
  firstName: [
    { required: true, message: 'First Name is required', trigger: 'blur' },
    { max: 20, message: 'First Name should not be longer that 20 characters', trigger: 'blur' },
    { min: 2, message: 'First Name should not be shorter that 2 characters', trigger: 'blur' },
  ],

  middleName: [
    { required: true, message: 'Middle Name is required', trigger: 'blur' },
    { max: 30, message: 'Middle Name should not be longer that 30 characters', trigger: 'blur' },
    { min: 2, message: 'Middle Name should not be shorter that 2 characters', trigger: 'blur' },
  ],

  lastName: [
    { required: true, message: 'Last Name is required', trigger: 'blur' },
    { max: 20, message: 'Last Name should not be longer that 20 characters', trigger: 'blur' },
    { min: 2, message: 'Last Name should not be shorter that 2 characters', trigger: 'blur' },
  ],

  birthdate: [{ required: true, message: 'Birthdate is required', trigger: 'blur' }],

  age: [{ validator: validateAge, trigger: 'blur' }],

  address: [
    { required: true, message: 'Address is required', trigger: 'blur' },
    { max: 300, message: 'Address should not be longer that 300 characters', trigger: 'blur' },
    { min: 10, message: 'Address should be longer that 10 characters', trigger: 'blur' },
  ],

  course: [{ required: true, message: 'Please select a course', trigger: 'blur' }],
})

watch(
  () => studentForm.birthdate,
  () => {
    studentForm.age = calculateAge(studentForm.birthdate)
  },
)

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return

  const newStudent = {
    firstName: studentForm.firstName.trim(),
    middleName: studentForm.middleName.trim(),
    lastName: studentForm.lastName.trim(),
    birthdate: format(studentForm.birthdate, 'LLL dd, yyyy'),
    age: Number(studentForm.age),
    address: studentForm.address.trim(),
    course: studentForm.course,
  }

  await formEl.validate((valid, fields) => {
    if (valid) {
      if (isEditing.value) {
        emits('edit')
        studentStore.editStudent(props.student?.id, {
          id: props.student?.id,
          renderId: uuidv4(),
          ...newStudent,
        })
      } else {
        emits('register')
        studentStore.registerStudent({
          id: uuidv4(),
          renderId: uuidv4(),
          ...newStudent,
        })
        formEl.resetFields()
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <el-form ref="studentFormRef" :model="studentForm" :rules="studentFormRules">
    <div>
      <el-form-item label="First Name" label-position="top" prop="firstName">
        <el-input v-model="studentForm.firstName" pattern="[a-zA-Z]*" />
      </el-form-item>

      <el-form-item label="Middle Name" label-position="top" prop="middleName">
        <el-input v-model="studentForm.middleName" />
      </el-form-item>

      <el-form-item label="Last Name" label-position="top" prop="lastName">
        <el-input v-model="studentForm.lastName" />
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Birthdate" label-position="top" prop="birthdate">
            <el-date-picker
              v-model="studentForm.birthdate"
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Age" label-position="top" prop="age">
            <el-input v-model.number="studentForm.age" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Address" label-position="top" prop="address">
        <el-input v-model="studentForm.address" />
      </el-form-item>

      <el-form-item label="Course" label-position="top" prop="course">
        <el-select v-model="studentForm.course" placeholder="Please Choose a Course" size="large">
          <el-option value="Please Choose a Course" disabled />
          <el-option v-for="course in courses" :key="course" :label="course" :value="course" />
        </el-select>
      </el-form-item>
    </div>

    <div class="buttons">
      <el-button @click="resetForm(studentFormRef)"> Reset </el-button>
      <el-button type="primary" @click="submitForm(studentFormRef)">
        {{ isEditing ? 'Edit' : 'Register' }}
      </el-button>
    </div>
  </el-form>
</template>

<style scoped>
.el-form {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.25rem;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.el-button {
  padding: 1.25rem;
}

.el-button + .el-button {
  margin-left: 0;
}
</style>
