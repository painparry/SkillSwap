import { useRef, useState, useEffect } from 'react'
import styles from './Carousel.module.css'
import React from 'react'

interface CarouselProps {
  children: React.ReactNode
}

export const Carousel = ({ children }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [cardWidth, setCardWidth] = useState<number>(0)
  const [isScrolling, setIsScrolling] = useState<boolean>(false)

  useEffect(() => {
    if (!carouselRef.current) return

    const firstCard = carouselRef.current.firstElementChild as HTMLElement

    if (firstCard) {
      setCardWidth((firstCard as HTMLElement).offsetWidth)
    }
  }, [])

  const scrollNext = () => {
    if (isScrolling || !carouselRef.current || cardWidth === 0) return

    const container = carouselRef.current

    const nextScrollPosition = container.scrollLeft + cardWidth

    const totalCardsWidth = Array.from(container.children).reduce(
      (sum, child) => sum + (child as HTMLElement).offsetWidth,
      0,
    )
    const maxScroll = totalCardsWidth - container.clientWidth

    setIsScrolling(true)

    if (nextScrollPosition >= maxScroll) {
      container.scrollLeft = 0

      setTimeout(() => setIsScrolling(false), 100)
    } else {
      container.scrollLeft = nextScrollPosition

      setTimeout(() => setIsScrolling(false), 300)
    }
  }

  const childrenCount = React.Children.count(children)
  const showButton = childrenCount > 1

  return (
    <div className={styles.carousel}>
      <div ref={carouselRef} className={styles.carouselContainer} data-testid="carousel-container">
        {childrenCount === 0 ? (
          <div className={styles.emptyState}>Нет пользователей для отображения</div>
        ) : (
          children
        )}
      </div>

      {showButton && (
        <button
          onClick={scrollNext}
          className={styles.nextButton}
          aria-label="Прокрутить карусель вперёд"
          disabled={isScrolling}
          style={{ opacity: isScrolling ? 0.5 : 1 }}
        >
          <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  )
}
