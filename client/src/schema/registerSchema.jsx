import * as Yup from 'yup'

export const registerSchema = Yup.object({
    name: Yup.string().min(2, "Must be 2 characters or more").required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, "Must be 8 characters or more")
        .matches(/[a-z]+/, "One lowercase character")
        .matches(/[A-Z]+/, "One uppercase character")
        .matches(/[@$!%*#?&]+/, "One special character")
        .matches(/\d+/, "One number").required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export const loginSchema =  Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, "Must be 8 characters or more")
        .matches(/[a-z]+/, "One lowercase character is required")
        .matches(/[A-Z]+/, "One uppercase character is required")
        .matches(/[@$!%*#?&]+/, "One special character is required")
        .matches(/\d+/, "One number digit is required").required('Password is required'),
})