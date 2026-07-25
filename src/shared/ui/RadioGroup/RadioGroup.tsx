import { useId } from 'react'
import { RadioButton } from '../RadioButton/RadioButton'
import styles from './RadioGroup.module.css'

export type TRadioOption = {
  value: string
  label: string
}

export type TRadioGroup = {
  options: TRadioOption[]
  checkedValue?: string
  onChange: (value: string) => void
  header: string
  hideHeader?: boolean
  name?: string
  className?: string
}

export const RadioGroup = ({
  options,
  checkedValue,
  onChange,
  header,
  hideHeader,
  name,
  className,
}: TRadioGroup) => {
  const generatedName = useId()
  const groupName = name ?? generatedName

  return (
    <fieldset className={`${styles.container} ${className ?? ''}`}>
      <legend className={hideHeader ? 'visuallyHidden' : styles.header}>{header}</legend>
      {options.map((item) => (
        <RadioButton
          key={item.value}
          name={groupName}
          value={item.value}
          label={item.label}
          checked={item.value === checkedValue}
          onChange={() => onChange(item.value)}
        />
      ))}
    </fieldset>
  )
}

/**
 * Управляемая группа радиокнопок — состояние хранит родитель.
 *
 * - `onChange` отдаёт значение (string), а не событие
 * - `checkedValue` должен совпадать с одним из `option.value`, иначе не выбрано ничего
 * - `name` может генерироваться через `useId()`, несколько групп на странице не конфликтуют, но можно задать свое
 * - `header` обязателен, `hideHeader` прячет визуально
 * - `className` уходит на корневой `<fieldset>` — им задаётся горизонтальная раскладка
 *
 * @example
 * const genderOptions: TRadioOption[] = [
  { value: 'any', label: 'Не имеет значения' },
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
]
 * const [gender, setGender] = useState('any')
 * <RadioGroup options={genderOptions} checkedValue={gender} onChange={setGender} header="Пол автора" />
 */
