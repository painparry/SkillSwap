import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Autocomplete, type AutocompleteOption } from './Autocomplete'

const cityOptions: AutocompleteOption[] = [
  { value: 'saint-petersburg', label: 'Санкт-Петербург' },
  { value: 'samara', label: 'Самара' },
  { value: 'saratov', label: 'Саратов' },
  { value: 'moscow', label: 'Москва' },
]

function ControlledAutocomplete({
  initialValue = '',
  onChange,
  onSelect,
}: {
  initialValue?: string
  onChange?: (value: string) => void
  onSelect?: (option: AutocompleteOption) => void
}) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (nextValue: string) => {
    setValue(nextValue)
    onChange?.(nextValue)
  }

  return (
    <Autocomplete
      label="Город"
      placeholder="Введите город"
      value={value}
      options={cityOptions}
      onChange={handleChange}
      onSelect={onSelect}
    />
  )
}

describe('Autocomplete', () => {
  it('отображает label и placeholder', () => {
    render(
      <Autocomplete
        label="Город"
        placeholder="Введите город"
        value=""
        options={cityOptions}
        onChange={() => {}}
      />,
    )

    expect(screen.getByLabelText('Город')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Введите город')).toBeInTheDocument()
  })

  it('показывает подходящие варианты при вводе текста', () => {
    render(<ControlledAutocomplete />)

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Са' } })

    expect(screen.getByRole('option', { name: 'Санкт-Петербург' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Самара' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Саратов' })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Москва' })).not.toBeInTheDocument()
  })

  it('не показывает список, если совпадений нет', () => {
    render(<ControlledAutocomplete />)

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Владивосток' } })

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('подставляет выбранный вариант в поле', () => {
    const handleChange = vi.fn()
    const handleSelect = vi.fn()

    render(<ControlledAutocomplete initialValue="Са" onChange={handleChange} onSelect={handleSelect} />)

    fireEvent.focus(screen.getByRole('combobox'))
    fireEvent.click(screen.getByRole('option', { name: 'Самара' }))

    expect(handleChange).toHaveBeenCalledWith('Самара')
    expect(handleSelect).toHaveBeenCalledWith({ value: 'samara', label: 'Самара' })
    expect(screen.getByDisplayValue('Самара')).toBeInTheDocument()
  })

  it('очищает поле по кнопке очистки', () => {
    const handleChange = vi.fn()

    render(<ControlledAutocomplete initialValue="Самара" onChange={handleChange} />)

    fireEvent.click(screen.getByRole('button', { name: 'Очистить поле Город' }))

    expect(handleChange).toHaveBeenCalledWith('')
    expect(screen.getByRole('combobox')).toHaveValue('')
  })

  it('выбирает активный вариант по Enter', () => {
    const handleChange = vi.fn()

    render(<ControlledAutocomplete initialValue="Са" onChange={handleChange} />)

    fireEvent.focus(screen.getByRole('combobox'))
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' })
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' })

    expect(handleChange).toHaveBeenCalledWith('Самара')
  })
})
