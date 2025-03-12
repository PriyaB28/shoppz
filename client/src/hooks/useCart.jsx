import { useSelector,useDispatch } from 'react-redux';
import React from 'react'

const useCart = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    return { cart, dispatch }
}

export default useCart