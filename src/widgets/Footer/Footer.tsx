import { Logo } from '@/shared/ui/logo'
import styles from './Footer.module.css'

const footerLinks = [
  'О проекте',
  'Все навыки',
  'Контакты',
  'Блог',
  'Политика конфиденциальности',
  'Пользовательское соглашение',
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <Logo />
        <span className={styles.copyright}>SkillSwap - 2025</span>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.list}>
          {footerLinks.map((label) => (
            <li key={label}>
              <span className={styles.link}>{label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}