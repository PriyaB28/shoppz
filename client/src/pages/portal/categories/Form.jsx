import React, { useEffect, useRef, useState } from 'react'

import ReactDOM from 'react-dom'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

import { useFormik } from "formik";
import { categorySchema } from "../schema/"
import { useMutation } from "@tanstack/react-query";

import { BiPlus } from "react-icons/bi";
import { FaAngleDoubleRight } from "react-icons/fa";

import { addCategoryApi, getCategoryByIdApi, updateCategoryApi } from "../../../api/backendApi";
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'

const Form = () => {
    //  const { quill, quillRef } = useQuill();
    const featureRef = useRef();
    const { id } = useParams()
    const [editData, setEditData] = useState({
        name: "",
        images: []
    })

    const getEditData = async (id) => {
        const response = await getCategoryByIdApi(id)
        const { name, images } = response.data.data
        setEditData({ name, images })
    }
    const navigate = useNavigate()

    useEffect(() => {
        if(id) getEditData(id)
    }, [id])

    let initialValues = {
        id: id ? id : "",
        name: editData.name ? editData.name : "",
        categoryImages: editData.images ? editData.images : []
    };

    const mutation = useMutation({
        mutationKey: "addCategory",
        mutationFn: (data) => {
            if (data.get("id")) {
                return updateCategoryApi(data)
            }
            return addCategoryApi(data)
        },
        onSuccess: (response) => {
            if (response.status == 200) {
                resetForm()
                toast.success("Category added")
                navigate("/admin/category", {
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
        validationSchema: categorySchema,
        enableReinitialize: true,
        onSubmit: async (values) => {

            let data = new FormData();
            if (id) {
                values.categoryImages.map((image, index) => {
                    let filename = image.file.name;
                    if (image.file instanceof File == false) {
                        let lastIndex = image.file.name.lastIndexOf("-");
                        let fileExt = image.file.name.split('.').pop();
                        filename = image.file.name.slice(0, lastIndex) + "." + fileExt
                    }
                    const myFile = new File([image.file], filename, {
                        type: image.file.type,
                    });
                    values.categoryImages[index].setFile(myFile)
                })
            }
            values.categoryImages.forEach((file) => {
                data.append("categoryImages", file.file)
            });

            data.append("name", values.name)
            data.append("id", values.id)

            mutation.mutate(data)

        },
    });

    const title = id ? "Edit" : "Add"
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
                                <li className="breadcrumb-item active" aria-current="page">{title} Category</li>
                            </ol>
                        </nav>
                        <h1 className="page-title font-medium text-lg mb-0">{title} Category</h1>
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
                                                            <label htmlFor="category-name" className="form-label">Category Name</label>
                                                            <input type="text" name='name' className="form-control" value={values.name} id="category-name" placeholder="Name" onChange={handleChange} onBlur={handleBlur} />
                                                            <label htmlFor="category-name" className="form-label mt-1 text-xs font-normal text-textmuted dark:text-textmuted/50 mb-0">*Category Name should not exceed 30 characters</label>
                                                            {touched.name && errors.name ?
                                                                <p className="text-red-500 text-sm">{errors.name}</p>
                                                                : null
                                                            }
                                                        </div>

                                                        {/* <div className="xl:col-span-6 col-span-12">
                                                            <label htmlFor="product-category-add" className="form-label">Category</label>
                                                            <select className="form-control" data-trigger name="product-category-add" id="product-category-add">
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
                                                            </select>
                                                        </div> */}

                                                        {/* <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="product-description-add" className="form-label">Product Description</label>
                                                        <textarea className="form-control" id="product-description-add" rows="3"></textarea>
                                                        <label htmlFor="product-description-add" className="form-label mt-1 text-xs font-normal text-textmuted dark:text-textmuted/50 mb-0">*Description should not exceed 500 letters</label>
                                                    </div> */}

                                                        <div className="xl:col-span-12 col-span-12 product-documents-container">
                                                            <p className="font-medium mb-2 text-[14px]">Category Images :</p>
                                                            {/* <input type="file" className="product-Images" name="filepond" multiple data-allow-reorder="true" data-max-file-size="3MB" data-max-files="6" /> */}

                                                            <FilePond
                                                                // ref={ref => (this.pond = ref)}
                                                                files={values.categoryImages}
                                                                maxFiles={2}
                                                                allowMultiple={true}
                                                                labelFileLoadError="SomeError"
                                                                labelFileProcessingError="SomeError1"
                                                                name="categoryImages"
                                                                oninit={() => setFieldValue('categoryImages', values.categoryImages)}
                                                                onupdatefiles={file => {
                                                                    console.log(file);

                                                                    setFieldValue('categoryImages', file)
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
                                    <button type='submit' className="ti-btn bg-primarytint1color text-white me-2 mb-2 mb-sm-0">{title} Category<BiPlus /></button>
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