import styles from './SkillCard.module.css'
import { ImageCarousel } from '../ImageCarousel/ImageCarousel'
import { Toggle } from '../Toggle'
import { ExchangeButton } from '@/features/exchange/ui'
import share from '../../../assets/images/share.svg'
import status from '../../../assets/images/status.svg'

interface SkillCardProps {
  skillId: string
  authorId: string
  authorName: string
  title: string
  category: string
  subcategory: string
  description: string
  images: string[]
  liked: boolean
  onToggleLike: () => void
}

export const SkillCard = ({
  skillId,
  authorId,
  authorName,
  title,
  category,
  subcategory,
  description,
  images,
  liked,
  onToggleLike,
}: SkillCardProps) => {
  return (
    <section className={styles.skillCard}>
      <div className={styles.content}>
        <div className={styles.contenttext}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.category}>{`${category} / ${subcategory}`}</p>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.contentbtn}>
          <ExchangeButton
            skillId={skillId}
            authorId={authorId}
            authorName={authorName}
            skillTitle={title}
            className={styles.actionBtn}
          />
        </div>
      </div>
      <div className={styles.controls}>
        <Toggle liked={liked} onToggle={onToggleLike} />
        <button className={styles.iconBtn} aria-label="Поделиться">
          <img src={share} alt="значок развилки" className={styles.icon} aria-hidden="true" />
        </button>
        <button className={styles.iconBtn} aria-label="Дополнительные функции">
          <img src={status} alt="три точки" className={styles.icon} aria-hidden="true" />
        </button>
      </div>
      <ImageCarousel images={images} alt={title} className={styles.carouselWrapper} />
    </section>
  )
}