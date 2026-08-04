/*
// src/shared/ui/skills-dropdown/SkillsDropdown.tsx
import React from 'react';
import styles from './SkillsDropdown.module.css';


const CATEGORIES = 
  [
  {
    "id": "business",
    "name": "Бизнес и карьера",
    "subcategories": [
      { "id": "team-management", "name": "Управление командой" },
      { "id": "marketing", "name": "Маркетинг и реклама" },
      { "id": "sales", "name": "Продажи и переговоры" },
      { "id": "personal-brand", "name": "Личный бренд" },
      { "id": "resume", "name": "Резюме и собеседование" },
      { "id": "time-management", "name": "Тайм-менеджмент" },
      { "id": "project-management", "name": "Проектное управление" },
      { "id": "entrepreneurship", "name": "Предпринимательство" }
    ]
  },
  {
    "id": "languages",
    "name": "Иностранные языки",
    "subcategories": [
      { "id": "english", "name": "Английский" },
      { "id": "french", "name": "Французский" },
      { "id": "spanish", "name": "Испанский" },
      { "id": "german", "name": "Немецкий" },
      { "id": "chinese", "name": "Китайский" },
      { "id": "japanese", "name": "Японский" },
      { "id": "ielts-toefl", "name": "Подготовка к экзаменам (IELTS, TOEFL)" }
    ]
  },
  {
    "id": "home",
    "name": "Дом и уют",
    "subcategories": [
      { "id": "cleaning", "name": "Уборка и организация" },
      { "id": "home-finance", "name": "Домашние финансы" },
      { "id": "cooking", "name": "Приготовление еды" },
      { "id": "plants", "name": "Домашние растения" },
      { "id": "repair", "name": "Ремонт" },
      { "id": "storage", "name": "Хранение вещей" }
    ]
  },
  {
    "id": "art",
    "name": "Творчество и искусство",
    "subcategories": [
      { "id": "drawing", "name": "Рисование и иллюстрация" },
      { "id": "photography", "name": "Фотография" },
      { "id": "video-editing", "name": "Видеомонтаж" },
      { "id": "music", "name": "Музыка и звук" },
      { "id": "acting", "name": "Актёрское мастерство" },
      { "id": "creative-writing", "name": "Креативное письмо" },
      { "id": "art-therapy", "name": "Арт-терапия" },
      { "id": "decor-diy", "name": "Декор и DIY" }
    ]
  },
  {
    "id": "education",
    "name": "Образование и развитие",
    "subcategories": [
      { "id": "personal-development", "name": "Личностное развитие" },
      { "id": "learning-skills", "name": "Навыки обучения" },
      { "id": "cognitive-skills", "name": "Когнитивные техники" },
      { "id": "speed-reading", "name": "Скорочтение" },
      { "id": "teaching", "name": "Навыки преподавания" },
      { "id": "coaching", "name": "Коучинг" }
    ]
  },
  {
    "id": "health",
    "name": "Здоровье и лайфстайл",
    "subcategories": [
      { "id": "yoga", "name": "Йога и медитация" },
      { "id": "nutrition", "name": "Питание и ЗОЖ" },
      { "id": "mental-health", "name": "Ментальное здоровье" },
      { "id": "mindfulness", "name": "Осознанность" },
      { "id": "fitness", "name": "Физические тренировки" },
      { "id": "sleep", "name": "Сон и восстановление" },
      { "id": "work-life-balance", "name": "Баланс жизни и работы" }
    ]
  }
]


interface CategoryItem {
  id: string;
  name: string;
}

interface SkillsDropdownProps {
  onSelect: (category: CategoryItem) => void;
}

export function SkillsDropdown({ onSelect }: SkillsDropdownProps) {
  return (
    <div className={styles.dropdown}>
      <h3 className={styles.title}>Категории навыков</h3>
      {CATEGORIES.map((cat) => (
        <div key={cat.id} className={styles.categoryBlock}>
          <div className={styles.categoryHeader} onClick={() => onSelect({ id: cat.id, name: cat.name })}>
            {cat.name}
          </div>
          
          <div className={styles.subcategories}>
            {cat.subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => onSelect({ id: sub.id, name: sub.name })}
                className={styles.subcategoryItem}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
*/

import clsx from 'clsx'
import styles from './SkillsDropdown.module.css'

import { CATEGORIES } from '../modal/skillsCategories'
interface SkillsDropdownProps {
  onSelect: (item: { id: string; name: string }) => void
}

export function SkillsDropdown({ onSelect }: SkillsDropdownProps) {
  return (
    <div className={clsx(styles.dropdown)}>
      {CATEGORIES.map((cat) => (
        <div key={cat.id} className={clsx(styles.categoryBlock)}>
          <div
            className={clsx(styles.categoryHeader)}
            onClick={() => onSelect({ id: cat.id, name: cat.name })}
          >
            {cat.name}
          </div>
          <div className={clsx(styles.subcategories)}>
            {cat.subcategories.map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => onSelect({ id: sub.id, name: sub.name })}
                className={clsx(styles.subcategoryItem)}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
