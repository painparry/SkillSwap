import { useState, useRef } from 'react'
import clsx from 'clsx'
import styles from './SkillImageUpload.module.css'
import iconSrc from '@/assets/images/galleryAdd.svg'

interface SkillImageUploadProps {
  onFileSelect: (file: File) => void
  label?: string
  className?: string
}

export const SkillImageUpload = ({ onFileSelect, label, className }: SkillImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const isImageFile = (file: File) => file.type.startsWith('image/')
  const clearPreview = (url: string | null) => {
    if (url) {
      URL.revokeObjectURL(url)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]

    setError(null)

    if (selectedFile) {
      if (!isImageFile(selectedFile)) {
        setError('Пожалуйста, загрузите только изображения (jpg, png, gif и т.д.)')
        return
      }

      clearPreview(previewUrl)
      const newUrl = URL.createObjectURL(selectedFile)

      setFile(selectedFile)
      setPreviewUrl(newUrl)
      onFileSelect(selectedFile)
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]

    setError(null)

    if (droppedFile) {
      if (!isImageFile(droppedFile)) {
        setError('Пожалуйста, загрузите только изображения (jpg, png, gif и т.д.)')
        return
      }

      clearPreview(previewUrl)
      const newUrl = URL.createObjectURL(droppedFile)

      setFile(droppedFile)
      setPreviewUrl(newUrl)
      onFileSelect(droppedFile)
    }
  }

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleRemove = () => {
    clearPreview(previewUrl)
    setPreviewUrl(null)
    setFile(null)
    setError(null)
  }

  return (
    <div
      className={clsx(styles.uploadWrapper, className, {
        [styles.dragging]: isDragging,
        [styles.hasFile]: !!file,
      })}
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className={styles.hiddenInput}
        data-testid="file-input"
      />

      {!file ? (
        <div
          className={clsx(styles.dropZone, { [styles.errorVisible]: !!error })}
          onClick={openFileDialog}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {error && <p className={styles.errorText}>{error}</p>}

          <p className={styles.hintText}>Перетащите или выберите изображения навыка</p>

          <div className={styles.actionRow}>
            <img src={iconSrc} alt="" className={styles.icon} />
            <span className={styles.mainText}>{label || 'Выберите изображения'}</span>
          </div>
        </div>
      ) : (
        <div className={styles.previewContainer}>
          <button
            type="button"
            onClick={handleRemove}
            className={styles.removeBtn}
            aria-label="Удалить изображение"
          >
            ✕
          </button>
          <img src={previewUrl!} alt="Превью" className={styles.previewImage} loading="eager" />
          <p className={styles.fileName}>{file.name}</p>
        </div>
      )}
    </div>
  )
}
