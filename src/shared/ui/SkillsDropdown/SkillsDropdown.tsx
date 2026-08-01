import { useState } from 'react'
import { Button } from "../Button"
import { ChevronDownIcon } from "./icons/ChevronDownIcon"
import styles from './SkillsDropdown.module.css'
import type { SkillCategory } from '../../types/index'
import { SkillsDropdownSection } from './SkillsDropdownSection'

export type SkillsDropdownProps = {
  sections: SkillCategory[];
}

export function SkillsDropdown(props: SkillsDropdownProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdownOpen = () => {
    setDropdownOpen(prev => !prev)
  }

return (
  <>
    <Button variant="tertiary" onClick={toggleDropdownOpen} aria-expanded={isDropdownOpen} aria-controls="skills-dropdown" aria-haspopup="true">
      <span className={styles.buttonContent}>
        Все навыки
        <ChevronDownIcon />
      </span>
    </Button>
    {isDropdownOpen && (<div id="skills-dropdown" className={styles.sectionsContainer}>
      {props.sections.map((category) => (
        <SkillsDropdownSection category={category} key={category.id}/>
      ))}
    </div>)}
  </>
)
}
