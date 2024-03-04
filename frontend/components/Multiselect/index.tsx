import React from 'react'
import { Select, SelectChangeEvent, Box, Chip, MenuItem, FormControl, InputLabel } from '@mui/material'
import { CATEGORY_LABEL } from '../../constants'

interface IOption{
  value: string
  label: string
}

interface IMultiselect {
  value: any
  onChange: (event: SelectChangeEvent<any>, child: React.ReactNode) => void
  label: string
  name: string
  id: string
  options: IOption[]
}

const Multiselect: React.FC<IMultiselect> = ({ value, onChange, name, label, id, options }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        label={label}
        id={id}
        name={name}
        fullWidth
        multiple
        value={value}
        onChange={onChange}
        renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value: string) => (
                <Chip key={value} label={CATEGORY_LABEL[value]} />
              ))}
            </Box>
        )}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default Multiselect