import * as Yup from 'yup'

const validations = {
    name: Yup.string().min(2, "Must be 2 characters or more").required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, "Must be 8 characters or more")
        .matches(/[a-z]+/, "One lowercase character")
        .matches(/[A-Z]+/, "One uppercase character")
        .matches(/[@$!%*#?&]+/, "One special character")
        .matches(/\d+/, "One number").required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
}

export const registerSchema = Yup.object({
    ...validations
})

let { confirmPassword, name, ...rest } = validations
export const loginSchema = Yup.object(rest)

let { confirmPassword: cp, name: n, password, ...forgotValidation } = validations
export const forgotPasswordSchema = Yup.object(forgotValidation)

let { name:nm,email, ...resetValidation } = validations
export const resetPasswordSchema = Yup.object(resetValidation)

let { confirmPassword: cpwd, password: p, ...profileValidations } = validations
profileValidations.password = Yup.string().min(8, "Must be 8 characters or more")
.matches(/[a-z]+/, "One lowercase character")
.matches(/[A-Z]+/, "One uppercase character")
.matches(/[@$!%*#?&]+/, "One special character")
    .matches(/\d+/, "One number")
export const profileSchema = Yup.object(profileValidations)

const addressValidations = {
    addressLine: Yup.string().required('Address is required'),
    city: Yup.string().required(),
    state: Yup.string().required(),
    country: Yup.string().required(),
    pincode:Yup.string().required("Zipcode is required")
}

export const addressSchema = Yup.object(addressValidations) 