import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('отображает label', () => {
    render(
      <Input
        label="Email"
        value=""
        onChange={() => {}}
      />
    )

    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('отображает placeholder', () => {
    render(
      <Input
        placeholder="Введите email"
        value=""
        onChange={() => {}}
      />
    )

    expect(
      screen.getByPlaceholderText('Введите email')
    ).toBeInTheDocument()
  })

  it('вызывает onChange при вводе текста', () => {
    const onChange = vi.fn()

    render(
      <Input
        value=""
        onChange={onChange}
      />
    )

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test@mail.ru' }
    })

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('отображает переданное значение', () => {
    render(
      <Input
        value="hello"
        onChange={() => {}}
      />
    )

    expect(screen.getByDisplayValue('hello')).toBeInTheDocument()
  })

  it('рендерится без label', () => {
    render(
      <Input
        value=""
        onChange={() => {}}
      />
    )

    expect(screen.queryByText('Email')).not.toBeInTheDocument()
  })
})
