import { SkillList, type SkillItem } from '@/shared/ui/SkillList'
import { formatAge } from '../UserCard/formatAge'
import { Avatar } from '@/shared/ui/Avatar'
import style from './ExtendedUserCard.module.css'

export interface TExtendedUserCard {
  id: string
  name: string
  city: string
  age: number
  about: string
  avatarUrl?: string | null
  canTeach: SkillItem[]
  wantsToLearn: SkillItem[]
  className?: string
}

export const ExtendedUserCard = ({
  id,
  name,
  city,
  age,
  about,
  avatarUrl,
  canTeach,
  wantsToLearn,
  className,
}: TExtendedUserCard) => {
  const classNames = [style.card, className].filter(Boolean).join(' ')

  return (
    <article className={classNames}>
      <div className={style.userRow}>
        <Avatar src={avatarUrl} name={name} seed={id} size="lg" />
        <div className={style.info}>
          <h2 className={style.name}>{name}</h2>
          <p className={style.location}>
            {city}, {formatAge(age)}
          </p>
        </div>
      </div>
      <p className={style.about}>{about}</p>

      <SkillList canTeach={canTeach} wantsToLearn={wantsToLearn} className={style.skillList} />
    </article>
  )
}
