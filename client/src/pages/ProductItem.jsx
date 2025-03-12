import React, { useEffect, useState } from "react";
import Ratings from "../components/Ratings";
import useAuth from "../hooks/useAuth";
import { addToCart, deleteCartItem, updateCartItemQty } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import useCart from "../hooks/useCart";
import { toast } from "react-toastify";

const ProductItem = ({ data }) => {
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [cartItem, setCartItem] = useState();
    const { user } = useAuth();
    const { cart } = useCart();

    const dispatch = useDispatch();
    const userId = user.userInfo?._id;

    useEffect(() => {
        const cartItem = cart?.cart?.filter((item) => { return item?.productId?._id == data?._id });

        if (cartItem?.length !== 0) {
            setQuantity(cartItem[0]?.quantity)
            setCartItem(cartItem[0])
            setIsAdded(true);
        } else {
            setIsAdded(false)
        }
    }, [data, cart]);

    // useEffect(() => {
    //     console.log(cartItem?.quantity);

    //     if (cartItem?.quantity == 0) {
    //         console.log("hello 0");
    //     }
    // },[quantity])

    const handleAddToCart = (productId, userId, quantity = 1) => {
        if (!userId) {
            toast.error("Please login to add");
            return false;
        }
        setIsAdded(true);
        let data = {
            productId,
            userId,
            quantity,
        };
        dispatch(addToCart(data));
    };


    const handleDecreaseQty = async () => {
        if (quantity == 1) {
            let data = { id: cartItem?._id }
            dispatch(deleteCartItem(data))
            setIsAdded(false);
        }
        else {
            let data = {
                id: cartItem?._id,
                quantity: quantity - 1
            }
            dispatch(updateCartItemQty(data))
        }
    }



    const handleIncreaseQty = async () => {
        let data = {
            id: cartItem?._id,
            quantity: quantity + 1
        }
        dispatch(updateCartItemQty(data))
    }

    return (
        <div className="group ">
            <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img
                    src={data?.images ? data?.images[0] : ""}
                    className="group-hover:scale-125 duration-500 h-72 w-full  scale-110"
                    alt=""
                />

                {isAdded === false ? (
                    <div className="absolute -bottom-20 duration-500 group-hover:bottom-3 start-3 end-3 ">
                        <button
                            type="button"
                            className="py-2 px-5 inline-block font-semibold  align-middle  text-base text-center bg-orange-600 text-white w-full rounded-md"
                            onClick={() => {
                                handleAddToCart(data._id, userId, quantity);
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                ) : (
                    <div className="qty-icons absolute -bottom-20 group-hover:bottom-3   duration-500 w-full text-center">
                        <button
                            className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md  bg-orange-500  text-white minus"
                            onClick={handleDecreaseQty}
                        >
                            -
                        </button>
                        <span className="bg-slate-900 h-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md  hover:bg-orange-500 text-orange-500 hover:text-white pointer-events-none lg:w-28 w-20  quantity mx-1">
                            {quantity}
                        </span>
                        <button
                            className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md  bg-orange-500  text-white plus"
                            onClick={handleIncreaseQty}
                        >
                            +
                        </button>
                    </div>
                )}
                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                    <li>
                        <a
                            href="#"
                            className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-orange-600 hover:text-white shadow"
                        >
                            <i data-feather="heart" className="size-4"></i>
                        </a>
                    </li>
                    <li className="mt-1">
                        <a
                            href="shop-item-detail.html"
                            className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-orange-600 hover:text-white shadow"
                        >
                            <i data-feather="eye" className="size-4"></i>
                        </a>
                    </li>
                    <li className="mt-1">
                        <a
                            href="#"
                            className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-orange-600 hover:text-white shadow"
                        >
                            <i data-feather="bookmark" className="size-4"></i>
                        </a>
                    </li>
                </ul>

                <ul className="list-none absolute top-[10px] start-4">
                    <li>
                        <a
                            href="#"
                            className="bg-orange-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5"
                        >
                            -{data.discount}% Off
                        </a>
                    </li>
                </ul>
            </div>

            <div className="mt-4">
                <a
                    href="product-detail-one.html"
                    className="hover:text-orange-500 text-lg font-medium"
                >
                    {data.name}
                </a>
                <div className="flex justify-between items-center mt-1">
                    <p>
                        ${data.afterDiscountPrice}{" "}
                        <del className="text-slate-400">${data.price}</del>
                    </p>
                    <Ratings size={16} initialValue={data.rating} />
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
