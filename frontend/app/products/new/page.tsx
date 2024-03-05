"use client"
import React, { Fragment } from 'react'
import Navbar from '../../../components/Navbar'
import { Stack, TextField, Button, Grid } from '@mui/material'
import Image from 'next/image'
import { useFormik } from 'formik'
import CurrencyInput from '../../../components/CurrencyInput'
import PercentageInput from '../../../components/PercentageInput'
import Multiselect from '../../../components/Multiselect'
import { useAppDispatch, useAppSelector } from '../../../lib/hooks'
import { RootState } from '../../../lib/store'
import { CATEGORY_LABEL } from '../../../constants'
import { createProduct } from '../../../lib/features/products/productService'
import ProductForm from '../../../components/ProductForm'
import { useRouter } from 'next/navigation'
import { productRoutes } from '../../../routes'
import { ProductValidation } from '@/utils/validation'

const NewProduct: React.FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: "",
      category: [],
      thumbnail: "",
    },
    validationSchema: ProductValidation,
    onSubmit(values) {
      const { brand, category, description, discountPercentage, price, rating, stock, thumbnail, title } = values
      dispatch(createProduct({
        brand, category: category.join(','), description, discountPercentage, price, rating, stock, thumbnail, title
      }))
      router.push(productRoutes.products)
    }
  })

  return (
    <Fragment>
      <Navbar />
      <Stack width='100%' paddingTop='132px' direction='row' height='100vh' justifyContent='space-around'>
        <ProductForm formik={formik}/>
        <Image src='/new_product.svg' alt='newProduct' width={500} height={500}/>
      </Stack>
    </Fragment>
  )
}

export default NewProduct