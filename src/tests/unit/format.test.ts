import { describe, expect, it } from 'vitest'

import { formatClock, formatMetricValue, formatNumber, formatPercent } from '@/utils/format'

describe('format utils', () => {
  it('formats large numbers for Chinese locale', () => {
    expect(formatNumber(128960)).toBe('128,960')
  })

  it('formats percentages with one decimal', () => {
    expect(formatPercent(98.666)).toBe('98.7%')
  })

  it('formats metric values with units', () => {
    expect(formatMetricValue(3684, '单')).toBe('3,684单')
    expect(formatMetricValue(98.7, '%')).toBe('98.7%')
  })

  it('formats clock values with date and time', () => {
    expect(formatClock(new Date('2026-07-07T13:14:15+08:00'))).toContain('2026/07/07')
  })
})
