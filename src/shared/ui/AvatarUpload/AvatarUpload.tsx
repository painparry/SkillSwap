import React, { useState } from 'react'
import addIcon from './add-icon.svg'
import styles from './AvatarUpload.module.css'

interface AvatarUploadProps {
  onChange?: (file: File) => void
}
export const AvatarUpload = ({ onChange }: AvatarUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      onChange?.(file)
    }
  }

  return (
    <label className={styles.avatarContainer}>
      {!previewUrl && (
        <img src={addIcon} alt="Добавить аватар" className={styles.iconPlaceholder} />
      )}

      {previewUrl && <img src={previewUrl} alt="Avatar" className={styles.imagePreview} />}
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg"
        className={styles.fileInput}
        onChange={handleFileChange}
      />
    </label>
  )
}
