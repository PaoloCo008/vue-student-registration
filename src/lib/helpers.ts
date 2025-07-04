export function getFullName(firstName: string, lastName: string, middleName?: string) {
  return `${capitalize(firstName)} ${middleName ? getMiddleInitial(middleName) : ''} ${capitalize(lastName)}`
}

function getMiddleInitial(name: string) {
  const fragments = name.trim().split(' ')

  if (fragments.length > 1) {
    return `${capitalize(fragments[0][0])}. ${capitalize(fragments[1][0])}.`
  }

  return capitalize(fragments[0][0]) + '.'
}

export function capitalize(word: string) {
  let fragments = word.trim().split(' ')

  fragments = fragments.map((f) => f[0].toUpperCase() + f.slice(1).toLocaleLowerCase())

  return fragments.join(' ')
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

export function validNameInput(name: string) {
  const fragments = name.split('-')

  const names: { [key: string]: number } = {}

  fragments.forEach((name) => {
    return names[name] ? (names[name] += 1) : (names[name] = 1)
  })

  return !Object.keys(names).some((name) => names[name] >= 3)
}
