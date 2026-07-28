import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Accordion } from './Accordion'
import styles from './Accordion.module.css'

describe('Accordion', () => {
  it('закрыт по умолчанию', () => {
    render(
      <Accordion title="Заголовок">
        <p>Контент</p>
      </Accordion>,
    )

    const button = screen.getByRole('button', { name: 'Заголовок' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('открывается по клику и закрывается повторным', async () => {
    const user = userEvent.setup()
    render(
      <Accordion title="Заголовок">
        <p>Контент</p>
      </Accordion>,
    )

    const button = screen.getByRole('button', { name: 'Заголовок' })

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('открыт сразу при defaultOpen', () => {
    render(
      <Accordion title="Заголовок" defaultOpen>
        <p>Контент</p>
      </Accordion>,
    )

    expect(screen.getByRole('button', { name: 'Заголовок' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  it('в controlled-режиме управляется извне и вызывает onToggle', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()

    render(
      <Accordion title="Заголовок" isOpen={false} onToggle={onToggle}>
        <p>Контент</p>
      </Accordion>,
    )

    const button = screen.getByRole('button', { name: 'Заголовок' })
    await user.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(onToggle).toHaveBeenCalledWith(true)
    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('в controlled-режиме отображает состояние, переданное родителем', () => {
    render(
      <Accordion title="Заголовок" isOpen={true} onToggle={vi.fn()}>
        <p>Контент</p>
      </Accordion>,
    )

    expect(screen.getByRole('button', { name: 'Заголовок' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  it('рендерит children внутри контента независимо от состояния open/closed', () => {
    render(
      <Accordion title="Заголовок">
        <p>Скрытый текст</p>
      </Accordion>,
    )

    expect(screen.getByText('Скрытый текст')).toBeInTheDocument()
  })

  it('поворачивает стрелочку при открытии (chevronOpen класс)', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Accordion title="Заголовок">
        <p>Контент</p>
      </Accordion>,
    )

    const chevron = container.querySelector('svg')
    expect(chevron).not.toHaveClass(styles.chevronOpen)

    await user.click(screen.getByRole('button', { name: 'Заголовок' }))

    expect(chevron).toHaveClass(styles.chevronOpen)
  })
})

describe('variant', () => {
  it('по умолчанию использует variant="default" — без headerGreen', () => {
    const { container } = render(
      <Accordion title="Заголовок">
        <p>Контент</p>
      </Accordion>,
    )

    const button = container.querySelector('button')
    expect(button).not.toHaveClass('headerGreen')
  })

  it('variant="green" добавляет класс headerGreen на кнопку', () => {
    const { container } = render(
      <Accordion title="Все категории" variant="green">
        <p>Контент</p>
      </Accordion>,
    )

    const button = container.querySelector('button')
    expect(button).toHaveClass(styles.headerGreen)
  })

  it('variant="green" добавляет paddingWrapperGreen на обёртку контента', () => {
    const { container } = render(
      <Accordion title="Все категории" variant="green">
        <p>Контент</p>
      </Accordion>,
    )

    const wrapper = container.querySelector(`.${styles.paddingWrapperGreen}`)
    expect(wrapper).not.toBeNull()
  })
  it('применяет переданный className к корневому элементу', () => {
    const { container } = render(
      <Accordion title="Заголовок" className="custom-class">
        <p>Контент</p>
      </Accordion>,
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })
})
