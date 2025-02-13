import React, { useEffect, useRef, useState } from 'react'
import { useQuill } from 'react-quilljs';

import ReactDOM from 'react-dom'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
// or const { useQuill } = require('react-quilljs');


import 'quill/dist/quill.snow.css';

const index = () => {

    const { quill, quillRef } = useQuill();
    const featureRef = useRef();

    const [files, setFiles] = useState([])

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

    return (
        <div className="main-content app-content">
            <div className="container-fluid">

                {/* <!-- Page Header --> */}
                <div className="flex items-center justify-between page-header-breadcrumb flex-wrap gap-2">
                    <div>
                        <nav>
                            <ol className="breadcrumb mb-1">
                                <li className="breadcrumb-item"><a href="#">Apps</a></li>
                                <li className="breadcrumb-item"><a href="#">Ecommerce</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Add Product</li>
                            </ol>
                        </nav>
                        <h1 className="page-title font-medium text-lg mb-0">Add Product</h1>
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
                        <div className="box">
                            <div className="box-body add-products">
                                <div className="grid grid-cols-12 sm:gap-x-6 gap-y-5">
                                    <div className="xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6 col-span-12">
                                        <div className="box shadow-none mb-0 border-0">
                                            <div className="box-body p-0">
                                                <div className="grid grid-cols-12 sm:gap-x-6 gap-y-3">
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="product-name-add" className="form-label">Product Name</label>
                                                        <input type="text" className="form-control" id="product-name-add" placeholder="Name" />
                                                        <label htmlFor="product-name-add" className="form-label mt-1 text-xs font-normal text-textmuted dark:text-textmuted/50 mb-0">*Product Name should not exceed 30 characters</label>
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="product-size-add" className="form-label">Size</label>
                                                        <select className="form-control" data-trigger name="product-size-add" id="product-size-add">
                                                            <option value="">Select</option>
                                                            <option value="Extra Small">Extra Small</option>
                                                            <option value="Small">Small</option>
                                                            <option value="Medium">Medium</option>
                                                            <option value="Large">Large</option>
                                                            <option value="Extra Large">Extra Large</option>
                                                        </select>
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="product-brand-add" className="form-label">Brand</label>
                                                        <select className="form-control" data-trigger name="product-brand-add" id="product-brand-add">
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
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="product-gender-add" className="form-label">Gender</label>
                                                        <select className="form-control" data-trigger name="product-gender-add" id="product-gender-add">
                                                            <option value="">Select</option>
                                                            <option value="All">All</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Others">Others</option>
                                                        </select>
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12 color-selection">
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
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="product-cost-add" className="form-label">Enter Cost</label>
                                                        <input type="text" className="form-control" id="product-cost-add" placeholder="Cost" />
                                                        <label htmlFor="product-cost-add" className="form-label mt-1 text-xs font-normal text-textmuted dark:text-textmuted/50 mb-0">*Mention final price of the product</label>
                                                    </div>
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="product-description-add" className="form-label">Product Description</label>
                                                        <textarea className="form-control" id="product-description-add" rows="3"></textarea>
                                                        <label htmlFor="product-description-add" className="form-label mt-1 text-xs font-normal text-textmuted dark:text-textmuted/50 mb-0">*Description should not exceed 500 letters</label>
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="product-type" className="form-label">Product Type</label>
                                                        <input type="text" className="form-control" id="product-type" placeholder="Type" />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="product-discount" className="form-label">Item Weight</label>
                                                        <input type="text" className="form-control" id="product-discount1" placeholder="Weight in gms" />
                                                    </div>
                                                    <div className="xl:col-span-12 col-span-12 product-documents-container">
                                                        <p className="font-medium mb-2 text-[14px]">Product Images :</p>
                                                        {/* <input type="file" className="product-Images" name="filepond" multiple data-allow-reorder="true" data-max-file-size="3MB" data-max-files="6" /> */}
                                                        <FilePond
                                                            files={files}
                                                            onupdatefiles={setFiles}
                                                            allowMultiple={true}
                                                            maxFiles={3}
                                                            server="/api"
                                                            name="files" /* sets the file input name, it's filepond by default */
                                                            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                                        />
                                                        <label className="form-label text-textmuted dark:text-textmuted/50 mt-3 font-normal text-xs">* Minimum of 6 images are need to be uploaded,
                                                            all images should be uniformly maintained, width and height to the container.
                                                        </label>
                                                    </div>
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="product-status-add1" className="form-label">Availability</label>
                                                        <select className="form-control" data-trigger name="product-status-add1" id="product-status-add1">
                                                            <option value="">Select</option>
                                                            <option value="In Stock">In Stock</option>
                                                            <option value="Out Of Stock">Out Of Stock</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6 col-span-12">
                                        <div className="box shadow-none mb-0 border-0">
                                            <div className="box-body p-0">
                                                <div className="grid grid-cols-12 sm:gap-x-6 gap-y-3">
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label className="form-label">Product Features</label>
                                                        <div id="product-features" style={{  height: 200 }} ref={featureRef}>
                                                            <div ref={quillRef} />
                                                        </div>
                                                    </div>
                                                    <div className="xl:col-span-12 col-span-12 product-documents-container">
                                                        <p className="font-medium mb-2 text-[14px]">Warrenty Documents :</p>
                                                        <input type="file" className="product-documents" name="filepond" multiple data-allow-reorder="true" data-max-file-size="3MB" data-max-files="6" />
                                                    </div>
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <label htmlFor="product-actual-price" className="form-label">Actual Price</label>
                                                        <input type="text" className="form-control" id="product-actual-price" placeholder="Actual Price" />
                                                    </div>
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <label htmlFor="product-dealer-price" className="form-label">Dealer Price</label>
                                                        <input type="text" className="form-control" id="product-dealer-price" placeholder="Dealer Price" />
                                                    </div>
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <label htmlFor="product-discount" className="form-label">Discount</label>
                                                        <input type="text" className="form-control" id="product-discount" placeholder="Discount in %" />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="publish-date" className="form-label">Publish Date</label>
                                                        <input type="text" className="form-control" id="publish-date" placeholder="Choose date" />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="publish-time" className="form-label">Publish Time</label>
                                                        <input type="text" className="form-control" id="publish-time" placeholder="Choose time" />
                                                    </div>
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="product-status-add" className="form-label">Published Status</label>
                                                        <select className="form-control" data-trigger name="product-status-add" id="product-status-add">
                                                            <option value="">Select</option>
                                                            <option value="Published">Published</option>
                                                            <option value="Scheduled">Scheduled</option>
                                                        </select>
                                                    </div>
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="product-tags" className="form-label">Product Tags</label>
                                                        <select className="form-control" name="product-tags" id="product-tags" multiple>
                                                            <option value="Relaxed" >Relaxed</option>
                                                            <option value="Solid">Solid</option>
                                                            <option value="Washed">Washed</option>
                                                            <option value="Plain" >Plain</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-footer border-t border-block-start-dashed sm:flex justify-end">
                                <button className="ti-btn bg-primarytint1color text-white me-2 mb-2 mb-sm-0">Add Product<i className="bi bi-plus-lg ms-2"></i></button>
                                <button className="ti-btn ti-btn-primary mb-2 mb-sm-0">Save Product<i className="bi bi-download ms-2"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--End::row-1 --> */}

            </div>
        </div>
    )
}

export default index