import type { SkillCategory } from '../../types/index';
import {
  BusinessIcon,
  ArtIcon,
  LanguageIcon,
  EducationIcon,
  HealthIcon,
  HomeIcon,
} from './icons';
import styles from './SkillsDropdown.module.css'

export const categoryIcons = {
  business: BusinessIcon,
  art: ArtIcon,
  languages: LanguageIcon,
  education: EducationIcon,
  health: HealthIcon,
  home: HomeIcon,
} as const;

export type SkillsDropdownSectionProps = {
  category: SkillCategory;
}

export function SkillsDropdownSection(props: SkillsDropdownSectionProps) {
  const Icon = categoryIcons[props.category.id];

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>
        <span className={styles.iconWrapper}>
          <Icon className={styles.icon}/>
        </span>
        {props.category.name}
      </h2>
      <ul className={styles.subcategories}>
        {props.category.subcategories.map((subcategory) => (
          <li className={styles.subcategory} key={subcategory.id}>{subcategory.name}</li>
        ))}
      </ul>
    </div>
  )
}
