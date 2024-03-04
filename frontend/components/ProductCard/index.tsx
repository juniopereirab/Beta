import React from 'react'
import { Stack, Typography, Rating, Grid } from '@mui/material'
import { IProduct } from '../../interfaces/Product'
import Image from 'next/image'
import { formatCurrency, formatPercent } from '../../utils/formaters'
import { useRouter } from 'next/navigation'
import { productRoutes } from '../../routes'

interface IProductCard {
  product: IProduct
}

const ProductCard: React.FC<IProductCard> = ({ product }) => {
  const router = useRouter()
  return (
    <Grid item onClick={() => router.push(`${productRoutes.products}/${product._id || product.id}`)}>
      <Stack sx={{ transition: 'all 0.3s', cursor: 'pointer', '&:hover': { background: '#FFF' } }} padding='8px' borderRadius='12px' gap='4px'>
        <Image src={product.thumbnail} alt='product_image' width={290} height={360} priority style={{ borderRadius: '4px' }} />
        <Typography fontWeight={500}>{product.title}</Typography>
        <Stack direction='row' gap={1} alignItems='center'>
          <Rating value={product.rating} readOnly precision={0.1} />
          <Typography fontSize='12px' color='grey.500'>({product.stock} restantes)</Typography>
        </Stack>
        <Stack direction='row' gap={1}>
          <Typography color='primary' fontWeight={700}>{formatCurrency(product.price)}</Typography>
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
      </Stack>
    </Grid>
  )
}

export default ProductCard