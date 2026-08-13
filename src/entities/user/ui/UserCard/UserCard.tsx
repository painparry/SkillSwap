import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { SkillList } from '@/shared/ui/SkillList'
import type { SkillItem } from '@/shared/ui/SkillList'
import { Toggle } from '@/shared/ui/Toggle'
import { ClockIcon } from './ClockIcon'
import { formatAge } from './formatAge'
import styles from './UserCard.module.css'

export interface UserCardProps {
  id: string
  name: string
  city: string
  age: number
  avatarUrl?: string | null
  canTeach: SkillItem[]
  wantsToLearn: SkillItem[]
  liked: boolean
  onToggleLike: () => void
  likesCount?: number
  exchangeProposed?: boolean
  onDetailsClick?: () => void
  className?: string
}

export function UserCard({
  id,
  name,
  city,
  age,
  avatarUrl,
  canTeach,
  wantsToLearn,
  liked,
  onToggleLike,
  likesCount,
  exchangeProposed = false,
  onDetailsClick,
  className,
}: UserCardProps) {
  const classNames = [styles.card, className].filter(Boolean).join(' ')

  return (
    <article className={classNames}>
      <div className={styles.userRow}>
        <Avatar src={avatarUrl} name={name} seed={id} size="lg" />
        <div className={styles.info}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.location}>
            {city}, {formatAge(age)}
          </p>
        </div>
        <Toggle liked={liked} onToggle={onToggleLike} count={likesCount} />
      </div>

      <SkillList canTeach={canTeach} wantsToLearn={wantsToLearn} />

      <Button
        variant={exchangeProposed ? 'secondary' : 'primary'}
        className={[styles.button, exchangeProposed && styles.buttonProposed].filter(Boolean).join(' ')}
        disabled={exchangeProposed}
        onClick={onDetailsClick}
      >
        {exchangeProposed ? (
          <>
            <ClockIcon />
            Обмен предложен
          </>
        ) : (
          'Подробнее'
        )}
      </Button>
    </article>
  )
}
