import React from 'react'
import { Pagination as MUIPagination, PaginationItem, Box, PaginationProps } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'

interface IPagination {
  count: number
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void
  page: number
}

const Pagination: React.FC<IPagination> = ({ count, onChange, page }) => {

  if (count <= 1) {
    return null
  }
  return (
    <Box width='100%' display='flex' justifyContent='center' position='fixed' bottom='0' padding='8px 0' sx={{ background: '#F0F0F0' }} zIndex='1000'>
      <MUIPagination
        count={count}
        onChange={onChange}
        page={page}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBack, next: ArrowForward }}
            {...item}
          />
        )}
      />
    </Box>
  )
}

export default Pagination