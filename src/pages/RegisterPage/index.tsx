import { useMemo, useState } from 'react'
import { MultiSelect, type MultiSelectOption } from '@/shared/ui/MultiSelect'
import styles from './RegisterPage.module.css'

type SkillCategoryOption = MultiSelectOption & {
  subcategories: MultiSelectOption[]
}

const skillCategories: SkillCategoryOption[] = [
  {
    value: 'business',
    label: 'Бизнес и карьера',
    subcategories: [
      { value: 'team-management', label: 'Управление командой' },
      { value: 'marketing', label: 'Маркетинг и реклама' },
      { value: 'sales', label: 'Продажи и переговоры' },
      { value: 'personal-brand', label: 'Личный бренд' },
      { value: 'resume', label: 'Резюме и собеседование' },
      { value: 'time-management', label: 'Тайм-менеджмент' },
      { value: 'project-management', label: 'Проектное управление' },
      { value: 'entrepreneurship', label: 'Предпринимательство' },
    ],
  },
  {
    value: 'art',
    label: 'Творчество и искусство',
    subcategories: [
      { value: 'drawing', label: 'Рисование и иллюстрация' },
      { value: 'photography', label: 'Фотография' },
      { value: 'video-editing', label: 'Видеомонтаж' },
      { value: 'music', label: 'Музыка и звук' },
      { value: 'acting', label: 'Актёрское мастерство' },
      { value: 'creative-writing', label: 'Креативное письмо' },
      { value: 'art-therapy', label: 'Арт-терапия' },
      { value: 'decor-diy', label: 'Декор и DIY' },
    ],
  },
  {
    value: 'languages',
    label: 'Иностранные языки',
    subcategories: [
      { value: 'english', label: 'Английский' },
      { value: 'french', label: 'Французский' },
      { value: 'spanish', label: 'Испанский' },
      { value: 'german', label: 'Немецкий' },
      { value: 'chinese', label: 'Китайский' },
      { value: 'japanese', label: 'Японский' },
      { value: 'ielts-toefl', label: 'Подготовка к экзаменам (IELTS, TOEFL)' },
    ],
  },
  {
    value: 'education',
    label: 'Образование и развитие',
    subcategories: [
      { value: 'personal-development', label: 'Личностное развитие' },
      { value: 'learning-skills', label: 'Навыки обучения' },
      { value: 'cognitive-skills', label: 'Когнитивные техники' },
      { value: 'speed-reading', label: 'Скорочтение' },
      { value: 'teaching', label: 'Навыки преподавания' },
      { value: 'coaching', label: 'Коучинг' },
    ],
  },
  {
    value: 'health',
    label: 'Здоровье и лайфстайл',
    subcategories: [
      { value: 'yoga', label: 'Йога и медитация' },
      { value: 'nutrition', label: 'Питание и ЗОЖ' },
      { value: 'mental-health', label: 'Ментальное здоровье' },
      { value: 'mindfulness', label: 'Осознанность' },
      { value: 'fitness', label: 'Физические тренировки' },
      { value: 'sleep', label: 'Сон и восстановление' },
      { value: 'work-life-balance', label: 'Баланс жизни и работы' },
    ],
  },
  {
    value: 'home',
    label: 'Дом и уют',
    subcategories: [
      { value: 'cleaning', label: 'Уборка и организация' },
      { value: 'home-finance', label: 'Домашние финансы' },
      { value: 'cooking', label: 'Приготовление еды' },
      { value: 'plants', label: 'Домашние растения' },
      { value: 'repair', label: 'Ремонт' },
      { value: 'storage', label: 'Хранение вещей' },
    ],
  },
]

const categoryOptions = skillCategories.map(({ value, label }) => ({ value, label }))

export default function RegisterPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])

  const subcategoryOptions = useMemo(
    () =>
      selectedCategories.flatMap(
        (categoryValue) =>
          skillCategories.find((category) => category.value === categoryValue)?.subcategories ?? [],
      ),
    [selectedCategories],
  )

  const handleCategoriesChange = (values: string[]) => {
    setSelectedCategories(values)
    setSelectedSubcategories((currentValues) =>
      currentValues.filter((value) =>
        values.some((categoryValue) =>
          skillCategories
            .find((category) => category.value === categoryValue)
            ?.subcategories.some((subcategory) => subcategory.value === value),
        ),
      ),
    )
  }

  return (
    <main className={styles.page}>
      <section className={styles.form} aria-label="Выбор навыков для обучения">
        <MultiSelect
          label="Категория навыка, которому хотите научиться"
          placeholder="Выберите категорию"
          options={categoryOptions}
          selectedValues={selectedCategories}
          onChange={handleCategoriesChange}
        />
        <MultiSelect
          label="Подкатегория навыка, которому хотите научиться"
          placeholder="Выберите подкатегорию"
          options={subcategoryOptions}
          selectedValues={selectedSubcategories}
          onChange={setSelectedSubcategories}
          disabled={!selectedCategories.length}
        />
      </section>
    </main>
  )
}
