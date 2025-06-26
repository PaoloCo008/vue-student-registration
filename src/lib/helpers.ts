export function getFullName(firstName: string, middleName: string, lastName: string) {
  return `${capitalize(firstName)} ${middleName[0].toUpperCase()}. ${capitalize(lastName)}`
}

function getMiddleInitial(name: string) {}

function capitalize(name: string) {
  return name[0].toUpperCase() + name.slice(1)
}

export function truncate(word: string, maxChars: number) {
  return word.length >= maxChars ? word.slice(0, maxChars) + '...' : word
}

export function calculateAge(date: Date | string) {
  const birthDate = new Date(date)

  const diff = Date.now() - birthDate.getTime()
  const ageDate = new Date(diff)

  return Math.abs(ageDate.getUTCFullYear() - 1970)
}
