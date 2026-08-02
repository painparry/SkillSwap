


import React from 'react';
import styles from '../../skills-catalog-modal/model/skills-catalog-modal.module.css';

interface SkillItem {
  id: string;
  label: string;
}

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: SkillItem[];
}

interface SkillsCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (skill: SkillItem) => void;
  categories: Category[];
}

export const SkillsCatalogModal = ({
  isOpen,
  onClose,
  onSelect,
  categories,
}: SkillsCatalogModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.grid}>
          {categories.map((category) => (
            <div key={category.id} className={styles.categoryCard}>
              {/* --- КОЛОНКА 1: ИКОНКА --- */}
              <div className={styles.categoryIconCell}>
                {category.icon}
              </div>

              {/* --- КОЛОНКА 2: ЗАГОЛОВОК + СПИСОК --- */}
              <div className={styles.categoryTitleWrapper}>
                <h3 className={styles.categoryTitle}>{category.title}</h3>

                <ul className={styles.skillList}>
                  {category.items.map((item) => (
                    <li
                      key={item.id}
                      className={styles.skillItem}
                      onClick={() => onSelect(item)}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
