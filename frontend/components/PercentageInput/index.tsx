import React from 'react'
import { TextField, InputAdornment } from '@mui/material'
import { formatPercentNumber } from '../../utils/formaters';

interface IPercentageInput {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number
  name: string
  id: string
  label: string
  max?: number
  hideAdornment?: boolean
}

const PercentageInput: React.FC<IPercentageInput> = ({onChange, value, name, id, label, max = 100, hideAdornment = false}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    const floatValue = parseFloat(value.replace(/[^\d]/g, ''))

    if (Number.isNaN(floatValue)) {
      const newEvent = event
      newEvent.target.value = '0'
      return onChange(newEvent)
    }

    if (floatValue / 100 > max) {
      const newEvent = event
      newEvent.target.value = String(max)
      return onChange(newEvent)
    }

    const newEvent = event
    newEvent.target.value = String(floatValue / 100)
    onChange(newEvent)
  }
  return (
    <TextField
        id={id}
        name={name}
        value={formatPercentNumber(value)}
        label={label}
        onChange={handleChange}
        InputProps={{
            endAdornment: !hideAdornment && <InputAdornment position="end">%</InputAdornment>,
        }}
    />
  )
}

export default PercentageInput