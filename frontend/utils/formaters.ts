export const formatCurrency = (
    value: number,
    options?: { style?: 'decimal' | 'currency' }
): string => {
    if (value === undefined) {
        return Number(0).toLocaleString('pt-BR', {
            currency: 'BRL',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            style: options?.style || 'currency',
        })
    }

    return Number(value).toLocaleString('pt-BR', {
        currency: 'BRL',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        style: options?.style || 'currency',
    })
}

export const formatPercent = (value: number | string, abs = true): string => {
    if (abs) {
        return (Number(value) / 100).toLocaleString('pt-BR', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            style: 'percent',
        })
    }
    return Number(value).toLocaleString('pt-BR', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        style: 'percent',
    })
}

export const formatCurrencyNumber = (value: number) => {
    return (value / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    })
}

export const formatPercentNumber = (value: number) => {
    return (value / 100).toLocaleString('pt-BR', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    })
}