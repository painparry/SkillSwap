import clsx from 'clsx'
import type { SkillCategory, SkillCategoryId } from '../../types/index'
import { BusinessIcon, ArtIcon, LanguageIcon, EducationIcon, HealthIcon, HomeIcon } from './icons'
import styles from './SkillsDropdown.module.css'

export const categoryIcons = {
  business: BusinessIcon,
  art: ArtIcon,
  languages: LanguageIcon,
  education: EducationIcon,
  health: HealthIcon,
  home: HomeIcon,
} as const

export type SkillsDropdownSectionProps = {
  category: SkillCategory
  onSelectCategory?: (categoryId: SkillCategoryId) => void
  onSelectSubcategory?: (categoryId: SkillCategoryId, subcategoryId: string) => void
}

export function SkillsDropdownSection({
  category,
  onSelectCategory,
  onSelectSubcategory,
}: SkillsDropdownSectionProps) {
  const Icon = categoryIcons[category.id]

  return (
    <div className={styles.skillCategory}>
      <span className={clsx(styles.iconWrapper, styles[category.id])}>
        <Icon className={styles.icon} />
      </span>
      <div className={styles.categoryContent}>
        <button
          type="button"
          className={styles.title}
          onClick={() => onSelectCategory?.(category.id)}
        >
          {category.name}
        </button>
        <ul className={styles.subcategories}>
          {category.subcategories.map((subcategory) => (
            <li key={subcategory.id}>
              <button
                type="button"
                className={styles.subcategory}
                onClick={() => onSelectSubcategory?.(category.id, subcategory.id)}
              >
                {subcategory.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
