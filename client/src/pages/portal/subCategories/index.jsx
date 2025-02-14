import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

import { FaPlus } from "react-icons/fa6";
import { FaAngleDoubleRight } from 'react-icons/fa';
import { RiEdit2Line } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';


import { deleteSubCategoryByIdApi, getSubCategoriesApi } from '../../../api/backendApi';
import Loader from "../../../components/Loader"
import ConfirmationAlert from "../../../components/portal/ConfirmationAlert"
import { toast } from 'react-toastify';
import ImageView from '../../../components/portal/ImageView';

const index = () => {

    let [page, setPage] = useState(1)
    let [isOpenConfirmAlert, setIsOpenConfirmAlert] = useState(false)
    let [imageUrl, setImageUrl] = useState()
    let [deleteCategoryId, setDeleteCategoryId] = useState({
        id: ""
    })

    const { data, isPending, refetch } = useQuery({
        queryKey: ['posts', page],
        queryFn: () => getSubCategoriesApi(page)
    })
    let subCategories = data?.data?.data
    let pagination = data?.data

    // if (isPending) return (<Loader />)
    //   if( postQuery.isError ) return (<h1>Error loading data!!!</h1>)

    const handleDelete = async (id) => {
        try {

            const response = await deleteSubCategoryByIdApi(deleteCategoryId)
            if (response.status == 200) {
                refetch()
                setIsOpenConfirmAlert(false)
                toast.success("Category deleted")
            }
        } catch (error) {
            toast.error(error.response.data.message)
            setIsOpenConfirmAlert(false)
        }
    }
    return (
        <>

            <div className="main-content app-content">
                <div className="container-fluid">

                    {/* <!-- Page Header --> */}
                    <div className="flex items-center justify-between page-header-breadcrumb flex-wrap gap-2">
                        <div>
                            <nav>
                                <ol className="breadcrumb mb-1 flex items-center gap-1 flex-wrap ">
                                    <li className="breadcrumb-item"><a href="#">Apps</a>
                                    </li>

                                    <FaAngleDoubleRight />
                                    <li className="breadcrumb-item active" aria-current="page">Category</li>
                                </ol>
                            </nav>
                            <h1 className="page-title font-medium text-lg mb-0">Category List</h1>
                        </div>
                        <div className="btn-list">
                            {/* <button
                            className="ti-btn bg-white dark:bg-bodybg border border-defaultborder dark:border-defaultborder/10 btn-wave !my-0">
                            <i className="ri-filter-3-line align-middle me-1 leading-none"></i> Filter
                        </button> */}
                            <Link to={"/admin/add-sub-category"} className="ti-btn ti-btn-primary !border-0 btn-wave me-0">
                                <FaPlus className=" me-1" />
                                Add Sub Category
                            </Link>
                        </div>
                    </div>
                    {/* <!-- Page Header Close --> */}

                    {/* <!-- Start::row-1 --> */}
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        Category List
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="table-responsive overflow-auto table-bordered-default">
                                        <table className="ti-custom-table text-nowrap">
                                            <thead>
                                                <tr className="border-b !border-defaultborder dark:!border-defaultborder/10">
                                                    <th scope="col" className="!text-start">
                                                        <input className="form-check-input check-all" type="checkbox"
                                                            id="all-products" value="" aria-label="..." />
                                                    </th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">Parent Category</th>

                                                    <th scope="col">Status</th>

                                                    <th scope="col">Published</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subCategories && subCategories?.map((item, index) =>
                                                    <tr key={index}
                                                        className="product-list border-b !border-defaultborder dark:!border-defaultborder/10">
                                                        <td className="product-checkbox"><input className="form-check-input"
                                                            type="checkbox" id="product1" value="" aria-label="..." /></td>
                                                        <td>
                                                            <div className="flex">
                                                                <span className="avatar avatar-md avatar-square bg-light"><img
                                                                    src={item.images[0]}
                                                                    className="w-full h-full" alt={item.name}
                                                                    onClick={() => { setImageUrl(item.images[0]) }} /></span>
                                                                <div className="ms-2">
                                                                    <p className="font-semibold mb-0 flex items-center"><a
                                                                        href="#"> "{item.name}"</a></p>
                                                                    <p
                                                                        className="text-xs text-textmuted dark:text-textmuted/50 mb-0">
                                                                        SoundWave</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="flex">

                                                                <div className="ms-2">
                                                                    <p className="font-semibold mb-0 flex items-center"><a
                                                                        href="#"> {item.categories.map(u => u.name).join(', ')}</a></p>
                                                                    <p
                                                                        className="text-xs text-textmuted dark:text-textmuted/50 mb-0">
                                                                        SoundWave</p>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td><span className="badge bg-primary/10 text-primary">Published</span></td>

                                                        <td>{moment(item.createdAt).format("D,MMM YYYY - h:mmA")}</td>

                                                        <td>
                                                            <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
                                                                <Link aria-label="anchor" to={`/admin/edit-sub-category/${item._id}`}
                                                                    className="ti-btn btn-wave !py-2  ti-btn-sm ti-btn-soft-primary waves-effect waves-light"><RiEdit2Line />
                                                                </Link>
                                                                <button type='button' onClick={() => {
                                                                    setIsOpenConfirmAlert(true)
                                                                    setDeleteCategoryId(item._id)
                                                                }
                                                                } aria-label="anchor" href="#"
                                                                    className="ti-btn btn-wave product-btn ti-btn-sm !py-2 ti-btn-soft-danger waves-effect waves-light"><RiDeleteBinLine />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                                {/* <tr
                                                className="product-list border-b !border-defaultborder dark:!border-defaultborder/10">
                                                <td className="product-checkbox"><input className="form-check-input"
                                                    type="checkbox" id="product2" value="" aria-label="..." /></td>
                                                <td>
                                                    <div className="flex">
                                                        <span className="avatar avatar-md avatar-square bg-light"><img
                                                            src="../assets/images/ecommerce/png/14.png"
                                                            className="w-full h-full" alt="..." /></span>
                                                        <div className="ms-2">
                                                            <p className="font-semibold mb-0 flex items-center"><a
                                                                href="#"> Elegant
                                                                Flower Pot</a></p>
                                                            <p
                                                                className="text-xs text-textmuted dark:text-textmuted/50 mb-0">
                                                                Serene Garden</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span>Ceramic</span>
                                                </td>
                                                <td>$799</td>
                                                <td>98</td>
                                                <td>
                                                    <span className="badge bg-danger/10 text-danger">Unpublished</span>
                                                </td>
                                                <td>
                                                    <div className="flex items-center font-semibold">
                                                        <span className="avatar avatar-sm p-1 bg-light me-2 avatar-rounded">
                                                            <img src="../assets/images/faces/15.jpg" alt="" />
                                                        </span>
                                                        <a href="#">Andrew Garfield </a>
                                                    </div>
                                                </td>
                                                <td>18,Nov 2023 - 06:53AM</td>
                                                <td>
                                                    <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
                                                        <a aria-label="anchor" href="edit-products.html"
                                                            className="ti-btn btn-wave  ti-btn-sm ti-btn-soft-primary waves-effect waves-light"><i
                                                                className="ri-edit-line"></i></a>
                                                        <a aria-label="anchor" href="#"
                                                            className="ti-btn btn-wave product-btn ti-btn-sm ti-btn-soft-danger waves-effect waves-light"><i
                                                                className="ri-delete-bin-line"></i></a>
                                                    </div>
                                                </td>
                                            </tr> */}
                                                {!subCategories?.length &&
                                                    <tr
                                                        className="product-list border-b !border-defaultborder dark:!border-defaultborder/10">

                                                        <td colSpan={5}>
                                                            <div className="flex justify-center">

                                                                <div className="ms-2">
                                                                    <p className="font-semibold mb-0 flex items-center"><a
                                                                        href="#"> No Records</a></p>

                                                                </div>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <div className="flex items-center flex-wrap overflow-auto">
                                        {/* <div className="mt-2">
                                            Showing <b>{showing}</b> to <b>{pagination?.limit}</b> of <b>{pagination?.total}</b> entries <i
                                                className="bi bi-arrow-right ms-2 font-semibold"></i>
                                        </div> */}
                                        <div className="ms-auto my-2">
                                            <nav aria-label="" className="">
                                                <ul className="ti-pagination mb-0 !p-0 justify-end float-end">
                                                    <li className="page-item disabled"> <button type='button' onClick={() => setPage((prev) => prev - 1)} disabled={page == 1 ? true : false}
                                                        className="page-link px-3 py-[0.375rem] !text-[1rem] bg-white dark:bg-bodybg !border-e-0 !rounded-tr-none !rounded-br-none">Previous</button>
                                                    </li>
                                                    {new Array(pagination?.pages).fill("_").map((_, no) =>
                                                    (
                                                        <li key={no} className="page-item " aria-current="page"> <button type='button' onClick={() => setPage(no + 1)}
                                                            className={`${page == (no + 1) ? "active" : ""}  page-link  px-3 py-[0.375rem] !text-[1rem] bg-white dark:bg-bodybg !rounded-none !border-e-0`}
                                                            href="#">{no + 1}</button> </li>
                                                    ))}
                                                    {/* <li className="page-item"><a
                                                        className="page-link px-3 py-[0.375rem] !text-[1rem] bg-white dark:bg-bodybg !rounded-none !border-e-0"
                                                        href="#">1</a></li> */}

                                                    {/* <li className="page-item"><a
                                                        className="page-link px-3 py-[0.375rem] !text-[1rem] bg-white dark:bg-bodybg !rounded-none !border-e-0"
                                                        href="#">3</a></li>
                                                    <li className="page-item"><a
                                                        className="page-link px-3 py-[0.375rem] !text-[1rem] bg-white dark:bg-bodybg !rounded-none !border-e-0"
                                                        href="#">4</a></li>
                                                    <li className="page-item"><a
                                                        className="page-link px-3 py-[0.375rem] !text-[1rem] bg-white dark:bg-bodybg !rounded-none !border-e-0"
                                                        href="#">5</a></li> */}
                                                    <li className="page-item"> <button type='button'
                                                        disabled={page == pagination?.pages ? true : false}
                                                        onClick={() => setPage((prev) => prev + 1)}
                                                        className="page-link px-3 py-[0.375rem] !text-[1rem] bg-white dark:bg-bodybg !rounded-tl-none !rounded-bl-none !border-s-0"
                                                        href="#">Next</button> </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!--End::row-1 --> */}

                </div>
            </div>
            {isPending && (<div className='w-full h-full fixed top-0 left-0 bg-white opacity-75 z-[999]'> <div className="flex justify-center mb-6 mt-[50vh] ">
                <div className="ti-spinner text-secondary w-16 h-16" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div></div>)}

            {isOpenConfirmAlert && <ConfirmationAlert confirm={handleDelete} close={setIsOpenConfirmAlert} />}

            {imageUrl && <ImageView url={imageUrl} close={setImageUrl} />}
        </>
    )
}

export default index