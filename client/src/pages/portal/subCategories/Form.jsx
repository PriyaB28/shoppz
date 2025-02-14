import React, { useEffect, useRef, useState } from 'react'

import ReactDOM from 'react-dom'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { useFormik } from "formik";
import { subCategorySchema } from "../schema/"
import Select from 'react-select'

import { useMutation, useQuery } from "@tanstack/react-query";

import { BiPlus } from "react-icons/bi";
import { FaAngleDoubleRight } from "react-icons/fa";

import { addSubCategoryApi, getCategoriesApi, getSubCategoryByIdApi, updateSubCategoryApi } from "../../../api/backendApi";

const Form = () => {
    //  const { quill, quillRef } = useQuill();
    const featureRef = useRef();
    const navigate = useNavigate()
    const { id } = useParams()
    const [categoryData, setCategoryData] = useState([])
    const [editData, setEditData] = useState({
        name: "",
        images: [],
        categories: []
    })

    const { data, isPending } = useQuery({
        queryKey: ['posts'],
        queryFn: () => getCategoriesApi(1, 0)
    })
    let allCategories = data?.data?.data

    const getEditData = async (id) => {
        const response = await getSubCategoryByIdApi(id)
        const { name, images, categories: parentCategories } = response.data.data
        const categories = parentCategories?.map((category) => {
            return { value: category._id, label: category.name }
        })
        setEditData({ name, images, categories })
    }

    useEffect(() => {
        if (id) getEditData(id)

    }, [id])


    let initialValues = {
        id: id ? id : "",
        name: editData.name ? editData.name : "",
        subCategoryImages: editData.images ? editData.images : [],
        categories: editData.categories ?? []
    };

    const mutation = useMutation({
        mutationKey: "addCategory",
        mutationFn: (data) => {
            if (data.get("id")) {
                return updateSubCategoryApi(data)
            }
            return addSubCategoryApi(data)
        },
        onSuccess: (response) => {
            if (response.status == 200) {
                resetForm()
                let message = "Category added"
                if (id) {
                    message = "Category Updated"
                }
                toast.success(message)
                navigate("/admin/sub-category", {
                    replace: true
                })
            }
        },
        onError: (error) => {

            toast.error(error.response.data.message)
        }
    })

    const { values, errors, touched, resetForm, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: subCategorySchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            console.log(values);
            if (id) {
                values.subCategoryImages.map((image, index) => {
                    let filename = image.file.name;
                    if (image.file instanceof File == false) {
                        let lastIndex = image.file.name.lastIndexOf("-");
                        let fileExt = image.file.name.split('.').pop();
                        filename = image.file.name.slice(0, lastIndex) + "." + fileExt
                    }
                    const myFile = new File([image.file], filename, {
                        type: image.file.type,
                    });
                    values.subCategoryImages[index].setFile(myFile)
                })
            }
            let data = new FormData();

            for (const element in values) {

                if (element == "subCategoryImages") {
                    values[element].forEach((file) => {
                        data.append(element, file.file)
                    });
                }
                else if (element == "categories") {
                    values[element].forEach((file) => {
                        data.append(element, file.value)
                    });
                } else {
                    data.append([element], values[element])
                }
            }
            // for (const value of data.entries()) {
            //     console.log(value);
            //   }

            mutation.mutate(data)

        },
    });

    const title = id ? "Edit" : "Add"
    const MainTitle = "Sub Category"

    const newCategories = allCategories?.map((category) => {
        return { value: category._id, label: category.name }
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
            border: "1px solid gray ",
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

    const handleSelectChange = (selectedOption) => {
        setFieldValue('categories', selectedOption)
    }

    return (
        <div className="main-content app-content">
            <div className="container-fluid">

                {/* <!-- Page Header --> */}
                <div className="flex items-center justify-between page-header-breadcrumb flex-wrap gap-2">
                    <div>
                        <nav>
                            <ol className="breadcrumb mb-1 flex items-center gap-1 flex-wrap ">
                                <li className="breadcrumb-item"><a href="#">Menu</a>
                                </li>
                                <FaAngleDoubleRight />
                                <li className="breadcrumb-item active" aria-current="page">{title} {MainTitle}</li>
                            </ol>
                        </nav>
                        <h1 className="page-title font-medium text-lg mb-0">{title} {MainTitle}</h1>
                    </div>
                    <div className="btn-list">
                        <button className="ti-btn bg-white dark:bg-bodybg border border-defaultborder dark:border-defaultborder/10 btn-wave !my-0">
                            <i className="ri-filter-3-line align-middle me-1 leading-none"></i> Filter
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
                                <div className="box-body add-form">
                                    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-5">
                                        <div className="xxl:col-span-12 xl:col-span-12 lg:col-span-12 md:col-span-12 col-span-6">
                                            <div className="box shadow-none mb-0 border-0">
                                                <div className="box-body p-0">
                                                    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-3">
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label htmlFor="category-name" className="form-label">{MainTitle} Name</label>
                                                            <input type="text" name='name' className="form-control" value={values.name} id="category-name" placeholder="Name" onChange={handleChange} onBlur={handleBlur} />
                                                            <label htmlFor="category-name" className="form-label mt-1 text-xs font-normal text-textmuted dark:text-textmuted/50 mb-0">*{MainTitle} Name should not exceed 30 characters</label>
                                                            {touched.name && errors.name ?
                                                                <p className="text-red-500 text-sm">{errors.name}</p>
                                                                : null
                                                            }
                                                        </div>

                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label htmlFor="product-category-add" className="form-label">Category</label>


                                                            <Select options={newCategories}
                                                                isMulti
                                                                value={values.categories}
                                                                onChange={handleSelectChange}
                                                                name='categories'
                                                                styles={styles}
                                                            />
                                                            {touched.categories && errors.categories ?
                                                                <p className="text-red-500 text-sm">{errors.categories}</p>
                                                                : null
                                                            }
                                                        </div>


                                                        <div className="xl:col-span-12 col-span-12 product-documents-container">
                                                            <p className="font-medium mb-2 text-[14px]">{MainTitle} Images :</p>

                                                            <FilePond
                                                                // ref={ref => (this.pond = ref)}
                                                                files={values.subCategoryImages}
                                                                maxFiles={2}
                                                                allowMultiple={true}
                                                                labelFileLoadError="SomeError"
                                                                labelFileProcessingError="SomeError1"
                                                                name="subCategoryImages"
                                                                oninit={() => setFieldValue('subCategoryImages', values.subCategoryImages)}
                                                                onupdatefiles={file => {
                                                                    setFieldValue('subCategoryImages', file)
                                                                }}
                                                                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                                                onBlur={handleBlur}
                                                            />
                                                            <label className="form-label text-textmuted dark:text-textmuted/50 mt-3 font-normal text-xs">* Minimum of 6 images are need to be uploaded,
                                                                all images should be uniformly maintained, width and height to the container.
                                                            </label>
                                                            {touched.files && errors.files ?
                                                                <p className="text-red-500 text-sm">{errors.files}</p>
                                                                : null
                                                            }
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="box-footer border-t border-block-start-dashed sm:flex justify-end">
                                    <button type='submit' className="ti-btn bg-primarytint1color text-white me-2 mb-2 mb-sm-0">{title} {MainTitle}<BiPlus /></button>
                                    {/* <button className="ti-btn ti-btn-primary mb-2 mb-sm-0">Save Category<i className="bi bi-download ms-2"></i></button> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* <!--End::row-1 --> */}

            </div>
        </div>
    )
}

export default Form