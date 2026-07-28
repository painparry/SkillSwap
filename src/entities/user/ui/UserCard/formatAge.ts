/** Склонение год/года/лет */
export function formatAge(age: number): string {
  const mod10 = age % 10
  const mod100 = age % 100

  if (mod100 >= 11 && mod100 <= 14) return `${age} лет`
  if (mod10 === 1) return `${age} год`
  if (mod10 >= 2 && mod10 <= 4) return `${age} года`
  return `${age} лет`
}
