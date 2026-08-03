import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SkillsDropdown } from './SkillsDropdown';
import type { SkillCategory } from '@/shared/types';

const sections: SkillCategory[] = [
  {
    id: 'business',
    name: 'Бизнес и карьера',
    subcategories: [
      { id: 'marketing', name: 'Маркетинг' },
    ],
  },
];

describe('SkillsDropdown', () => {
  it('по умолчанию скрывает список категорий', () => {
    render(<SkillsDropdown sections={sections} />);

    expect(
      screen.queryByText('Бизнес и карьера')
    ).not.toBeInTheDocument();
  });

  it('открывает dropdown по клику', () => {
    render(<SkillsDropdown sections={sections} />);

    fireEvent.click(
      screen.getByRole('button', { name: /Все навыки/i })
    );

    expect(
      screen.getByText('Бизнес и карьера')
    ).toBeInTheDocument();
  });

  it('закрывает dropdown при повторном клике', () => {
    render(<SkillsDropdown sections={sections} />);

    const button = screen.getByRole('button', {
      name: /Все навыки/i,
    });

    fireEvent.click(button);
    fireEvent.click(button);

    expect(
      screen.queryByText('Бизнес и карьера')
    ).not.toBeInTheDocument();
  });

  it('изменяет aria-expanded', () => {
    render(<SkillsDropdown sections={sections} />);

    const button = screen.getByRole('button', {
      name: /Все навыки/i,
    });

    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
