import * as Yup from 'yup'

const validations = {
    name: Yup.string().min(2, "Must be 2 characters or more").required('Name is required'),
    // categoryImages: Yup.mixed().test('required', 'Image is required', (files) => files.length > 0)
}

export const categorySchema = Yup.object({
    ...validations
})