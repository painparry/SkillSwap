import { useRef, useState } from 'react'
import { UserCard, UserCardProps } from '@/entities/user/ui/UserCard'
import styles from './Carousel.module.css'

interface CarouselProps {
  items: UserCardProps[]
}

export const Carousel = ({ items }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const cardWidth = 320
  const [currentPosition, setCurrentPosition] = useState(0)

  const maxPosition = Math.max(0, (items.length - 1) * cardWidth)

  const shouldShowButtons = items.length > 1

  const scrollNext = () => {
    if (!carouselRef.current || currentPosition >= maxPosition) return

    carouselRef.current.scrollLeft += cardWidth
    setCurrentPosition((prev) => prev + 1)
  }

  const scrollPrev = () => {
    if (!carouselRef.current || currentPosition <= 0) return

    carouselRef.current.scrollLeft -= cardWidth
    setCurrentPosition((prev) => prev - 1)
  }

  return (
    <div className={styles.carousel}>
      {shouldShowButtons && (
        <button
          onClick={scrollPrev}
          className={`${styles.prevButton} ${currentPosition === 0 ? styles.disabled : ''}`}
          disabled={currentPosition === 0}
          aria-label="Прокрутить карусель назад"
        />
      )}

      <div ref={carouselRef} className={styles.carouselContainer} data-testid="carousel-container">
        {items.length === 0 ? (
          <div className={styles.emptyState}>Нет пользователей для отображения</div>
        ) : (
          items.map((userProps) => (
            <div key={userProps.id} className={styles.cardWrapper}>
              <UserCard {...userProps} />
            </div>
          ))
        )}
      </div>

      {shouldShowButtons && (
        <button
          onClick={scrollNext}
          className={`${styles.nextButton} ${currentPosition >= maxPosition / cardWidth ? styles.disabled : ''}`}
          disabled={currentPosition >= maxPosition / cardWidth}
          aria-label="Прокрутить карусель вперёд"
        />
      )}
    </div>
  )
}
