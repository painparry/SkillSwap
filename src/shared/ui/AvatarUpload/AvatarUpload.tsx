import React, { useState } from 'react'
import clsx from 'clsx'
import addIcon from './add-icon.svg'
import editBadgeIcon from './edit-badge.svg'
import styles from './AvatarUpload.module.css'

interface AvatarUploadProps {
  /** Ссылка на аватар */
  value?: string | null
  size?: number
  className?: string
  onChange?: (file: File, previewUrl: string) => void
}

export const AvatarUpload = ({ value, size = 54, className, onChange }: AvatarUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const displayUrl = previewUrl ?? value ?? null

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      onChange?.(file, url)
    }
  }

  return (
    <label
      className={clsx(styles.avatarContainer, className)}
      style={{ width: size, height: size }}
    >
      {!displayUrl && (
        <img src={addIcon} alt="Добавить аватар" className={styles.iconPlaceholder} />
      )}

      {displayUrl && (
        <>
          <img src={displayUrl} alt="Avatar" className={styles.imagePreview} />
          <span className={styles.editBadge}>
            <img src={editBadgeIcon} alt="" aria-hidden="true" />
          </span>
        </>
      )}
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg"
        className={styles.fileInput}
        onChange={handleFileChange}
      />
    </label>
  )
}