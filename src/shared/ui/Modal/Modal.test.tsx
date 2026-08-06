import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  it('does not render when isOpen is false', () => {
    render(<Modal isOpen={false} onClose={vi.fn()} title="Hidden" />);
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('renders title, subtitle and button when open', () => {
    render(
      <Modal
        isOpen
        onClose={vi.fn()}
        title="Ваше предложение создано"
        subtitle="Теперь вы можете предложить обмен"
        buttonText="Готово"
      />,
    );

    expect(screen.getByText('Ваше предложение создано')).toBeInTheDocument();
    expect(screen.getByText('Теперь вы можете предложить обмен')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Готово' })).toBeInTheDocument();
  });

  it('calls onClose when the button is clicked', () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} buttonText="Готово" />);

    fireEvent.click(screen.getByRole('button', { name: 'Готово' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onButtonClick instead of onClose when provided', () => {
    const onClose = vi.fn();
    const onButtonClick = vi.fn();
    render(
      <Modal isOpen onClose={onClose} onButtonClick={onButtonClick} buttonText="Готово" />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Готово' }));
    expect(onButtonClick).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when clicking on the backdrop', () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} title="Title" />);

    fireEvent.click(screen.getByRole('presentation'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside the modal content', () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} title="Title" />);

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} title="Title" />);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});