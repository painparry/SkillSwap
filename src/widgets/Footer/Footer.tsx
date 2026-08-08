import styles from './Footer.module.css'
import { Logo } from '../../shared/ui/logo'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/lib/constants'

export const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerBrand}>
        <Logo />
        <p className={styles.copyright}>SkillSwap — 2025</p>
      </div>
      <div className={styles.footerNavigation}>
        <ul>
          <li><Link to='/about'>О проекте</Link></li>
          <li><Link to={ROUTES.HOME}>Все навыки</Link></li>
        </ul>
        <ul>
          <li><Link to='/contacts'>Контакты</Link></li>
          <li><a href="https://habr.com/" target="_blank" rel="noopener noreferrer">Блог</a></li>
        </ul>
        <ul>
          <li><Link to='/privacy-policy'>Политика конфиденциальности</Link></li>
          <li><Link to='/terms'>Пользовательское соглашение</Link></li>
        </ul>
      </div>
    </div>
  )
}
