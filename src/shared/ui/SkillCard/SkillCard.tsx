import styles from './SkillCard.module.css';
import { Button } from '../Button/Button';
import { ImageCarousel } from '../ImageCarousel/ImageCarousel';
import like from '../../../assets/images/like.svg';
import share from '../../../assets/images/share.svg';
import status from '../../../assets/images/status.svg'
interface SkillCardProps {
  title: string;
  category: string;
  description: string;
  images: string[];
}

export const SkillCard = ({ title, category, description, images }: SkillCardProps) => {
  return (
    <section className={styles.skillCard}>
      <div className={styles.content}>
        <div className={styles.contenttext}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.category}>{category}</p>
        <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.contentbtn}>
        <Button variant="primary" className={styles.actionBtn}>
          Предложить обмен
        </Button>
      </div>
      </div>
      <div className={styles.controls}>
        <button className={styles.iconBtn} aria-label="Лайк"> <img
          src={like}
          alt=""
          className={styles.like}
          aria-hidden="true"
        /></button>
        <button className={styles.iconBtn} aria-label=""> <img
          src={share}
          alt=""
          className={styles.share}
          aria-hidden="true"
        /></button>
        <button className={styles.iconBtn} aria-label="Лайк"> <img
          src={status}
          alt=""
          className={styles.status}
          aria-hidden="true"
        /></button>
      </div>
      <ImageCarousel
        images={images}
        alt={title}
        className={styles.carouselWrapper}
      />
    </section>
  );
}; 