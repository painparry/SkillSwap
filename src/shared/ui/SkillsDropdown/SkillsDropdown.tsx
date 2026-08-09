import { useState } from 'react'
import { Button } from '../Button'
import { ChevronDownIcon } from './icons/ChevronDownIcon'
import styles from './SkillsDropdown.module.css'
import type { SkillCategory, SkillCategoryId } from '../../types/index'
import { SkillsDropdownSection } from './SkillsDropdownSection'

export type SkillsDropdownProps = {
  sections: SkillCategory[]
  onSelectCategory?: (categoryId: SkillCategoryId) => void
  onSelectSubcategory?: (categoryId: SkillCategoryId, subcategoryId: string) => void
}

export function SkillsDropdown({
  sections,
  onSelectCategory,
  onSelectSubcategory,
}: SkillsDropdownProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdownOpen = () => {
    setDropdownOpen((prev) => !prev)
  }

  const handleSelectCategory = (categoryId: SkillCategoryId) => {
    setDropdownOpen(false)
    onSelectCategory?.(categoryId)
  }

  const handleSelectSubcategory = (categoryId: SkillCategoryId, subcategoryId: string) => {
    setDropdownOpen(false)
    onSelectSubcategory?.(categoryId, subcategoryId)
  }

  return (
    <>
      <Button
        variant="tertiary"
        onClick={toggleDropdownOpen}
        aria-expanded={isDropdownOpen}
        aria-controls="skills-dropdown"
        aria-haspopup="true"
      >
        <span className={styles.buttonContent}>
          Все навыки
          <ChevronDownIcon />
        </span>
      </Button>
      {isDropdownOpen && (
        <div id="skills-dropdown" className={styles.sectionsContainer}>
          {sections.map((category) => (
            <SkillsDropdownSection
              category={category}
              key={category.id}
              onSelectCategory={handleSelectCategory}
              onSelectSubcategory={handleSelectSubcategory}
            />
          ))}
        </div>
      )}
    </>
  )
}
