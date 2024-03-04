"use client"

import { Fragment, useCallback, useState, useEffect, useRef } from "react"
import { Stack, Breadcrumbs, Link, Typography, Rating, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material'
import Navbar from "../../../components/Navbar"
import { IProduct } from "../../../interfaces/Product"
import { useAppDispatch } from "../../../lib/hooks"
import { deleteProduct, getProductDetail } from "../../../lib/features/products/productService"
import { productRoutes } from "../../../routes"
import { useRouter } from "next/navigation"
import { CATEGORY_LABEL } from "../../../constants"
import Image from "next/image"
import { ArrowBackIos, ArrowForwardIos, Close } from '@mui/icons-material'
import { formatCurrency, formatPercent } from "../../../utils/formaters"

interface IPageProps {
  params: {
    id: string
  }
}

const ProductDetail = (props: IPageProps) => {
  const { params: { id } } = props
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [product, setProduct ] = useState<IProduct | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const imageList = useRef<HTMLDivElement>(null)

  const getProduct = useCallback(async () => {
    const response = await dispatch(getProductDetail({ id }))
    
    setProduct(response.payload)
  }, [id])

  useEffect(() => {
    getProduct()
  }, [getProduct])

  const handleDeleteProduct = useCallback(() => {
    dispatch(deleteProduct({ id }))
    router.push(productRoutes.products)
  }, [id])

  return (
    <Fragment>
      <Navbar />
      { product && (
        <Stack width='100%' padding='132px 40px 60px'>
          <Stack direction='row' width='100%' justifyContent='space-between'>
            <Breadcrumbs separator='>'>
              <Link underline="hover" key="1" color="inherit" href={productRoutes.products} onClick={() => router.push(productRoutes.products)}>
                Produtos
              </Link>
              <Link key="2" color="inherit" underline="none">
                {CATEGORY_LABEL[product.category.split(',')[0]]}
              </Link>
              <Link key="3" color="inherit" underline="none">
                {product.title}
              </Link>
            </Breadcrumbs>
            <Stack direction='row' gap={2}>
              <Button
                variant='contained' 
                color='secondary'
                onClick={() => router.push(`${productRoutes.editProduct}/${product._id || product.id}`)}
              >
                Editar
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={() => setOpen(true)}
              >
                Apagar
              </Button>
            </Stack>
          </Stack>
          <Stack direction='row' width='100%' marginTop='24px' gap='50px'>
            <Stack>
              <Stack width='100%' gap={2}>
                <Stack width='100%' maxWidth={600}>
                  <Image src={product.thumbnail} alt='thumb' width={600} height={550}/>
                </Stack>
                { product.images && product.images.length > 0 && (
                  <Stack width='100%' direction='row' gap={1} maxWidth={600} overflow='auto' className='hide-scroll' position='relative' ref={imageList}>
                    <Stack
                      alignItems='center'
                      justifyContent='center'
                      sx={{ background: "#F0F0F0", height: 150, position: 'sticky', left: 0, cursor: 'pointer'}}
                      onClick={() => imageList.current?.scrollTo({ left: imageList.current.scrollLeft - 300, behavior: 'smooth' })}
                    >
                      <ArrowBackIos />
                    </Stack>
                    {product.images.map((image, index) => (
                      <Image src={image} key={`image_${index}`} alt='subimages' width={200} height={150} />
                    ))}
                    <Stack
                      alignItems='center'
                      justifyContent='center'
                      sx={{ background: "#F0F0F0", height: 150, position: 'sticky', right: 0, cursor: 'pointer' }}
                      onClick={() => imageList.current?.scrollTo({ left: imageList.current.scrollLeft + 300, behavior: 'smooth' })}
                    >
                      <ArrowForwardIos />
                    </Stack>
                  </Stack>
                )}
              </Stack>
            </Stack>
            <Stack gap={1}>
              <Typography fontSize='20px' fontWeight={700}>{ product.title }</Typography>
              <Stack direction='row' gap={1} alignItems='center'>
                <Typography fontSize='16px' fontWeight={500} color='grey.500'>{ product.brand }</Typography>
                <Rating value={product.rating} precision={0.1} readOnly />
                <Typography fontSize='14px' fontWeight={500} color='grey.500'>({ product.stock } restantes)</Typography>
              </Stack>
              <Stack direction='row' gap={1} alignItems='center'>
                {product.category.split(',').map((category, index) => (
                  <Typography 
                    sx={(theme) => ({
                      background: theme.palette.secondary.main,
                      padding: '4px 12px',
                      borderRadius: '4px'
                    })}
                    key={`category_${index}`}
                  >
                    {CATEGORY_LABEL[category]}
                  </Typography>
                ))}
              </Stack>
              <Stack marginY='50px' direction='row' alignItems='flex-end' gap={2}>
                <Typography fontSize='24px' fontWeight={700} color='primary'>{formatCurrency(product.price)}</Typography>
                <Typography
                  color='grey.800'
                  fontWeight={700}
                  sx={(theme) => ({
                    padding: '0px 8px',
                    borderRadius: '4px',
                    background: theme.palette.secondary.main
                  })}
                >
                  - {formatPercent(product.discountPercentage)}
                </Typography>
              </Stack>
              <Stack>
                <Typography fontSize='16px' fontWeight={700}>Descrição</Typography>
                <Typography fontSize='16px' fontWeight={500}>{product.description}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Deletar produto
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Tem certeza que deseja deletar esse produto?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color='error' variant='contained' onClick={() => handleDeleteProduct()}>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default ProductDetail