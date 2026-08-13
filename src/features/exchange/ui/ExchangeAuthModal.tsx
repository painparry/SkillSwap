import { useNavigate } from 'react-router-dom';
import { ExchangeIcon } from './ExchangeConfirmModal/ExchangeIcon';
import clsx from 'clsx';
import styles from './ExchangeAuthModal.module.css';
import { ROUTES } from '@/shared/lib/constants';

interface ExchangeAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function ExchangeAuthModal({ isOpen, onClose, className }: ExchangeAuthModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleRegister = () => {
    onClose();
    navigate(ROUTES.REGISTER);
  };

  const handleLogin = () => {
    onClose();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className={clsx(styles.overlay, className)}>
      <div className={styles.modal}>
        <div className={styles.iconWrapper}>
          <ExchangeIcon />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>
            Чтобы предложить обмен, войдите или зарегистрируйтесь
          </h2>
          <p className={styles.subtitle}>
            Только авторизованные пользователи могут предлагать обмен
          </p>

          <div className={styles.buttons}>
            <button className={styles.primaryButton} onClick={handleRegister}>
              Зарегистрироваться
            </button>
            <button className={styles.secondaryButton} onClick={handleLogin}>
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}