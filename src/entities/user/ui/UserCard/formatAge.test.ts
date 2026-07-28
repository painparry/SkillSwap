import { describe, it, expect } from 'vitest'
import { formatAge } from './formatAge'

describe('formatAge', () => {
  it('склоняет "год" для 1, 21, 31', () => {
    expect(formatAge(1)).toBe('1 год')
    expect(formatAge(21)).toBe('21 год')
    expect(formatAge(31)).toBe('31 год')
  })

  it('склоняет "года" для 2-4, 22-24', () => {
    expect(formatAge(2)).toBe('2 года')
    expect(formatAge(34)).toBe('34 года')
    expect(formatAge(23)).toBe('23 года')
  })

  it('склоняет "лет" для 5-20, 11-14, 25', () => {
    expect(formatAge(5)).toBe('5 лет')
    expect(formatAge(11)).toBe('11 лет')
    expect(formatAge(14)).toBe('14 лет')
    expect(formatAge(25)).toBe('25 лет')
  })
})
