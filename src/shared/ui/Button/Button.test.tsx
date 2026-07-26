import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('отображает переданный текст', () => {
    render(<Button>Подробнее</Button>)
    expect(screen.getByRole('button', { name: 'Подробнее' })).toBeInTheDocument()
  })

  it('вызывает onClick при клике', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Подробнее</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Подробнее' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('не вызывает onClick, если кнопка disabled', () => {
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} disabled>
        Обмен предложен
      </Button>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Обмен предложен' }))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('применяет класс варианта', () => {
    const { container: primary } = render(<Button variant="primary">A</Button>)
    const { container: secondary } = render(<Button variant="secondary">B</Button>)
    const { container: tertiary } = render(<Button variant="tertiary">C</Button>)
    expect((primary.firstChild as HTMLElement).className).toMatch(/primary/)
    expect((secondary.firstChild as HTMLElement).className).toMatch(/secondary/)
    expect((tertiary.firstChild as HTMLElement).className).toMatch(/tertiary/)
  })
})
