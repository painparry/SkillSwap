import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('отображает placeholder', () => {
    render(
  <SearchInput value='' placeholder='Искать навык' onChange={() => {}}/>
);

    expect(
      screen.getByPlaceholderText('Искать навык')
    ).toBeInTheDocument();
  });

  it('вызывает onChange при вводе текста', () => {
  const handleChange = vi.fn();

  render(
    <SearchInput value='' placeholder='Искать навык' onChange={handleChange}/>
  );

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'React' },
  });

  expect(handleChange).toHaveBeenCalledTimes(1);
});

  it('отображает иконку поиска', () => {
    const { container } = render(<SearchInput
    value=""
    onChange={() => {}}
    placeholder="Искать навык"
  />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
