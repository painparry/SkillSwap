import type { SkillCategory } from './SkillList'

/** Фиксированные пастельные цвета категорий Tag_... */
const CATEGORY_COLORS: Record<SkillCategory, string> = {
  business: '#eee7f7',
  languages: '#ebe5c5',
  home: '#f7ebe5',
  art: '#f7e7f2',
  education: '#e7f2f6',
  health: '#e9f7e7',
  other: '#e8ecf7',
}

export function getCategoryColor(category: SkillCategory): string {
  return CATEGORY_COLORS[category]
}