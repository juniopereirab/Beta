import React from 'react'
import { formatCurrencyNumber } from '../../utils/formaters'
import { TextField } from '@mui/material'

interface ICurrencyInput {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number
  name: string
  id: string
  label: string

}

const CurrencyInput: React.FC<ICurrencyInput> = ({ onChange, value, name, id, label }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    const floatValue = parseFloat(value.replace(/[^\d]/g, ''))

    if (Number.isNaN(floatValue)) {
      const newEvent = event
      newEvent.target.value = '0'
      return onChange(newEvent)
    }

    const newEvent = event
    newEvent.target.value = String(floatValue / 100)
    onChange(newEvent)
  }

  return (
    <TextField
      value={formatCurrencyNumber(value)}
      onChange={handleChange}
      fullWidth
      name={name}
      id={id}
      label={label}
    />
  )
}

export default CurrencyInput