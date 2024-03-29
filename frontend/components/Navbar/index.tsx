import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Stack, Typography, Box, Button, Menu, MenuItem, ListItemIcon } from '@mui/material'
import SearchInput from '../SearchInput'
import Image from 'next/image'
import { Person, ArrowBackIos, ArrowForwardIos, Inventory } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import { RootState } from '../../lib/store'
import { getCategories } from '../../lib/features/products/productService'
import { CATEGORY_LABEL } from '../../constants'
import { cleanState, setCategory, setSearch } from '../../lib/features/products/productSlice'
import { usePathname, useRouter } from 'next/navigation'
import { authRoutes, productRoutes } from '../../routes'
import { logout } from '../../lib/features/auth/authSlice'

const Navbar: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth)
  const { categories, category } = useAppSelector((state: RootState) => state.product)
  const categoryList = useRef<HTMLDivElement>(null)
  const [ term, setTerm ] = useState<string>('')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl)
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const router = useRouter()

  const getCategoriesList = useCallback(() => {
    dispatch(getCategories())
  }, [])

  const searchCategory = (category: string) => {
    dispatch(setCategory(category))
  }

  useEffect(() => {
    if (categories.length === 0) {
      getCategoriesList()
    }
  }, [getCategoriesList, categories])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack width='100%' sx={{ background: '#FFF' }} position='fixed' zIndex='1000'>
      <Stack direction='row' width='100%' justifyContent='space-between' alignItems='center' padding='8px 32px 0'>
        <Image
          src='/beta.png'
          width={50}
          height={50}
          alt='logo'
          onClick={() => {
            dispatch(cleanState())
            if (pathname !== productRoutes.products) {
              router.push(productRoutes.products)
            }
          }}
          style={{ cursor: 'pointer' }}
          priority
        />
        <Box width='100%' maxWidth={500}>
          <SearchInput
            handleSearch={(search) => {
              dispatch(setSearch(search))
              if (pathname !== productRoutes.products) {
                router.push(productRoutes.products)
              }
            }}
            term={term}
            setTerm={setTerm}
          />
        </Box>
        <Button
          variant='text'
          sx={{ textTransform: 'capitalize' }}
          id="profile-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Person />
          <Typography>{user.name}</Typography>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => router.push(productRoutes.newProduct)}>
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            Criar produto
          </MenuItem>
          <MenuItem onClick={() => {
            dispatch(logout())
            router.push(authRoutes.login)
          }}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>
      </Stack>
      {categories.length > 0 && (
        <Stack direction='row' overflow='auto' padding='8px 64px 8px 32px' className='hide-scroll' position='relative' ref={categoryList}>
          {categories.map((cat: string, index: number) => (
            <Typography
              key={`cat_${index}`}
              whiteSpace='nowrap'
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s',
                borderRadius: '4px',
                '&:hover': {
                  background: '#F0F0F0'
                },
                background: category === cat ? '#F0F0F0' : ''
              }}
              padding='4px 8px'
              onClick={() => {
                setTerm('')
                searchCategory(category === cat ? '' : cat)
                if (pathname !== productRoutes.products) {
                  router.push(productRoutes.products)
                }
              }}
            >
              {CATEGORY_LABEL[cat]}
            </Typography>
          ))}
          <Stack
            direction='row'
            gap={1}
            position='fixed'
            right='0'
            top='58px'
            sx={{ background: '#FFF' }}
            height='48px'
            alignItems='center'
            padding='0 0 0 4px'
          >
            <ArrowBackIos
              sx={{
                padding: '4px',
                transition: 'all 0.3s',
                borderRadius: '4px',
                cursor: 'pointer',
                '&:hover': {
                  background: '#F0F0F0'
                }
              }}
              onClick={() => categoryList.current?.scrollTo({ left: 0, behavior: 'smooth' })}
            />
            <ArrowForwardIos
              sx={{
                padding: '4px',
                transition: 'all 0.3s',
                borderRadius: '4px',
                cursor: 'pointer',
                '&:hover': {
                  background: '#F0F0F0'
                }
              }}
              onClick={() => categoryList.current?.scrollTo({ left: 2000, behavior: 'smooth' })}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}

export default Navbar