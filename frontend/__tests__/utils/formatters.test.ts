import { formatCurrency, formatCurrencyNumber, formatPercent, formatPercentNumber } from '../../utils/formaters'

describe('Utils', () => {
  it('Test formatCurrency', () => {
    const currency = 20

    const value = formatCurrency(currency)

    expect(typeof value).toBe('string')
    expect(value).toMatch(/20/)
    expect(value).toMatch(/R\$/)
  })

  it('Test formatPercent', () => {
    const percent = 20

    const value = formatPercent(percent)

    expect(typeof value).toBe('string')
    expect(value).toMatch(/20/)
    expect(value).toMatch(/%/)
  })

  it('Test formatCurrencyNumber', () => {
    const currency = 20

    const value = formatCurrencyNumber(currency)

    expect(typeof value).toBe('string')
    expect(value).toMatch(/20/)
    expect(value).not.toMatch(/R$/)
  })

  it('Test formatPercentNumber', () => {
    const currency = 20

    const value = formatPercentNumber(currency)

    expect(typeof value).toBe('string')
    expect(value).toMatch(/20/)
    expect(value).not.toMatch(/%/)
  })

  it('Test formatCurrency without number', () => {
    const currency = undefined

    const value = formatCurrency(currency)

    expect(typeof value).toBe('string')
    expect(value).toMatch(/0/)
    expect(value).toMatch(/R\$/)
  })

  it('Test formatPercent', () => {
    const percent = 0.20

    const value = formatPercent(percent, false)
    expect(typeof value).toBe('string')
    expect(value).toMatch(/20/)
    expect(value).toMatch(/%/)
  })
})