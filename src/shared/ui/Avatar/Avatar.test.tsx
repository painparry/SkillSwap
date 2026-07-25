import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('рендерит картинку, если передан src', () => {
    render(<Avatar src="/avatar.png" name="Иван" seed="user-1" />)
    const image = screen.getByRole('img', { name: 'Иван' })
    expect(image).toHaveAttribute('src', '/avatar.png')
  })

  it('показывает цветную заглушку без картинки, если src не передан', () => {
    const { container } = render(<Avatar name="Иван" seed="user-1" />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(container.firstChild).toHaveStyle({
      backgroundColor: expect.stringContaining('hsl') as unknown as string,
    })
  })

  it('показывает заглушку, если картинка не загрузилась', () => {
    render(<Avatar src="/broken.png" name="Иван" seed="user-1" />)
    const image = screen.getByRole('img', { name: 'Иван' })
    fireEvent.error(image)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('применяет класс размера', () => {
    const { container: sm } = render(<Avatar name="A" seed="user-1" size="sm" />)
    const { container: lg } = render(<Avatar name="A" seed="user-1" size="lg" />)
    expect((sm.firstChild as HTMLElement).className).toMatch(/sm/)
    expect((lg.firstChild as HTMLElement).className).toMatch(/lg/)
  })

  it('даёт разный цвет заглушки для разных пользователей с одинаковым именем, но разным seed)', () => {
    const { container: first } = render(<Avatar name="Иван" seed="user-1" />)
    const { container: second } = render(<Avatar name="Иван" seed="user-2" />)
    const firstColor = (first.firstChild as HTMLElement).style.backgroundColor
    const secondColor = (second.firstChild as HTMLElement).style.backgroundColor
    expect(firstColor).not.toBe(secondColor)
  })

  it('даёт одинаковый цвет для одного seed независимо от имени', () => {
    const { container: first } = render(<Avatar name="Иван" seed="user-1" />)
    const { container: second } = render(<Avatar name="Неиван" seed="user-1" />)
    const firstColor = (first.firstChild as HTMLElement).style.backgroundColor
    const secondColor = (second.firstChild as HTMLElement).style.backgroundColor
    expect(firstColor).toBe(secondColor)
  })
})
