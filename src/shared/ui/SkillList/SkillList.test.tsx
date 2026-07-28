import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SkillList } from './SkillList'
import type { SkillItem } from './SkillList'

const gitara: SkillItem = { title: 'Гитара', category: 'art' }
const vokal: SkillItem = { title: 'Вокал', category: 'art' }
const joga: SkillItem = { title: 'Йога', category: 'health' }
const risovanie: SkillItem = { title: 'Рисование', category: 'art' }
const englishTag: SkillItem = { title: 'Английский язык', category: 'languages' }

describe('SkillList', () => {
  it('отображает оба заголовка секций', () => {
    render(<SkillList canTeach={[gitara]} wantsToLearn={[joga]} />)
    expect(screen.getByText('Может научить:')).toBeInTheDocument()
    expect(screen.getByText('Хочет научиться:')).toBeInTheDocument()
  })

  it('показывает все навыки, если их не больше maxVisible', () => {
    render(<SkillList canTeach={[gitara]} wantsToLearn={[joga, englishTag]} maxVisible={2} />)
    expect(screen.getByText('Гитара')).toBeInTheDocument()
    expect(screen.getByText('Йога')).toBeInTheDocument()
    expect(screen.getByText('Английский язык')).toBeInTheDocument()
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument()
  })

  it('обрезает список и показывает "+N" для остатка в каждой секции независимо', () => {
    render(
      <SkillList
        canTeach={[gitara, vokal, risovanie]}
        wantsToLearn={[joga, englishTag, gitara, risovanie]}
        maxVisible={2}
      />,
    )
    expect(screen.getByText('Гитара')).toBeInTheDocument()
    expect(screen.getByText('Вокал')).toBeInTheDocument()
    expect(screen.queryByText('Рисование')).not.toBeInTheDocument()

    expect(screen.getByText('Йога')).toBeInTheDocument()
    expect(screen.getByText('Английский язык')).toBeInTheDocument()

    expect(screen.getAllByText('+1')).toHaveLength(1)
    expect(screen.getAllByText('+2')).toHaveLength(1)
  })
})
