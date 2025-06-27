export interface LoginForm {
  username: string
  password: string
}

export interface PasswordResetForm {
  newPassword: string
  passwordConfirm: string
}

export interface StudentForm {
  firstName: string
  middleName: string
  lastName: string
  birthdate: Date | string
  age: number | string
  address: string
  course: Course
}

export interface FindAccountForm {
  username: string
}
