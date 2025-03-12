import React, { useEffect, useRef, useState } from 'react'
import { useQuill } from 'react-quilljs';

import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
// or const { useQuill } = require('react-quilljs');


import 'quill/dist/quill.snow.css';
import { addProductApi, getCategoriesApi, getProductByIdApi, getSubCategoriesApi, updateProductApi } from '../../../api/backendApi';
import { useFormik } from 'formik';
import { productSchema } from '../schema';
import { useMutation, useQuery } from '@tanstack/react-query';
import Select from 'react-select'
import { Rating } from 'react-simple-star-rating'
import { useNavigate, useParams } from 'react-router';
import { BiPlus } from 'react-icons/bi';
import { toast } from 'react-toastify';


const Form = () => {

    const [categories, setCategories] = useState()
    const [subState, setSubState] = useState()
    const [rating, setRating] = useState(0)
    const navigate = useNavigate()
    // const [editData, setEditData] = useState({
    //     name: "",
    //     categories: [],
    //     subCategories: [],
    //     size: []
    // })
    const { id } = useParams()

    const sizeObject = [
        { value: "XS", label: "Extra Small" },
        { value: "S", label: "Small" },
        { value: "M", label: "Medium" },
        { value: "L", label: "Large" },
        { value: "XL", label: "Extra Large" },
    ]

    const getEditData = async (id) => {
        const response = await getProductByIdApi(id)
        const data = response.data.data
        const categories = data?.categories?.map((category) => {
            return { value: category._id, label: category.name }
        })
        const subCategories = data?.subCategories?.map((category) => {
            return { value: category._id, label: category.name }
        })

        const size = sizeObject.filter(item => {
            return data?.size.includes(item.value)
        })
    
        setValues({
            ...values, ...data, productImages:data.images,categories,subCategories,size, id: id ,
        })
        // setEditData({ ...data, categories, subCategories, size })
    }

    useEffect(() => {
        if (id) getEditData(id)
    }, [id])

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'], // Text Formatting
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['link', 'image', 'video'],
            ['clean'],
            ['code-block'], // Enable code-block button in the toolbar
        ],
    };

    // const { quill, quillRef, Quill } = useQuill({ theme: "snow", modules });
    const { quill, quillRef, Quill } = useQuill();
    // if (Quill) {
    //     Quill.register('formats/code-block', true); // Register code-block format
    //     // Quill.register('modules/syntax', true);
    // }

    React.useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                setFieldValue("features", quill.root.innerHTML.toString())
            });
            if (id) {
                quill.clipboard.dangerouslyPasteHTML(values.features);
            }
        }
    }, [quill]);

    const featureRef = useRef();
    useEffect(() => {
        if (featureRef?.current?.firstChild) {

            const children = Array.from(
                featureRef.current?.childNodes
            )
            const duplicateTooltips = children.filter((el) => {
                return el.classList.contains('ql-toolbar');
            });
            if (duplicateTooltips.length > 1) {
                duplicateTooltips[0].remove();
            }
        }
    }, [featureRef.current, quill]);

    const mutation = useMutation({
        mutationKey: "addCategory",
        mutationFn: (data) => {
            if (data.get("id")) {
                return updateProductApi(data)
            }
            return addProductApi(data)
        },
        onSuccess: (response) => {
            console.log(response);

            if (response.status == 200) {
                resetForm()
                let message = "Product added"
                if (id) {
                    message = "Product Updated"
                }
                toast.success(message)
                navigate("/admin/product", {
                    replace: true
                })
            }
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    let initialValues = {
        // id: "",
        name: "",
        description: "",
        features: "",
        productImages: [],
        price: 0,
        discount: 0,
        afterDiscountPrice: 0,
        categories: [],
        subCategories: [],
        stockCount: 0,
        rating: 0,
        publish: false,
        size: [],
    };

    const { setValues, values, errors, touched, resetForm, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: productSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {

            if (id) {
                values.productImages.map((image, index) => {
                    let filename = image.file.name;
                    if (image.file instanceof File == false) {
                        let lastIndex = image.file.name.lastIndexOf("-");
                        let fileExt = image.file.name.split('.').pop();
                        filename = image.file.name.slice(0, lastIndex) + "." + fileExt
                    }
                    const myFile = new File([image.file], filename, {
                        type: image.file.type,
                    });
                    values.productImages[index].setFile(myFile)
                })
            }
            let data = new FormData();

            let elemArray = ["categories", "subCategories", "size"]
            for (const element in values) {
                if (element == "productImages") {
                    values[element].forEach((file) => {
                        data.append(element, file.file)
                    });
                }
                else if (elemArray.includes(element)) {
                    values[element].forEach((file) => {
                        data.append(element, file.value)
                    });
                }
                else {
                    data.append([element], values[element])
                }
            }
            // for (const value of data.entries()) {
            //     console.log(value);
            // }
            mutation.mutate(data)
        }
    })

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontWeight: state.isSelected ? "bold" : "normal",
            color: "black",
            backgroundColor: state.data.color,
            fontSize: state.selectProps.myFontSize
        }),
        control: (provided, state) => ({
            ...provided,
            color: "black",
            border: "1px solid #323232",
            backgroundColor: "inherit",
            // none of react-select's styles are passed to <Control />
            width: "auto",
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: state.data.color,
            fontSize: state.selectProps.myFontSize
        })
    };

    const { data, isPending } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategoriesApi(1, 0)
    })
    let allCategories = data?.data?.data;

    const newCategories = allCategories?.map((category) => {
        return { value: category._id, label: category.name }
    })

    const { data: subCategories } = useQuery({
        queryKey: ['sub-categories'],
        queryFn: () => getSubCategoriesApi(1, 0)
    })
    let allSubCategories = subCategories?.data?.data


    let selectedCategoryArray = []
    values.categories.forEach((item) => {
        selectedCategoryArray.push(item.value)
    });

    function containsAny(arrOfObjects, arrValues, keyToCheck) {
        return arrOfObjects.some(obj => arrValues.includes(obj[keyToCheck]));
    }

    let selectedSubCategoryArray = []
    if (values?.subCategories) {
        values?.subCategories.map((item) => {
            selectedSubCategoryArray.push(item.value)
        });
    }

    let newSubCategories = [];
    let newSelectedSubCategories = []
    useEffect(() => {

        setSubState()
        if (selectedCategoryArray.length >= 0 && allSubCategories) {

            newSubCategories = allSubCategories?.filter(obj => containsAny(obj.categories, selectedCategoryArray, "_id")
            )
            newSubCategories = newSubCategories?.map((category) => {
                return { value: category._id, label: category.name }
            })

            newSelectedSubCategories = newSubCategories.filter(item => {
                return selectedSubCategoryArray.includes(item["value"])
            })

            values.subCategories = newSelectedSubCategories
            setSubState(newSubCategories)
        }
    }, [values.categories])

    const handleSelectChange = (selectedOption) => {
        setFieldValue('categories', selectedOption)
    }

    const handleSubCategoryChange = (selectedOption) => {
        setFieldValue('subCategories', selectedOption)
    }

    const handleSizeChange = (selectedOption) => {
        setFieldValue('size', selectedOption)
    }

    const handleRating1 = (rate) => {
        values.rating = rate
        setFieldValue("rating", rate)
    };

    const calculateDiscountedPrice = (price, discount) => {
        return price - (price * discount) / 100;
    };

    useEffect(() => {
        setFieldValue("afterDiscountPrice", calculateDiscountedPrice(values.price, values.discount));
    }, [values.discount, values.price]);

    let title = id ? "Edit" : "Add"
    return (
        <div className="main-content app-content">
            <div className="container-fluid">
                {/* <!-- Page Header --> */}
                <div className="flex items-center justify-between page-header-breadcrumb flex-wrap gap-2">
                    <div>
                        <nav>
                            <ol className="breadcrumb mb-1">
                                <li className="breadcrumb-item">
                                    <a href="#">Apps</a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="#">Ecommerce</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    {title} Product
                                </li>
                            </ol>
                        </nav>
                        <h1 className="page-title font-medium text-lg mb-0">
                            {title} Product
                        </h1>
                    </div>
                    <div className="btn-list">
                        <button className="ti-btn bg-white dark:bg-bodybg border border-defaultborder dark:border-defaultborder/10 btn-wave !my-0">
                            <i className="ri-filter-3-line align-middle me-1 leading-none"></i>{" "}
                            Filter
                        </button>
                        <button className="ti-btn ti-btn-primary !border-0 btn-wave me-0">
                            <i className="ri-share-forward-line me-1"></i> Share
                        </button>
                    </div>
                </div>
                {/* <!-- Page Header Close --> */}

                {/* <!-- Start::row-1 --> */}
                <div className="grid grid-cols-12 gap-x-6">
                    <div className="xl:col-span-12 col-span-12">
                        <form onSubmit={handleSubmit}>
                            <div className="box">
                                <div className="box-body add-products">
                                    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-5">
                                        <div className="xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6 col-span-12">
                                            <div className="box shadow-none mb-0 border-0">
                                                <div className="box-body p-0">
                                                    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-3">
                                                        <div className="xl:col-span-12 col-span-12">
                                                            <label
                                                                htmlFor="product-name-add"
                                                                className="form-label"
                                                            >
                                                                Product Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name='name'
                                                                value={values.name}
                                                                onChange={handleChange}
                                                                className="form-control"
                                                                id="product-name-add"
                                                                placeholder="Name"
                                                            />
                                                            <label
                                                                htmlFor="product-name-add"
                                                                className="form-label mt-1 text-xs font-normal text-textmuted dark:text-textmuted/50 mb-0"
                                                            >
                                                                *Product Name should not exceed 30 characters
                                                            </label>
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label
                                                                htmlFor="product-size-add"
                                                                className="form-label"
                                                            >
                                                                Size
                                                            </label>
                                                            <Select
                                                                options={sizeObject}
                                                                value={values?.size}
                                                                onChange={handleSizeChange}
                                                                name="size"
                                                                isMulti
                                                                styles={styles}
                                                            />
                                                            {/* <select
                                                                name="size"
                                                                values={values.size}
                                                                onChange={handleChange}
                                                                className="form-control"
                                                                data-trigger
                                                                id="product-size-add"
                                                                multiple
                                                            >
                                                                <option value="" disabled>Select</option>
                                                                
                                                                {Object.entries(sizeObject).map(([key, value], i) => {
                                                                    selected = values.size.includes(key) ? "selected" : ""
                                                                    console.log(selected);
                                                                    
                                                                    return (<option key={i}  value={key} >{value}</option>)
                                                                }
                                                                )
                                                                }
                                                                {/* <option value="XS">Extra Small</option>
                                                                <option value="S">Small</option>
                                                                <option value="M">Medium</option>
                                                                <option value="L">Large</option>
                                                                <option value="xl">Extra Large</option> 
                                                            </select> */}
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label
                                                                htmlFor="product-brand-add"
                                                                className="form-label"
                                                            >
                                                                Brand
                                                            </label>
                                                            <select
                                                                className="form-control"
                                                                data-trigger
                                                                name="product-brand-add"
                                                                id="product-brand-add"
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Armani">Armani</option>
                                                                <option value="Lacoste">Lacoste</option>
                                                                <option value="Puma">Puma</option>
                                                                <option value="Spykar">Spykar</option>
                                                                <option value="Mufti">Mufti</option>
                                                                <option value="Home Town">Home Town</option>
                                                                <option value="Arrabi">Arrabi</option>
                                                            </select>
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label
                                                                htmlFor="product-category-add"
                                                                className="form-label"
                                                            >
                                                                Category
                                                            </label>
                                                            {/* <select className="form-control" data-trigger name="product-category-add" id="product-category-add">
                                                            <option value="">Category</option>
                                                            {categories?.map((item) =>
                                                                console.log(Object.values(item))

                                                                // <option key={item._id} value={item._id}>{item.name}</option>
                                                            )}

                                                        </select> */}
                                                            <Select
                                                                options={newCategories}
                                                                isMulti
                                                                value={values.categories}
                                                                onChange={handleSelectChange}
                                                                name="categories"
                                                                styles={styles}
                                                            />
                                                            {touched.categories && errors.categories ? (
                                                                <p className="text-red-500 text-sm">
                                                                    {errors.categories}
                                                                </p>
                                                            ) : null}
                                                            {/* <select className="form-control" data-trigger name="product-category-add" id="product-category-add">
                                                            <option value="">Category</option>
                                                            <option value="Clothing">Clothing</option>
                                                            <option value="Footwear">Footwear</option>
                                                            <option value="Accesories">Accesories</option>
                                                            <option value="Grooming">Grooming</option>
                                                            <option value="Ethnic & Festive">Ethnic & Festive</option>
                                                            <option value="Jewellery">Jewellery</option>
                                                            <option value="Toys & Babycare">Toys & Babycare</option>
                                                            <option value="Festive Gifts">Festive Gifts</option>
                                                            <option value="Kitchen">Kitchen</option>
                                                            <option value="Dining">Dining</option>
                                                            <option value="Home Decors">Home Decors</option>
                                                            <option value="Stationery">Stationery</option>
                                                        </select> */}
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label
                                                                htmlFor="product-category-add"
                                                                className="form-label"
                                                            >
                                                                SubCategory
                                                            </label>
                                                            {/* <select className="form-control" data-trigger name="product-category-add" id="product-category-add">
                                                            <option value="">Category</option>
                                                            {categories?.map((item) =>
                                                                console.log(Object.values(item))

                                                                // <option key={item._id} value={item._id}>{item.name}</option>
                                                            )}

                                                        </select> */}
                                                            <Select
                                                                options={subState}
                                                                isMulti
                                                                value={values.subCategories}
                                                                onChange={handleSubCategoryChange}
                                                                name="subCategories"
                                                                styles={styles}
                                                            />
                                                            {touched.categories && errors.categories ? (
                                                                <p className="text-red-500 text-sm">
                                                                    {errors.categories}
                                                                </p>
                                                            ) : null}
                                                            {/* <select className="form-control" data-trigger name="product-category-add" id="product-category-add">
                                                            <option value="">Category</option>
                                                            <option value="Clothing">Clothing</option>
                                                            <option value="Footwear">Footwear</option>
                                                            <option value="Accesories">Accesories</option>
                                                            <option value="Grooming">Grooming</option>
                                                            <option value="Ethnic & Festive">Ethnic & Festive</option>
                                                            <option value="Jewellery">Jewellery</option>
                                                            <option value="Toys & Babycare">Toys & Babycare</option>
                                                            <option value="Festive Gifts">Festive Gifts</option>
                                                            <option value="Kitchen">Kitchen</option>
                                                            <option value="Dining">Dining</option>
                                                            <option value="Home Decors">Home Decors</option>
                                                            <option value="Stationery">Stationery</option>
                                                        </select> */}
                                                        </div>
                                                        {/* <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="product-gender-add" className="form-label">Gender</label>
                                                        <select className="form-control" data-trigger name="product-gender-add" id="product-gender-add">
                                                            <option value="">Select</option>
                                                            <option value="All">All</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Others">Others</option>
                                                        </select>
                                                    </div> */}
                                                        {/* <div className="xl:col-span-6 col-span-12 color-selection">
                                                        <label htmlFor="product-color-add" className="form-label">Colors</label>
                                                        <select className="form-control" name="product-color-add" id="product-color-add" multiple>
                                                            <option value="White">White</option>
                                                            <option value="Black">Black</option>
                                                            <option value="Red">Red</option>
                                                            <option value="Orange">Orange</option>
                                                            <option value="Yellow">Yellow</option>
                                                            <option value="Green">Green</option>
                                                            <option value="Blue">Blue</option>
                                                            <option value="Pink">Pink</option>
                                                            <option value="Purple">Purple</option>
                                                        </select>
                                                    </div> */}
                                                        {/* <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="product-cost-add" className="form-label">Enter Cost</label>
                                                        <input type="text" className="form-control" id="product-cost-add" placeholder="Cost" />
                                                        <label htmlFor="product-cost-add" className="form-label mt-1 text-xs font-normal text-textmuted dark:text-textmuted/50 mb-0">*Mention final price of the product</label>
                                                    </div> */}
                                                        <div className="xl:col-span-12 col-span-12">
                                                            <label
                                                                htmlFor="product-description-add"
                                                                className="form-label"
                                                            >
                                                                Product Description
                                                            </label>
                                                            <textarea
                                                                name='description'
                                                                value={values.description}
                                                                onChange={handleChange}
                                                                className="form-control"
                                                                id="product-description-add"
                                                                rows="3"
                                                            ></textarea>
                                                            <label
                                                                htmlFor="product-description-add"
                                                                className="form-label mt-1 text-xs font-normal text-textmuted dark:text-textmuted/50 mb-0"
                                                            >
                                                                *Description should not exceed 500 letters
                                                            </label>
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label
                                                                htmlFor="product-type"
                                                                className="form-label"
                                                            >
                                                                Product Type
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="product-type"
                                                                placeholder="Type"
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label
                                                                htmlFor="product-discount"
                                                                className="form-label"
                                                            >
                                                                Item Weight
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="product-discount1"
                                                                placeholder="Weight in gms"
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-12 col-span-12 product-documents-container">
                                                            <p className="font-medium mb-2 text-[14px]">
                                                                Product Images :
                                                            </p>
                                                            {/* <input type="file" className="product-Images" name="filepond" multiple data-allow-reorder="true" data-max-file-size="3MB" data-max-files="6" /> */}
                                                            <FilePond
                                                                files={values.productImages}
                                                                maxFiles={2}
                                                                allowMultiple={true}
                                                                labelFileLoadError="SomeError"
                                                                labelFileProcessingError="SomeError1"
                                                                name="productImages"
                                                                oninit={() => setFieldValue('productImages', values.productImages)}
                                                                onupdatefiles={file => {
                                                                    setFieldValue('productImages', file)
                                                                }}
                                                                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                                                onBlur={handleBlur}

                                                            />
                                                            <label className="form-label text-textmuted dark:text-textmuted/50 mt-3 font-normal text-xs">
                                                                * Minimum of 6 images are need to be uploaded,
                                                                all images should be uniformly maintained, width
                                                                and height to the container.
                                                            </label>
                                                        </div>
                                                        {/* <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="product-status-add1" className="form-label">Availability</label>
                                                        <select className="form-control" data-trigger name="product-status-add1" id="product-status-add1">
                                                            <option value="">Select</option>
                                                            <option value="In Stock">In Stock</option>
                                                            <option value="Out Of Stock">Out Of Stock</option>
                                                        </select>
                                                    </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6 col-span-12">
                                            <div className="box shadow-none mb-0 border-0">
                                                <div className="box-body p-0">
                                                    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-3">
                                                        <div className="xl:col-span-12 col-span-12">
                                                            <label className="form-label">
                                                                Product Features
                                                            </label>
                                                            <div
                                                                id="product-features"
                                                                style={{ height: 200 }}
                                                                ref={featureRef}
                                                            >
                                                                <div ref={quillRef}
                                                                    name="features"
                                                                    value={values.features}
                                                                    onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="xl:col-span-12 col-span-12 product-documents-container">
                                                            <p className="font-medium mb-2 text-[14px]">
                                                                Warrenty Documents :
                                                            </p>
                                                            <input
                                                                type="file"
                                                                className="product-documents"
                                                                name="filepond"
                                                                multiple
                                                                data-allow-reorder="true"
                                                                data-max-file-size="3MB"
                                                                data-max-files="6"
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-4 col-span-12">
                                                            <label
                                                                htmlFor="product-actual-price"
                                                                className="form-label"
                                                            >
                                                                Stock Count
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="stockCount"
                                                                value={values.stockCount}
                                                                min="0"
                                                                step={1}
                                                                onChange={handleChange}
                                                                className="form-control"
                                                                id="product-actual-price"
                                                                placeholder="Actual Price"
                                                            />
                                                        </div>

                                                        <div className="xl:col-span-4 col-span-12">
                                                            <label
                                                                htmlFor="product-actual-price"
                                                                className="form-label"
                                                            >
                                                                Actual Price
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="price"
                                                                value={values.price}
                                                                min="0"
                                                                step={1}
                                                                onChange={handleChange}
                                                                className="form-control"
                                                                id="product-actual-price"
                                                                placeholder="Actual Price"
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-4 col-span-12">
                                                            <label
                                                                htmlFor="product-discount"
                                                                className="form-label"
                                                            >
                                                                Discount
                                                            </label>
                                                            <input
                                                                type="number"
                                                                step={5}
                                                                name="discount"
                                                                value={values.discount}
                                                                onChange={handleChange}
                                                                min={0}
                                                                max={100}
                                                                className="form-control"
                                                                id="product-discount"
                                                                placeholder="Discount in %"
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-4 col-span-12">
                                                            <label
                                                                htmlFor="product-dealer-price"
                                                                className="form-label"
                                                            >
                                                                Price after discount
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="afterDiscountPrice"
                                                                value={values.afterDiscountPrice}
                                                                // onChange={handleDiscountedPrice}
                                                                className="form-control"
                                                                id="product-dealer-price"
                                                                placeholder="Dealer Price"
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-4 col-span-12">
                                                            <label
                                                                htmlFor="product-dealer-price"
                                                                className="form-label"
                                                            >
                                                                Dealer Price
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="product-dealer-price"
                                                                placeholder="Dealer Price"
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label
                                                                htmlFor="publish-date"
                                                                className="form-label"
                                                            >
                                                                Publish Date
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="publish-date"
                                                                placeholder="Choose date"
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label
                                                                htmlFor="publish-time"
                                                                className="form-label"
                                                            >
                                                                Publish Time
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="publish-time"
                                                                placeholder="Choose time"
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label
                                                                htmlFor="rating"
                                                                className="form-label"
                                                            >
                                                                Rating
                                                            </label>
                                                            <div className="form-control">
                                                                <Rating
                                                                    name="rating"
                                                                    onClick={handleRating1}
                                                                    size={25}
                                                                    SVGclassName="inline"
                                                                    transition
                                                                    allowFraction
                                                                    // showTooltip
                                                                    initialValue={values.rating}
                                                                // tooltipArray={tooltipArray}
                                                                // fillColorArray={fillColorArray}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="xl:col-span-12 col-span-12">
                                                            <label
                                                                htmlFor="product-status-add"
                                                                className="form-label"
                                                            >
                                                                Published Status
                                                            </label>
                                                            <select
                                                                value={values.publish}
                                                                onChange={handleChange}
                                                                className="form-control"
                                                                data-trigger
                                                                name="publish"
                                                                id="publish"
                                                            >
                                                                <option value="">Select</option>
                                                                <option value={true}>Published</option>
                                                                <option value={false}>Unpublished</option>
                                                            </select>
                                                        </div>
                                                        {/* <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="product-tags" className="form-label">Product Tags</label>
                                                        <select className="form-control" name="product-tags" id="product-tags" multiple>
                                                            <option value="Relaxed" >Relaxed</option>
                                                            <option value="Solid">Solid</option>
                                                            <option value="Washed">Washed</option>
                                                            <option value="Plain" >Plain</option>
                                                        </select>
                                                    </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer border-t border-block-start-dashed sm:flex justify-end">
                                    <button type='submit' className="ti-btn bg-primarytint1color text-white me-2 mb-2 mb-sm-0">
                                        {title} Product<BiPlus className='ms-2' />
                                    </button>
                                    {/* <button className="ti-btn ti-btn-primary mb-2 mb-sm-0">
                                        Save Product<i className="bi bi-download ms-2"></i>
                                    </button> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* <!--End::row-1 --> */}
            </div>
        </div>
    );
}

export default Form