"use client"
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import Navbar from '../../../../components/Navbar'
import { Stack } from '@mui/material'
import Image from 'next/image'
import { useFormik } from 'formik'
import { useAppDispatch } from '../../../../lib/hooks'
import { editProduct, getProductDetail } from '../../../../lib/features/products/productService'
import ProductForm from '../../../../components/ProductForm'
import { IProduct } from '../../../../interfaces/Product'
import { useRouter } from 'next/navigation'
import { productRoutes } from '../../../../routes'
import { ProductValidation } from '@/utils/validation'

interface IPageProps {
    params: {
      id: string
    }
  }  

const EditProduct: React.FC<IPageProps> = (props) => {
  const { params: { id } } = props
  const dispatch = useAppDispatch()
  const [product, setProduct] = useState<IProduct | null>(null)
  const router = useRouter()

  const getProduct = useCallback(async () => {
    const response = await dispatch(getProductDetail({ id }))
    
    setProduct(response.payload)
  }, [id])

  useEffect(() => {
    getProduct()
  }, [getProduct])

  const formik = useFormik({
    initialValues: product ? {
      ...product,
      category: product?.category.split(',') || []
    } : {
      id: 0,
      _id: "",
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
    enableReinitialize: true,
    onSubmit(values) {
      const { id, _id, brand, category, description, discountPercentage, price, rating, stock, thumbnail, title } = values
      dispatch(editProduct({
        _id, id, brand, category: category.join(','), description, discountPercentage, price, rating, stock, thumbnail, title
      }))
      router.push(`${productRoutes.products}/${_id || id}`)
    }
  })

  return (
    <Fragment>
      <Navbar />
      <Stack width='100%' paddingTop='132px' direction='row' height='100vh' justifyContent='space-around'>
        <ProductForm formik={formik} isEdit/>
        <Image src='/edit_product.svg' alt='newProduct' width={500} height={500}/>
      </Stack>
    </Fragment>
  )
}

export default EditProduct