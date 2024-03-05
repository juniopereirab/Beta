"use client"
import { Stack, TextField, Button } from '@mui/material'
import Image from 'next/image';
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation';
import { authRoutes, productRoutes } from '../../routes';
import { RegisterValidation } from '../../utils/validation';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { register } from '../../lib/features/auth/authService';
import { useEffect } from 'react';
import { RootState } from '../../lib/store';

export default function Register() {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isAuthenticated) {
      router.push(productRoutes.products)
    }
}, [isAuthenticated, router])

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: RegisterValidation,
    onSubmit(values) {
      dispatch(register({
        email: values.email,
        password: values.password,
        name: values.name
      }))

      router.push('/')
    }
  })

  return (
    <Stack width='100%' height='100vh' direction='row' alignItems='center' justifyContent='space-around'>
      <Image src='/register.svg' alt='register' width={600} height={600} />
      <Stack gap={1} width='100%' maxWidth={500} paddingRight='32px'>
        <TextField
          label='Nome completo'
          id='name'
          name='name'
          fullWidth
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <TextField
          label='Email'
          id='email'
          name='email'
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <TextField
          label='Senha'
          id='password'
          name='password'
          type='password'
          fullWidth
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <TextField
          label='Confirme a senha'
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          fullWidth
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
        <Stack gap='8px' marginTop='32px'>
          <Button
            size='large'
            variant='contained'
            fullWidth
            onClick={() => formik.handleSubmit()}
            disabled={!(formik.isValid && formik.dirty)}
          >
            Finalizar cadastro
          </Button>
          <Button
            size='large'
            fullWidth
            onClick={() => router.push(authRoutes.login)}
          >
            Voltar ao login
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
