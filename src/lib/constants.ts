import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

import { format } from 'date-fns'
import type { Course, Student } from '@/types/globals'

export const courses: Course[] = [
  'Bachelor of Science in Information and Technology',
  'Bachelor in Computer Science',
  'Bachelor of Science in Tourism Management',
  'Bachelor of Science in Hotel and Restaurant Management',
  'Bachelor of Science in Nursing',
]

export const sortByOptions = [
  { value: 'age-desc', label: 'Sort by age (descending)' },
  { value: 'age-asc', label: 'Sort by age (ascending)' },
  { value: 'admission-desc', label: 'Sort by registered date (descending)' },
]

export const students: Student[] = Array.from({ length: 10 }, () => {
  return {
    id: uuidv4(),
    renderId: uuidv4(),
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    birthdate: format(faker.date.birthdate(), 'LLL dd, yyyy'),
    address: faker.location.streetAddress(),
    age: faker.number.int({ min: 18, max: 30 }),
    course: 'Bachelor of Science in Nursing',
  }
})

export const student: Student = {
  id: uuidv4(),
  renderId: uuidv4(),
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName(),
  birthdate: format(faker.date.birthdate(), 'LLL dd, yyyy'),
  address: faker.location.streetAddress(),
  age: faker.number.int({ min: 18, max: 30 }),
  course: 'Bachelor of Science in Nursing',
}
