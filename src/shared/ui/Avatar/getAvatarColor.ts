const FALLBACK_HUE = 220

/** Цвет заглушки - Используется если аватара нет, чтобы не было белого фона*/
export function getAvatarColor(seed: string): string {
  if (!seed) return `hsl(${FALLBACK_HUE} 60% 55%)`

  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }

  const hue = Math.abs(hash) % 360
  return `hsl(${hue} 60% 55%)`
}
