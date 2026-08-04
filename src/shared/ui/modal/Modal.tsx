import React, { useEffect } from 'react'
import clsx from 'clsx'
import styles from './modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  // Блокируем скролл страницы, когда модалка открыта
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Закрываем, если клик был по оверлею, а не по окну
    if ((e.target as HTMLElement).id === 'modal-overlay') {
      onClose()
    }
  }

  return (
    <div id="modal-overlay" className={clsx(styles.overlay)} onClick={handleOverlayClick}>
      <div className={clsx(styles.window, className)} role="dialog" aria-modal="true">
        {children}
      </div>
    </div>
  )
}
