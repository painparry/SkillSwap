import addError404 from '../../assets/images/error-404.svg'
import { Button } from '@/shared/ui/Button'

import styles from './NotFoundPage.module.css'
import { useNavigate } from 'react-router-dom'
export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <main className={styles.page}>
      <div className={styles.contentContainer}>
        <img src={addError404} alt="Страница не найдена" />
        <h2 className={styles.header}>Страница не найдена</h2>
        <p className={styles.message}>
          К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже
        </p>
        <div className={styles.buttons}>
          <Button variant="secondary">Сообщить об ошибке</Button>
          <Button variant="primary" onClick={() => navigate('/')}>
            На главную
          </Button>
        </div>
      </div>
    </main>
  )
}
