import * as yup from 'yup'

export const RegisterValidation = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().required('Email é obrigatório'),
    password: yup.string().required('Senha é obrigatória').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{8,99}$/,
        'Must contain at least 8 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number'
    ),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Senhas devem ser iguais')
})

export const LoginValidation = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
})