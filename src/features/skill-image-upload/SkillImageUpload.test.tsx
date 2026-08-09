import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { SkillImageUpload } from './SkillImageUpload'

const originalURL = global.URL
const MOCK_URL = 'blob://test-preview.jpg'

beforeEach(() => {
  global.URL.createObjectURL = vi.fn(() => MOCK_URL)
  global.URL.revokeObjectURL = vi.fn()
})

afterEach(() => {
  global.URL = originalURL
})

describe('SkillImageUpload', () => {
  const onFileSelectMock = vi.fn()

  beforeEach(() => {
    onFileSelectMock.mockClear()
  })

  it('не принимает текстовый файл и показывает ошибку', () => {
    render(<SkillImageUpload onFileSelect={onFileSelectMock} />)

    const fakeTxtFile = new File(['hello world'], 'test.txt', { type: 'text/plain' })
    const inputElement = screen.getByTestId('file-input')

    fireEvent.change(inputElement, { target: { files: [fakeTxtFile] } })

    expect(
      screen.getByText('Пожалуйста, загрузите только изображения (jpg, png, gif и т.д.)'),
    ).toBeInTheDocument()
    expect(onFileSelectMock).not.toHaveBeenCalled()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('принимает картинку и передает файл в onFileSelect', () => {
    render(<SkillImageUpload onFileSelect={onFileSelectMock} />)

    const fakeJpgFile = new File(['fake image content'], 'test.jpg', { type: 'image/jpeg' })
    const inputElement = screen.getByTestId('file-input')

    fireEvent.change(inputElement, { target: { files: [fakeJpgFile] } })

    expect(
      screen.queryByText('Пожалуйста, загрузите только изображения (jpg, png, gif и т.д.)'),
    ).not.toBeInTheDocument()
    expect(onFileSelectMock).toHaveBeenCalledTimes(1)

    const [uploadedFile] = onFileSelectMock.mock.calls[0]
    expect(uploadedFile).toBe(fakeJpgFile)

    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('очищает ошибку при повторной попытке загрузки', () => {
    render(<SkillImageUpload onFileSelect={onFileSelectMock} />)

    const badFile = new File(['bad'], 'bad.txt', { type: 'text/plain' })
    const goodFile = new File(['good'], 'good.jpg', { type: 'image/jpeg' })
    const inputElement = screen.getByTestId('file-input')

    fireEvent.change(inputElement, { target: { files: [badFile] } })
    expect(
      screen.getByText('Пожалуйста, загрузите только изображения (jpg, png, gif и т.д.)'),
    ).toBeInTheDocument()
    expect(onFileSelectMock).not.toHaveBeenCalled()

    fireEvent.change(inputElement, { target: { files: [goodFile] } })

    expect(
      screen.queryByText('Пожалуйста, загрузите только изображения (jpg, png, gif и т.д.)'),
    ).not.toBeInTheDocument()
    expect(onFileSelectMock).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
