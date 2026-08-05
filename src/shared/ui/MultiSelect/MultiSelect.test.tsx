import { fireEvent, render, screen, within } from '@testing-library/react'
import { useMemo, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { MultiSelect, type MultiSelectOption } from './MultiSelect'

const categoryOptions: MultiSelectOption[] = [
  { value: 'business', label: 'Бизнес и карьера' },
  { value: 'art', label: 'Творчество и искусство' },
]

const subcategoriesByCategory: Record<string, MultiSelectOption[]> = {
  business: [
    { value: 'marketing', label: 'Маркетинг и реклама' },
    { value: 'sales', label: 'Продажи и переговоры' },
  ],
  art: [
    { value: 'drawing', label: 'Рисование и иллюстрация' },
    { value: 'music', label: 'Музыка и звук' },
  ],
}

function ControlledMultiSelect({
  onChange,
}: {
  onChange?: (values: string[]) => void
}) {
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const handleChange = (values: string[]) => {
    setSelectedValues(values)
    onChange?.(values)
  }

  return (
    <MultiSelect
      label="Категория навыка"
      placeholder="Выберите категорию"
      options={categoryOptions}
      selectedValues={selectedValues}
      onChange={handleChange}
    />
  )
}

function LinkedMultiSelects() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])

  const subcategoryOptions = useMemo(
    () => selectedCategories.flatMap((category) => subcategoriesByCategory[category] ?? []),
    [selectedCategories],
  )

  const handleCategoriesChange = (values: string[]) => {
    setSelectedCategories(values)
    setSelectedSubcategories((currentValues) =>
      currentValues.filter((value) =>
        values.some((category) =>
          subcategoriesByCategory[category]?.some((subcategory) => subcategory.value === value),
        ),
      ),
    )
  }

  return (
    <>
      <MultiSelect
        label="Категория навыка"
        placeholder="Выберите категорию"
        options={categoryOptions}
        selectedValues={selectedCategories}
        onChange={handleCategoriesChange}
      />
      <MultiSelect
        label="Подкатегория навыка"
        placeholder="Выберите подкатегорию"
        options={subcategoryOptions}
        selectedValues={selectedSubcategories}
        onChange={setSelectedSubcategories}
        disabled={!selectedCategories.length}
      />
    </>
  )
}

describe('MultiSelect', () => {
  it('открывает список вариантов по клику на поле', () => {
    render(<ControlledMultiSelect />)

    fireEvent.click(screen.getByRole('button', { name: 'Категория навыка' }))

    expect(screen.getByLabelText('Бизнес и карьера')).toBeInTheDocument()
    expect(screen.getByLabelText('Творчество и искусство')).toBeInTheDocument()
  })

  it('позволяет выбрать несколько вариантов', () => {
    const handleChange = vi.fn()

    render(<ControlledMultiSelect onChange={handleChange} />)

    fireEvent.click(screen.getByRole('button', { name: 'Категория навыка' }))
    fireEvent.click(screen.getByLabelText('Бизнес и карьера'))
    fireEvent.click(screen.getByLabelText('Творчество и искусство'))

    expect(handleChange).toHaveBeenLastCalledWith(['business', 'art'])
    expect(screen.getAllByText('Бизнес и карьера').length).toBeGreaterThan(1)
    expect(screen.getAllByText('Творчество и искусство').length).toBeGreaterThan(1)
  })

  it('снимает чекбокс при удалении плашки', () => {
    render(<ControlledMultiSelect />)

    fireEvent.click(screen.getByRole('button', { name: 'Категория навыка' }))
    fireEvent.click(screen.getByLabelText('Бизнес и карьера'))

    const selectedTags = screen.getByLabelText('Выбранные значения')
    const removeButton = within(selectedTags).getByRole('button')

    fireEvent.click(removeButton)

    expect(screen.getByLabelText('Бизнес и карьера')).not.toBeChecked()
    expect(screen.queryByLabelText('Выбранные значения')).not.toBeInTheDocument()
  })

  it('фильтрует подкатегории по выбранным категориям', () => {
    render(<LinkedMultiSelects />)

    fireEvent.click(screen.getByRole('button', { name: 'Категория навыка' }))
    fireEvent.click(screen.getByLabelText('Творчество и искусство'))
    fireEvent.click(screen.getByRole('button', { name: 'Подкатегория навыка' }))

    expect(screen.getByLabelText('Рисование и иллюстрация')).toBeInTheDocument()
    expect(screen.getByLabelText('Музыка и звук')).toBeInTheDocument()
    expect(screen.queryByLabelText('Маркетинг и реклама')).not.toBeInTheDocument()
  })
})
