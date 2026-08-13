import { getCategoryColor } from './getCategoryColor'
import styles from './SkillList.module.css'

export type SkillCategory =
  | 'business'
  | 'languages'
  | 'home'
  | 'art'
  | 'education'
  | 'health'
  | 'other'

export interface SkillItem {
  title: string
  category: SkillCategory
}

export interface SkillListProps {
  canTeach: SkillItem[]
  wantsToLearn: SkillItem[]
  maxVisible?: number
  className?: string
}

interface SkillSectionProps {
  title: string
  skills: SkillItem[]
  maxVisible: number
}

function SkillSection({ title, skills, maxVisible }: SkillSectionProps) {
  const visible = skills.slice(0, maxVisible)
  const overflow = skills.length - visible.length

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.tags}>
        {visible.map((skill) => (
          <span
            key={skill.title}
            className={styles.pill}
            style={{ backgroundColor: getCategoryColor(skill.category) }}
          >
            {skill.title}
          </span>
        ))}
        {overflow > 0 && (
          <span className={styles.pill} style={{ backgroundColor: getCategoryColor('other') }}>
            +{overflow}
          </span>
        )}
      </div>
    </div>
  )
}

export function SkillList({
  canTeach,
  wantsToLearn,
  maxVisible = 1,
  className,
}: SkillListProps) {
  const classNames = [styles.list, className].filter(Boolean).join(' ')

  return (
    <div className={classNames}>
      <SkillSection title="Может научить:" skills={canTeach} maxVisible={maxVisible} />
      <SkillSection title="Хочет научиться:" skills={wantsToLearn} maxVisible={maxVisible} />
    </div>
  )
}
