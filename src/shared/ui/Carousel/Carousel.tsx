import { useRef } from 'react';
import { UserCard, UserCardProps } from '@/entities/user/ui/UserCard';
import styles from './Carousel.module.css';

interface CarouselProps {
  items: UserCardProps[];
}

export const Carousel = ({ items }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const totalCardsWidth = Array.from(container.children).reduce(
      (sum, child) => sum + (child as HTMLElement).offsetWidth,
      0
    );
    const maxScroll = totalCardsWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;
    const cardWidth = 320;

    if (currentScroll >= maxScroll) {
      container.scrollLeft = 0;
    } else {
      container.scrollLeft += cardWidth;
    }
  };

  return (
    <div className={styles.carousel}>
      <div ref={carouselRef} className={styles.carouselContainer} data-testid="carousel-container">
        {items.length === 0 ? (
          <div className={styles.emptyState}>Нет пользователей для отображения</div>
        ) : (
          <>
            {[...items, ...items].map((userProps, index) => (
              <div key={`${userProps.id}-${index}`} className={styles.cardWrapper}>
                <UserCard {...userProps} />
              </div>
            ))}
          </>
        )}
      </div>
      {items.length > 1 && (
        <button
          onClick={scrollNext}
          className={styles.nextButton}
          aria-label="Прокрутить карусель вперёд"
        >
        </button>
      )}
    </div>
  );
};