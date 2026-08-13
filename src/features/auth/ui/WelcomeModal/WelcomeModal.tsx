import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';
import styles from './WelcomeModal.module.css';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export function WelcomeModal({
  isOpen,
  onClose,
  userName = '',
}: WelcomeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <SuccessIcon />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>
            Ваше предложение создано{userName ? `, ${userName}` : ''}!
          </h2>
          <p className={styles.subtitle}>
            Теперь вы можете предложить обмен
          </p>
        </div>

        <Button
          variant="primary"
          onClick={onClose}
          className={styles.button}
        >
          Готово
        </Button>
      </div>
    </Modal>
  );
}


function SuccessIcon() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M87.5 50C87.5 70.7107 70.7107 87.5 50 87.5C29.2893 87.5 12.5 70.7107 12.5 50C12.5 29.2893 29.2893 12.5 50 12.5C70.7107 12.5 87.5 29.2893 87.5 50Z"
        stroke="#253017"
        strokeWidth="1.5"
      />
      <path
        d="M36.8506 50.8401L43.356 57.3457C45.258 59.2477 48.3417 59.2477 50.2435 57.3456L64.6858 42.9023"
        stroke="#253017"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}