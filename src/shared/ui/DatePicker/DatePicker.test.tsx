import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { DatePicker } from './DatePicker'

function ControlledDatePicker({ initialValue = '' }: { initialValue?: string }) {
  const [value, setValue] = useState(initialValue)

  return <DatePicker value={value} onChange={setValue} />
}

describe('DatePicker', () => {
  it('показывает поле с иконкой календаря', () => {
    render(<DatePicker value="" onChange={vi.fn()} />)

    expect(screen.getByLabelText('Дата рождения')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Открыть календарь' })).toBeInTheDocument()
  })

  it('открывает календарь при клике на иконку', () => {
    render(<DatePicker value="" onChange={vi.fn()} />)

    fireEvent.click(screen.getByRole('button', { name: 'Открыть календарь' }))

    expect(screen.getByRole('dialog', { name: 'Дата рождения' })).toBeInTheDocument()
  })

  it('форматирует ручной ввод и пропускает только цифры', () => {
    const onChange = vi.fn()
    render(<DatePicker value="" onChange={onChange} />)

    fireEvent.change(screen.getByLabelText('Дата рождения'), {
      target: { value: '10a02b1998' },
    })

    expect(onChange).toHaveBeenCalledWith('10.02.1998')
  })

  it('ограничивает ручной ввод допустимыми значениями даты', () => {
    const onChange = vi.fn()
    render(<DatePicker value="" onChange={onChange} />)

    fireEvent.change(screen.getByLabelText('Дата рождения'), {
      target: { value: '40132027' },
    })

    expect(onChange).toHaveBeenCalledWith('31.12.2026')
  })

  it('учитывает количество дней в выбранном месяце', () => {
    const onChange = vi.fn()
    render(<DatePicker value="" onChange={onChange} />)

    fireEvent.change(screen.getByLabelText('Дата рождения'), {
      target: { value: '31041998' },
    })
    fireEvent.change(screen.getByLabelText('Дата рождения'), {
      target: { value: '29021999' },
    })
    fireEvent.change(screen.getByLabelText('Дата рождения'), {
      target: { value: '29022000' },
    })

    expect(onChange).toHaveBeenNthCalledWith(1, '30.04.1998')
    expect(onChange).toHaveBeenNthCalledWith(2, '28.02.1999')
    expect(onChange).toHaveBeenNthCalledWith(3, '29.02.2000')
  })

  it('применяет введенную дату по Enter и переводит календарь на эту дату', () => {
    const onChange = vi.fn()
    render(<DatePicker value="10.02.1998" onChange={onChange} />)

    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Дата рождения' }), { key: 'Enter' })

    expect(onChange).toHaveBeenCalledWith('10.02.1998')
    expect(screen.queryByRole('dialog', { name: 'Дата рождения' })).not.toBeInTheDocument()
  })

  it('выбирает дату из календаря по кнопке подтверждения', () => {
    const onChange = vi.fn()
    render(<DatePicker value="" onChange={onChange} />)

    fireEvent.click(screen.getByRole('button', { name: 'Открыть календарь' }))
    fireEvent.click(screen.getByRole('button', { name: '27.04.2000' }))
    fireEvent.click(screen.getByRole('button', { name: 'Выбрать' }))

    expect(onChange).toHaveBeenCalledWith('27.04.2000')
    expect(screen.queryByRole('dialog', { name: 'Дата рождения' })).not.toBeInTheDocument()
  })

  it('сразу обновляет поле при выборе даты в календаре', () => {
    render(<ControlledDatePicker />)

    fireEvent.click(screen.getByRole('button', { name: 'Открыть календарь' }))
    fireEvent.click(screen.getByRole('button', { name: '27.04.2000' }))

    expect(screen.getByRole('textbox', { name: 'Дата рождения' })).toHaveValue('27.04.2000')
  })

  it('меняет месяц и год в календаре', () => {
    render(<DatePicker value="" onChange={vi.fn()} />)

    fireEvent.click(screen.getByRole('button', { name: 'Открыть календарь' }))
    fireEvent.change(screen.getByLabelText('Месяц'), { target: { value: '1' } })
    fireEvent.change(screen.getByLabelText('Год'), { target: { value: '1998' } })

    expect(screen.getByLabelText('Месяц')).toHaveValue('1')
    expect(screen.getByLabelText('Год')).toHaveValue('1998')
  })

  it('закрывает календарь по Escape и очищает поле по отмене', () => {
    render(<ControlledDatePicker initialValue="10.02.1998" />)

    fireEvent.click(screen.getByRole('button', { name: 'Открыть календарь' }))
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Дата рождения' }), { key: 'Escape' })
    expect(screen.queryByRole('dialog', { name: 'Дата рождения' })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Открыть календарь' }))
    fireEvent.click(screen.getByRole('button', { name: 'Отменить' }))
    expect(screen.queryByRole('dialog', { name: 'Дата рождения' })).not.toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Дата рождения' })).toHaveValue('')
  })

  it('сохраняет позицию курсора при правке даты в середине', () => {
    render(<ControlledDatePicker initialValue="10.02.1998" />)

    const input = screen.getByRole('textbox', { name: 'Дата рождения' }) as HTMLInputElement
    input.setSelectionRange(4, 4)

    fireEvent.change(input, {
      target: { value: '10.12.1998', selectionStart: 5 },
    })

    expect(input).toHaveValue('10.12.1998')
    expect(input.selectionStart).toBe(5)
  })
})
