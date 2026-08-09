import { ExchangeIcon } from './ExchangeIcon';
import clsx from 'clsx';
import styles from './ExchangeConfirmModal.module.css';

interface ExchangeConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  className?: string;
}

export function ExchangeConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  className,
}: ExchangeConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={clsx(styles.overlay, className)}>
      <div className={styles.modal}>
        <div className={styles.iconWrapper}>
          <ExchangeIcon />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>Вы предложили обмен</h2>
          <p className={styles.subtitle}>
            Теперь дождитесь подтверждения. Вам придёт уведомление
          </p>

          <button className={styles.button} onClick={handleConfirm}>
            Готово
          </button>
        </div>
      </div>
    </div>
  );
}