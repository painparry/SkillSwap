import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('отображает label и связывает его с textarea через htmlFor', () => {
    render(
      <Textarea
        label="Расскажите о себе"
        value=""
        onChange={() => {}}
      />
    )

    expect(screen.getByLabelText('Расскажите о себе')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('отображает placeholder', () => {
    render(
      <Textarea
        placeholder="Напишите что-нибудь здесь..."
        value=""
        onChange={() => {}}
      />
    )

    expect(screen.getByPlaceholderText('Напишите что-нибудь здесь...')).toBeInTheDocument()
  })

  it('вызывает onChange при вводе текста', () => {
    const onChange = vi.fn()

    render(
      <Textarea
        value=""
        onChange={onChange}
      />
    )

    const textarea = screen.getByRole('textbox')
    
    fireEvent.change(textarea, {
      target: { value: 'Привет' }
    })

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('отображает переданное значение внутри поля', () => {
    render(
      <Textarea
        value="Уже существующий текст"
        onChange={() => {}}
      />
    )

    expect(screen.getByDisplayValue('Уже существующий текст')).toBeInTheDocument()
  })

  it('не рендерит label, если он не передан', () => {
    render(
      <Textarea
        value=""
        onChange={() => {}}
      />
    )
    expect(screen.queryByLabelText('Расскажите о себе')).not.toBeInTheDocument()
  })
})