import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ImageCarousel } from './ImageCarousel'

describe('ImageCarousel', () => {
  const mockImages = [
    'https://picsum.photos/seed/1/800/600',
    'https://picsum.photos/seed/2/800/600',
    'https://picsum.photos/seed/3/800/600',
    'https://picsum.photos/seed/4/800/600',
    'https://picsum.photos/seed/5/800/600',
  ]

  it('отображает первое изображение', () => {
    render(<ImageCarousel images={mockImages} />)
    const img = screen.getByAltText('Фото 1')
    expect(img).toHaveAttribute('src', mockImages[0])
  })

  it('переключается на следующее при клике на стрелку "Вперёд"', () => {
    render(<ImageCarousel images={mockImages} />)
    const nextButton = screen.getByLabelText('Следующее фото')
    fireEvent.click(nextButton)
    const img = screen.getByAltText('Фото 2')
    expect(img).toHaveAttribute('src', mockImages[1])
  })

  it('переключается на предыдущее при клике на стрелку "Назад"', () => {
    render(<ImageCarousel images={mockImages} />)
    const prevButton = screen.getByLabelText('Предыдущее фото')
    fireEvent.click(prevButton)
    const img = screen.getByAltText('Фото 5')
    expect(img).toHaveAttribute('src', mockImages[4])
  })

  it('переключается на конкретный слайд при клике на превью', () => {
    render(<ImageCarousel images={mockImages} />)
    const previews = screen.getAllByLabelText(/Перейти к фото/)
    fireEvent.click(previews[2])
    const img = screen.getByAltText('Фото 4')
    expect(img).toHaveAttribute('src', mockImages[3])
  })

  it('показывает +N на последнем превью, если фото > 4', () => {
    render(<ImageCarousel images={mockImages} />)
    expect(screen.getByText('+1')).toBeInTheDocument()
  })

  it('не показывает +N, если фото <= 4', () => {
    const fourImages = mockImages.slice(0, 4)
    render(<ImageCarousel images={fourImages} />)
    expect(screen.queryByText(/^\+\d+/)).not.toBeInTheDocument()
  })

  it('ничего не рендерит, если images пустой', () => {
    render(<ImageCarousel images={[]} />)
    expect(screen.queryByAltText('Фото 1')).not.toBeInTheDocument()
  })
})