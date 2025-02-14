import * as Yup from 'yup'

const validations = {
    name: Yup.string().min(2, "Must be 2 characters or more").required('Name is required'),
    categories: Yup.array().of(
        Yup.object({
            label: Yup.string().required(),
            value: Yup.string().required()
        })
    ).required("Category is required").min(1, "Pick at least one")
    // categoryImages: Yup.mixed().test('required', 'Image is required', (files) => files.length > 0)
}

let { categories, ...rest } = validations
export const categorySchema = Yup.object(rest)


export const subCategorySchema = Yup.object({
    ...validations
})
