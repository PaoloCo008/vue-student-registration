<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { Course, Student } from '@/types/globals'
import type { StudentForm } from '@/types/forms'

import { courses, MAX_AGE, MIN_AGE } from '@/lib/constants'

import { computed, reactive, ref, watchEffect } from 'vue'
import { useStudentStore } from '../../stores/StudentsStore'

import { subYears } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import { calculateAge, capitalize, validNameInput } from '@/lib/helpers'

const props = defineProps<{ student?: Student }>()
const emits = defineEmits<{ (e: 'register'): void; (e: 'edit'): void }>()

const studentStore = useStudentStore()

const isEditing = computed(() => !!props.student)
const defaultDate = computed(() => subYears(new Date(), MIN_AGE))
const lastDate = computed(() => subYears(new Date(), MAX_AGE))

const studentFormRef = ref<FormInstance>()
const studentForm = reactive<StudentForm>({
  firstName: props.student?.firstName || '',
  middleName: props.student?.middleName || '',
  lastName: props.student?.lastName || '',
  birthdate: props.student?.birthdate || defaultDate.value,
  age: props.student?.age || '',
  address: props.student?.address || '',
  course: props.student?.course || courses[0],
})

watchEffect(() => {
  studentForm.age = calculateAge(studentForm.birthdate)
})

function validateNames(rule: any, value: any, callback: any) {
  const field = rule.field.split(/(?=[A-Z])/g)
  const fieldString = `${capitalize(field[0])} ${field[1][0].toLowerCase() + field[1].slice(1)}`
  const trimmedValue = value.trim()
  const nameRegex =
    /^(?!-)(?!.*\s{2})(?!.*[\p_]{2,})(?!.*\d)[a-zA-Z\s-\u00C0-\u024F\u1E00-\u1EFF]+.*(?<!-)$/g

  if (!trimmedValue && rule.field !== 'middleName') {
    return new Error(`${fieldString} is required`)
  }

  if (trimmedValue) {
    // [a-zA-Z\s-]
    // [a-zA-Z\u00C0-\u024F\u1E00-\u1EFF-\S*]
    // ^(?!.*\s{2})(?!.*__)[a-zA-Z\s-\u00C0-\u024F\u1E00-\u1EFF]+(?!.*\d).*$
    if (!nameRegex.test(value)) {
      return new Error(
        `${fieldString} can only contain letters, spaces, and a single dashes between names`,
      )
    }
    if (trimmedValue.length > 20) {
      return new Error(`${fieldString} cannot exceed 20 characters`)
    }
    if (trimmedValue.length < 2) {
      return new Error(`${fieldString} must be at least 2 characters`)
    }

    if (!validNameInput(trimmedValue)) {
      return new Error(
        `${fieldString} is invalid. You cannot repeat a name inbetween dashes more than three times`,
      )
    }
  }

  return callback()
}

function validateAddress(rule: any, value: any, callback: any) {
  if (!value.trim()) {
    return new Error(`${capitalize(rule.field)} is required`)
  }

  if (value.trim().length > 300) {
    return new Error(`${capitalize(rule.field)} cannot exceed 300 characters`)
  }

  if (value.trim().length < 10) {
    return new Error(`${capitalize(rule.field)} must be at least 10 characters`)
  }

  return callback()
}

const studentFormRules = reactive<FormRules<StudentForm>>({
  firstName: [{ validator: validateNames, trigger: 'blur' }],

  middleName: [{ validator: validateNames, trigger: 'blur' }],

  lastName: [{ validator: validateNames, trigger: 'blur' }],

  birthdate: [{ required: true, message: 'Birthdate is required', trigger: 'blur' }],

  address: [{ validator: validateAddress, trigger: 'blur' }],

  course: [{ required: true, message: 'Please select a course', trigger: 'blur' }],
})

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
    if (valid) {
      const newStudent = {
        firstName: capitalize(studentForm.firstName),
        middleName: studentForm.middleName?.trim() ? capitalize(studentForm.middleName) : '',
        lastName: capitalize(studentForm.lastName),
        birthdate: format(studentForm.birthdate, 'LLL dd, yyyy'),
        age: Number(studentForm.age),
        address: studentForm.address.trim(),
        course: studentForm.course as Course,
      }

      if (isEditing.value) {
        emits('edit')
        studentStore.editStudent(props.student!.id, {
          id: props.student!.id,
          renderId: uuidv4(),
          registeredDate: props.student!.registeredDate,
          ...newStudent,
        })
      } else {
        emits('register')
        studentStore.registerStudent({
          id: uuidv4(),
          renderId: uuidv4(),
          registeredDate: new Date(),
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
  <el-form
    ref="studentFormRef"
    :model="studentForm"
    :rules="studentFormRules"
    @submit.prevent="submitForm(studentFormRef)"
  >
    <div>
      <el-form-item label="First Name" label-position="top" prop="firstName">
        <el-input v-model="studentForm.firstName" />
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
              :editable="false"
              :disabled-date="(date: Date) => date > defaultDate || date < lastDate"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Age" label-position="top" prop="age">
            <el-input v-model.number="studentForm.age" disabled />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Address" label-position="top" prop="address">
        <el-input v-model="studentForm.address" />
      </el-form-item>

      <el-form-item label="Course" label-position="top" prop="course">
        <el-select
          v-model="studentForm.course"
          placeholder="Please Choose a Course"
          size="large"
          fit-input-width
        >
          <el-option value="Please Choose a Course" disabled />
          <el-option v-for="course in courses" :key="course" :label="course" :value="course" />
        </el-select>
      </el-form-item>
    </div>

    <div class="buttons">
      <el-button @click="resetForm(studentFormRef)"> Reset </el-button>
      <el-button type="primary" native-type="submit">
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

.el-form-item {
  margin-bottom: 2rem;
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
