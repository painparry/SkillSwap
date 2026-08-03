import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import { Button } from '../Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  children?: ReactNode;
}

const MODAL_ROOT_ID = 'modal-root';

const getModalRoot = (): HTMLElement => {
  let root = document.getElementById(MODAL_ROOT_ID);

  if (!root) {
    root = document.createElement('div');
    root.id = MODAL_ROOT_ID;
    document.body.appendChild(root);
  }

  return root;
};

export const Modal = ({
  isOpen,
  onClose,
  icon,
  title,
  subtitle,
  buttonText,
  onButtonClick,
  children,
}: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      onClose();
    }
  };

  return createPortal(
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        {title && (
          <h2 id="modal-title" className={styles.title}>
            {title}
          </h2>
        )}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children}
        {buttonText && (
         <Button className={styles.button} onClick={handleButtonClick}>
            {buttonText}
         </Button>
        )}
      </div>
    </div>,
    getModalRoot(),
  );
};