import { useId, useState } from 'react'
import type { ChangeEvent } from 'react'
import { CheckBox } from '@/shared/ui/CheckBox/CheckBox'
import { RadioGroup } from '@/shared/ui/RadioGroup/RadioGroup'
import styles from './FiltersSidebar.module.css'

export type SkillFilterType = 'all' | 'learn' | 'teach'
export type AuthorGenderFilter = 'any' | 'male' | 'female'

export interface FiltersSidebarValue {
  skillType: SkillFilterType
  categories: string[]
  subcategories: string[]
  gender: AuthorGenderFilter
  cities: string[]
}

export interface FiltersSidebarProps {
  value?: FiltersSidebarValue
  defaultValue?: FiltersSidebarValue
  onChange?: (value: FiltersSidebarValue) => void
  className?: string
}

type FilterCategory = {
  id: string
  label: string
  subcategories: Array<{
    id: string
    label: string
  }>
}

const skillTypeOptions = [
  { value: 'all', label: 'Всё' },
  { value: 'learn', label: 'Хочу научиться' },
  { value: 'teach', label: 'Могу научить' },
]

const genderOptions = [
  { value: 'any', label: 'Не имеет значения' },
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
]

const filterCategories: FilterCategory[] = [
  {
    id: 'business',
    label: 'Бизнес и карьера',
    subcategories: [
      { id: 'team-management', label: 'Управление командой' },
      { id: 'marketing', label: 'Маркетинг и реклама' },
      { id: 'sales', label: 'Продажи и переговоры' },
      { id: 'personal-brand', label: 'Личный бренд' },
      { id: 'resume', label: 'Резюме и собеседование' },
      { id: 'time-management', label: 'Тайм-менеджмент' },
      { id: 'project-management', label: 'Проектное управление' },
      { id: 'entrepreneurship', label: 'Предпринимательство' },
    ],
  },
  {
    id: 'art',
    label: 'Творчество и искусство',
    subcategories: [
      { id: 'drawing', label: 'Рисование и иллюстрация' },
      { id: 'photography', label: 'Фотография' },
      { id: 'video-editing', label: 'Видеомонтаж' },
      { id: 'music', label: 'Музыка и звук' },
      { id: 'acting', label: 'Актёрское мастерство' },
      { id: 'creative-writing', label: 'Креативное письмо' },
      { id: 'art-therapy', label: 'Арт-терапия' },
      { id: 'decor-diy', label: 'Декор и DIY' },
    ],
  },
  {
    id: 'languages',
    label: 'Иностранные языки',
    subcategories: [
      { id: 'english', label: 'Английский' },
      { id: 'french', label: 'Французский' },
      { id: 'spanish', label: 'Испанский' },
      { id: 'german', label: 'Немецкий' },
      { id: 'chinese', label: 'Китайский' },
      { id: 'japanese', label: 'Японский' },
      { id: 'ielts-toefl', label: 'Подготовка к экзаменам (IELTS, TOEFL)' },
    ],
  },
  {
    id: 'education',
    label: 'Образование и развитие',
    subcategories: [
      { id: 'personal-development', label: 'Личностное развитие' },
      { id: 'learning-skills', label: 'Навыки обучения' },
      { id: 'cognitive-skills', label: 'Когнитивные техники' },
      { id: 'speed-reading', label: 'Скорочтение' },
      { id: 'teaching', label: 'Навыки преподавания' },
      { id: 'coaching', label: 'Коучинг' },
    ],
  },
  {
    id: 'health',
    label: 'Здоровье и лайфстайл',
    subcategories: [
      { id: 'yoga', label: 'Йога и медитация' },
      { id: 'nutrition', label: 'Питание и ЗОЖ' },
      { id: 'mental-health', label: 'Ментальное здоровье' },
      { id: 'mindfulness', label: 'Осознанность' },
      { id: 'fitness', label: 'Физические тренировки' },
      { id: 'sleep', label: 'Сон и восстановление' },
      { id: 'work-life-balance', label: 'Баланс жизни и работы' },
    ],
  },
  {
    id: 'home',
    label: 'Дом и уют',
    subcategories: [
      { id: 'cleaning', label: 'Уборка и организация' },
      { id: 'home-finance', label: 'Домашние финансы' },
      { id: 'cooking', label: 'Приготовление еды' },
      { id: 'plants', label: 'Домашние растения' },
      { id: 'repair', label: 'Ремонт' },
      { id: 'storage', label: 'Хранение вещей' },
    ],
  },
]

const cities = [
  { id: 'moscow', label: 'Москва' },
  { id: 'saint-petersburg', label: 'Санкт-Петербург' },
  { id: 'novosibirsk', label: 'Новосибирск' },
  { id: 'ekaterinburg', label: 'Екатеринбург' },
  { id: 'kazan', label: 'Казань' },
  { id: 'nizhny-novgorod', label: 'Нижний Новгород' },
  { id: 'samara', label: 'Самара' },
  { id: 'ufa', label: 'Уфа' },
]

const defaultFiltersValue: FiltersSidebarValue = {
  skillType: 'all',
  categories: [],
  subcategories: [],
  gender: 'any',
  cities: [],
}

const visibleCategoriesCount = 4
const visibleCitiesCount = 5

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
}

function getActiveFiltersCount(value: FiltersSidebarValue) {
  return (
    (value.skillType === defaultFiltersValue.skillType ? 0 : 1) +
    value.subcategories.length +
    (value.gender === defaultFiltersValue.gender ? 0 : 1) +
    value.cities.length
  )
}

export function FiltersSidebar({
  value,
  defaultValue = defaultFiltersValue,
  onChange,
  className,
}: FiltersSidebarProps) {
  const titleId = useId()
  const skillsTitleId = useId()
  const citiesTitleId = useId()
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [isAllCategoriesVisible, setIsAllCategoriesVisible] = useState(false)
  const [isAllCitiesVisible, setIsAllCitiesVisible] = useState(false)
  const [openedCategoryIds, setOpenedCategoryIds] = useState<string[]>([])

  const currentValue = value ?? internalValue
  const classNames = [styles.sidebar, className].filter(Boolean).join(' ')
  const visibleCategories = isAllCategoriesVisible
    ? filterCategories
    : filterCategories.slice(0, visibleCategoriesCount)
  const visibleCities = isAllCitiesVisible ? cities : cities.slice(0, visibleCitiesCount)
  const activeFiltersCount = getActiveFiltersCount(currentValue)

  const updateValue = (nextValue: FiltersSidebarValue) => {
    if (!value) setInternalValue(nextValue)
    onChange?.(nextValue)
  }

  const updateField = <Key extends keyof FiltersSidebarValue>(
    key: Key,
    fieldValue: FiltersSidebarValue[Key],
  ) => {
    updateValue({ ...currentValue, [key]: fieldValue })
  }

  const handleCheckboxChange =
    (key: 'subcategories' | 'cities', itemValue: string) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        updateField(key, [...currentValue[key], itemValue])
        return
      }

      updateField(
        key,
        currentValue[key].filter((valueItem) => valueItem !== itemValue),
      )
    }

  const toggleCategory = (categoryId: string) => {
    setOpenedCategoryIds((ids) => toggleValue(ids, categoryId))
  }

  const handleReset = () => {
    updateValue(defaultFiltersValue)
    setOpenedCategoryIds([])
    setIsAllCategoriesVisible(false)
    setIsAllCitiesVisible(false)
  }

  return (
    <aside className={classNames} aria-labelledby={titleId}>
      <div className={styles.header}>
        <h2 className={styles.title} id={titleId}>
          Фильтры{activeFiltersCount > 0 && <span> ({activeFiltersCount})</span>}
        </h2>

        {activeFiltersCount > 0 && (
          <button className={styles.resetButton} type="button" onClick={handleReset}>
            <span>Сбросить</span>
            <span aria-hidden="true">×</span>
          </button>
        )}
      </div>

      <RadioGroup
        className={styles.radioGroup}
        header="Тип навыка"
        hideHeader
        name="skill-type"
        options={skillTypeOptions}
        checkedValue={currentValue.skillType}
        onChange={(nextValue) => updateField('skillType', nextValue as SkillFilterType)}
      />

      <section className={styles.section} aria-labelledby={skillsTitleId}>
        <h3 className={styles.sectionTitle} id={skillsTitleId}>
          Навыки
        </h3>

        <div className={styles.categoryList}>
          {visibleCategories.map((category) => {
            const isOpen = openedCategoryIds.includes(category.id)
            const selectedSubcategoryIds = category.subcategories
              .map((subcategory) => subcategory.id)
              .filter((subcategoryId) => currentValue.subcategories.includes(subcategoryId))
            const isCategoryChecked = selectedSubcategoryIds.length > 0

            return (
              <div className={styles.category} key={category.id}>
                <button
                  className={`${styles.categoryButton} ${isOpen ? styles.categoryButtonOpen : ''}`}
                  type="button"
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? 'Скрыть' : 'Показать'} подкатегории ${category.label}`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <span
                    className={`${styles.categoryIndicator} ${
                      isCategoryChecked ? styles.categoryIndicatorActive : ''
                    }`}
                    aria-hidden="true"
                  />
                  <span className={styles.categoryLabel}>{category.label}</span>
                  <span className={styles.chevron} aria-hidden="true" />
                </button>

                {isOpen && (
                  <div className={styles.subcategoryList}>
                    {category.subcategories.map((subcategory) => (
                      <CheckBox
                        key={subcategory.id}
                        className={styles.subcategory}
                        name={`${category.id}-subcategories`}
                        value={subcategory.id}
                        label={subcategory.label}
                        typeChecked="mark"
                        checked={currentValue.subcategories.includes(subcategory.id)}
                        onChange={handleCheckboxChange('subcategories', subcategory.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <button
          className={styles.showMoreButton}
          type="button"
          onClick={() => setIsAllCategoriesVisible((isVisible) => !isVisible)}
        >
          {isAllCategoriesVisible ? 'Скрыть категории' : 'Все категории'}
          <span
            className={`${styles.chevron} ${isAllCategoriesVisible ? styles.chevronUp : ''}`}
            aria-hidden="true"
          />
        </button>
      </section>

      <RadioGroup
        className={styles.radioGroup}
        header="Пол автора"
        name="author-gender"
        options={genderOptions}
        checkedValue={currentValue.gender}
        onChange={(nextValue) => updateField('gender', nextValue as AuthorGenderFilter)}
      />

      <section className={styles.section} aria-labelledby={citiesTitleId}>
        <h3 className={styles.sectionTitle} id={citiesTitleId}>
          Город
        </h3>

        <div className={styles.checkboxList}>
          {visibleCities.map((city) => (
            <CheckBox
              key={city.id}
              name="cities"
              value={city.id}
              label={city.label}
              typeChecked="mark"
              checked={currentValue.cities.includes(city.id)}
              onChange={handleCheckboxChange('cities', city.id)}
            />
          ))}
        </div>

        <button
          className={styles.showMoreButton}
          type="button"
          onClick={() => setIsAllCitiesVisible((isVisible) => !isVisible)}
        >
          {isAllCitiesVisible ? 'Скрыть города' : 'Все города'}
          <span
            className={`${styles.chevron} ${isAllCitiesVisible ? styles.chevronUp : ''}`}
            aria-hidden="true"
          />
        </button>
      </section>
    </aside>
  )
}
