"use client"
import { Stack, TextField, Button } from '@mui/material'
import Image from 'next/image'
import { useFormik } from 'formik'
import { useAppDispatch } from '../../lib/hooks'
import { login } from '../../lib/features/auth/authService'
import { useRouter } from 'next/navigation'
import { authRoutes } from '../../routes'
import { AppDispatch } from '../../lib/store'

export default function Login() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit(values) {
      dispatch(login({
        email: values.email,
        password: values.password
      }))

      router.push('/')
    },
  })
  return (
    <Stack width='100%' height='100vh' justifyContent='center' alignItems='center' gap='32px'>
      <Image src="/login.svg" alt='login' width={300} height={250} priority={true}/>
      <Stack width='100%' maxWidth='360px' gap='8px'>
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
          fullWidth
          value={formik.values.password}
          onChange={formik.handleChange}
          type="password"
        />
        <Stack gap='8px' marginTop='32px'>
          <Button
            size='large'
            variant='contained'
            fullWidth
            onClick={() => formik.handleSubmit()}
          >
            Login
          </Button>
          <Button
            size='large'
            fullWidth
            onClick={() => router.push(authRoutes.register)}
          >
            Cadastre-se
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
