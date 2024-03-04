import React, { useState } from 'react'
import { FormControl, TextField, InputAdornment } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useAppSelector } from '../../lib/hooks'
import { RootState } from '../../lib/store'

interface ISearchInput {
  handleSearch: (value: string) => void
  term: string
  setTerm: React.Dispatch<React.SetStateAction<string>>
}

const SearchInput: React.FC<ISearchInput> = ({ handleSearch, term, setTerm }) => {
  
  return (
    <FormControl sx={{ margin: 0, width: '100%' }}>
      <TextField
        fullWidth
        size='small'
        variant='outlined'
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        onKeyDown={(event) => {
          if(event.code === 'Enter' || event.code === "NumpadEnter") {
            handleSearch(term)
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position='end'
              onClick={() => handleSearch(term)}
            >
              <Search />
            </InputAdornment>
          )
        }}

      />
    </FormControl>
  )
}

export default SearchInput