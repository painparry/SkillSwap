import { useState } from 'react'
import styles from './ImageCarousel.module.css'

export interface ImageCarouselProps {
  images: string[]
  alt?: string
  className?: string
}

export function ImageCarousel({
  images,
  alt = 'Фото',
  className,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const currentImage = images[currentIndex]

  const getPreviewImages = () => {
    const previews: string[] = []
    const total = images.length
    for (let i = 1; i <= 3; i++) {
      const index = (currentIndex + i) % total
      previews.push(images[index])
    }
    return previews
  }

  const previewImages = getPreviewImages()

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className={`${styles.carousel} ${className || ''}`}>
      <div className={styles.mainContainer}>
        <div className={styles.mainImageWrapper}>
          <img
            src={currentImage}
            alt={`${alt} ${currentIndex + 1}`}
            className={styles.mainImage}
          />

          {images.length > 1 && (
            <>
              <button
                className={`${styles.arrow} ${styles.arrowLeft}`}
                onClick={goToPrevious}
                aria-label="Предыдущее фото"
              >
                <svg
                  width="5.29"
                  height="10.67"
                  viewBox="0 0 6 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L1 5.5L5 10"
                    stroke="#69735D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className={`${styles.arrow} ${styles.arrowRight}`}
                onClick={goToNext}
                aria-label="Следующее фото"
              >
                <svg
                  width="5.29"
                  height="10.67"
                  viewBox="0 0 6 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5 5.5L1 10"
                    stroke="#69735D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}

          <div className={styles.counter}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        <div className={styles.previewColumn}>
          {previewImages.map((src, index) => {
            const isLast = index === 2
            const remaining = images.length - 4

            return (
              <button
                key={index}
                className={styles.previewItem}
                onClick={() => goToSlide((currentIndex + index + 1) % images.length)}
                aria-label={`Перейти к фото ${(currentIndex + index + 1) % images.length + 1}`}
              >
                <img
                  src={src}
                  alt={`Превью ${index + 2}`}
                  className={styles.previewImage}
                />
                {isLast && remaining > 0 && (
                  <div className={styles.previewOverlay}>
                    +{remaining}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}