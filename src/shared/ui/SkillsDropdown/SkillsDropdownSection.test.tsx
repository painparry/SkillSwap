import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SkillsDropdownSection } from './SkillsDropdownSection';
import type { SkillCategory } from '@/shared/types';

const category: SkillCategory = {
  id: 'business',
  name: 'Бизнес и карьера',
  subcategories: [
    { id: 'marketing', name: 'Маркетинг' },
    { id: 'sales', name: 'Продажи' },
  ],
};

describe('SkillsDropdownSection', () => {
  it('отображает название категории', () => {
    render(<SkillsDropdownSection category={category} />);

    expect(
      screen.getByText('Бизнес и карьера')
    ).toBeInTheDocument();
  });

  it('отображает все подкатегории', () => {
    render(<SkillsDropdownSection category={category} />);

    expect(screen.getByText('Маркетинг')).toBeInTheDocument();
    expect(screen.getByText('Продажи')).toBeInTheDocument();
  });

  it('отображает иконку', () => {
    const { container } = render(
      <SkillsDropdownSection category={category} />
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
