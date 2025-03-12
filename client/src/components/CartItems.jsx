import React, { useState } from 'react'
import { deleteCartItem, updateCartItemQty } from '../redux/cartSlice'
import { useDispatch } from 'react-redux';

const CartItems = ({ data: cartData }) => {
    const [quantity, setQuantity] = useState(cartData?.quantity) //why quantity value not v=changing here on new data incoming
    const dispatch = useDispatch();

    const handleDecreaseQty = async () => {
        if (quantity == 1) {
            let data = { id: cartData?._id }
            dispatch(deleteCartItem(data))
        }
        else {
            let data = {
                id: cartData?._id,
                quantity: quantity - 1
            }
            setQuantity(data.quantity)
            dispatch(updateCartItemQty(data))
        }
    }

    const handleIncreaseQty = async () => {
        let data = {
            id: cartData?._id,
            quantity: quantity + 1
        }
        setQuantity(data.quantity)
        dispatch(updateCartItemQty(data))
    }


    return (
        <tr className="bg-white dark:bg-slate-900">
            <td className="p-4"><a href="#"><i className="mdi mdi-window-close text-red-600"></i></a></td>
            <td className="p-4">
                <span className="flex items-center">
                    <img src={cartData.productId.images[0]} className="rounded shadow dark:shadow-gray-800 w-12" alt="" />
                    <span className="ms-3">
                        <span className="block font-semibold">{cartData.productId.name}</span>
                    </span>
                </span>
            </td>
            <td className="p-4 text-center">${cartData.productId.afterDiscountPrice}</td>
            <td className="p-4 text-center">
                <div className="qty-icons">
                    <button onClick={handleDecreaseQty} className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white minus">-</button>
                    <span className=" h-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white pointer-events-none lg:w-28 w-20  quantity mx-1">
                        {quantity}
                    </span>
                    <button onClick={handleIncreaseQty} className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white plus">+</button>
                </div>
            </td>
            <td className="p-4  text-end">$ {cartData.totalPrice}</td>
        </tr>
    )
}

export default CartItems