import error500img from '../../assets/images/error-500.svg'
import { Button } from '@/shared/ui/Button'
import styles from './ServerErrorPage.module.css'
import { useNavigate } from "react-router-dom";

export default function ServerErrorPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <div className={styles.contentContainer}>
        <img src={error500img} alt='Ошибка сервера'/>
        <h2 className={styles.header}>На сервере произошла ошибка</h2>
        <p className={styles.message}>Попробуйте позже или вернитесь на главную страницу</p>
        <div className={styles.buttons}>
          <Button variant='primary'>Сообщить об ошибке</Button>
          <Button variant='secondary' onClick={() => navigate('/')}>На главную</Button>
        </div>
      </div>
    </main>
  )
}
