"use client"
import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import { Fragment, useCallback, useEffect, useMemo } from 'react'
import { Grid } from '@mui/material'
import { useRouter } from 'next/navigation'
import { RootState } from '../../lib/store'
import { authRoutes } from '../../routes'
import Navbar from '../../components/Navbar'
import Pagination from '../../components/Pagination'
import { LIMIT_REQUEST } from '../../constants'
import { getProducts } from '../../lib/features/products/productService'
import { setPage } from '../../lib/features/products/productSlice'
import { IProduct } from '../../interfaces/Product'
import ProductCard from '../../components/ProductCard'

const Products = (props: any) => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const { page, search, category, products, total } = useAppSelector((state: RootState) => state.product)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const getProductList = useCallback(() => {
    const skip = (page - 1) * LIMIT_REQUEST
    dispatch(getProducts({
      limit: LIMIT_REQUEST,
      skip,
      search,
      category
    }))
  }, [page, search, category])

  const totalPages = useMemo(() => {
    return Math.ceil(total / LIMIT_REQUEST)
  }, [total])

  useEffect(() => {
    getProductList()
  }, [getProductList])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(authRoutes.login)
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <Fragment>
      <Navbar />
      {products.length > 0 && (
        <Grid container rowGap='24px' columnGap='12px' paddingBottom='48px' paddingTop='112px' justifyContent='center'>
          {products.map((product: IProduct) => <ProductCard key={ product._id || product.id } product={product}/>)}
        </Grid>
      )}
      <Pagination page={page} onChange={(_, value) => dispatch(setPage(value))} count={totalPages} />
    </Fragment>
  )
}

export default Products