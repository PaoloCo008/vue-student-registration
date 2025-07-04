export type Course =
  | 'Bachelor of Science in Information and Technology'
  | 'Bachelor in Computer Science'
  | 'Bachelor of Science in Tourism Management'
  | 'Bachelor of Science in Hotel and Restaurant Management'
  | 'Bachelor of Science in Nursing'

export interface Student {
  id: string
  renderId: string
  registeredDate: Date
  firstName: string
  middleName?: string
  lastName: string
  birthdate: string
  age: number
  address: string
  course: Course
}

export interface User {
  username: string
  password: string
}
