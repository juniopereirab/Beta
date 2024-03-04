import React from 'react'
import { Grid, TextField, Button } from '@mui/material'
import CurrencyInput from '../CurrencyInput'
import PercentageInput from '../PercentageInput'
import { useAppSelector } from '../../lib/hooks'
import { RootState } from '../../lib/store'
import Multiselect from '../Multiselect'
import { CATEGORY_LABEL } from '../../constants'

interface IProductForm {
  formik: any
  isEdit?: boolean
}

const ProductForm: React.FC<IProductForm> = ({ formik, isEdit = false }) => {
  const { categories } = useAppSelector((state: RootState) => state.product)

  return (
    <Grid container width='100%' spacing={1} maxWidth={500} paddingLeft='32px'>
      <Grid item xs={12}>
        <TextField
          label='Título'
          id='title'
          name='title'
          fullWidth
          value={formik.values.title}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label='Descrição'
          id='description'
          name='description'
          fullWidth
          value={formik.values.description}
          onChange={formik.handleChange}
          multiline
          rows={3}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CurrencyInput
          label='Preço'
          id='price'
          name='price'
          value={Number(formik.values.price) * 100}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid item md={4}>
        <PercentageInput
          label='Desconto'
          id='discountPercentage'
          name='discountPercentage'
          value={Number(formik.values.discountPercentage) * 100}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <PercentageInput
          label='Avaliação'
          id='rating'
          name='rating'
          value={Number(formik.values.rating) * 100}
          onChange={formik.handleChange}
          max={5}
          hideAdornment
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          label='Estoque'
          id='stock'
          name='stock'
          type='number'
          fullWidth
          value={formik.values.stock}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          label='Marca'
          id='brand'
          name='brand'
          fullWidth
          value={formik.values.brand}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Multiselect
          label='Categorias'
          id='category'
          name='category'
          value={formik.values.category}
          onChange={formik.handleChange}
          options={categories.map((category: string) => ({
            value: category,
            label: CATEGORY_LABEL[category]
          }))}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label='Foto do produto (URL)'
          id='thumbnail'
          name='thumbnail'
          fullWidth
          value={formik.values.thumbnail}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button 
          fullWidth 
          variant='contained'
          onClick={() => formik.handleSubmit()}
        >
          { isEdit ? 'Editar produto' : 'Criar produto' }
        </Button>
      </Grid>
    </Grid>
  )
}

export default ProductForm