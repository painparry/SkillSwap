import React from 'react'
import clsx from 'clsx'
import styles from './skills-catalog-modal.module.css'

import { Modal } from '@/shared/ui/modal'

import { CATEGORIES } from '@/shared/ui/modal/skillsCategories'
import { CategoryIcon } from '@/shared/ui/CategoryIcon'

interface SkillsCatalogModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect?: (item: { id: string; name: string }) => void
}

export const SkillsCatalogModal = ({ isOpen, onClose, onSelect }: SkillsCatalogModalProps) => {
  const handleSelect = (id: string, name: string) => {
    onSelect?.({ id, name })
    onClose()
  }

  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={clsx(styles.categoriesGrid)}>
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className={clsx(styles.categoryCard)}>
            {/* ИКОНКА ТЕПЕРЬ ПРЯМОЙ РЕБЁНОК .categoryCard — она попадёт в 1-ю колонку */}
            <CategoryIcon id={cat.id} className={clsx(styles.categoryIcon)} />

            {/* ЗАГОЛОВОК ТЕПЕРЬ ТОЛЬКО ТЕКСТ — он попадёт во 2-ю колонку */}
            <h3 className={clsx(styles.categoryName)}>{cat.name}</h3>

            <ul className={clsx(styles.subcategoriesList)}>
              {cat.subcategories.map((sub) => (
                <li key={sub.id}>
                  <button
                    type="button"
                    className={clsx(styles.skillButton)}
                    onClick={() => handleSelect(sub.id, sub.name)}
                  >
                    {sub.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Modal>
  )
}
