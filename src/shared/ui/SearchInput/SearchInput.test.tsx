import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('отображает placeholder', () => {
    render(<SearchInput />);

    expect(
      screen.getByPlaceholderText('Искать навык')
    ).toBeInTheDocument();
  });

  it('обновляет значение при вводе текста', () => {
    render(<SearchInput />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, {
      target: { value: 'React' },
    });

    expect(screen.getByDisplayValue('React')).toBeInTheDocument();
  });

  it('отображает иконку поиска', () => {
    const { container } = render(<SearchInput />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
