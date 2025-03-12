import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { addItemCartApi, deleteCartItemApi, getCartItemsApi, updateCartItemQtyApi } from "../api/backendApi";
import { toast } from 'react-toastify';

const initialState = {
    cart: [],
    cartSubtotal: 0,
    loading: false,
};


export const addToCart = createAsyncThunk('cart/addToCart', async (data, { rejectWithValue, dispatch }) => {
    try {
        let response = await addItemCartApi(data)
        if (response.status == 200) {
            dispatch(getCartItems())
            return response?.data?.data
        }
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const getCartItems = createAsyncThunk('cart/getCartItems', async (data, { rejectWithValue }) => {
    try {
        let response = await getCartItemsApi()

        if (response.status == 200) {
            // console.log( response?.data?.data[0]?.cartItems);

            return response?.data?.data
        }
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const updateCartItemQty = createAsyncThunk('cart/updateCartItemQty', async (data, { rejectWithValue, dispatch }) => {
    try {
        let response = await updateCartItemQtyApi(data)

        if (response.status == 200) {
            dispatch(getCartItems())
            // return response?.data?.data
        }
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})


export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async (data, { rejectWithValue, dispatch }) => {
    try {
        let response = await deleteCartItemApi(data)
        if (response.status == 200) {
            dispatch(getCartItems())
            return response?.data?.data
        }
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})


const cartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.loading = true
        })
            .addCase(addToCart.fulfilled, (state, { payload }) => {
                state.loading = false
                state.cart.push(payload)
                toast.success("Item added")
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false
                toast.error(action.payload)
                // console.log(action.payload) 
            }).addCase(getCartItems.pending, (state) => {
                state.loading = true
            })
            .addCase(getCartItems.fulfilled, (state, { payload }) => {
                state.loading = false
                state.cart = payload[0]?.cartItems;
                state.cartSubtotal = payload[0]?.subtotal[0]?.subtotal
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.loading = false
                toast.error(action.payload)
                // console.log(action.payload) 
            }).addCase(updateCartItemQty.pending, (state) => {
                state.loading = true
            })
            .addCase(updateCartItemQty.fulfilled, (state, { payload }) => {
                state.loading = false
                // state.cart = payload
            })
            .addCase(updateCartItemQty.rejected, (state, action) => {
                state.loading = false
                toast.error(action.payload)
                // console.log(action.payload) 
            }).addCase(deleteCartItem.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteCartItem.fulfilled, (state, { payload }) => {
                state.loading = false
                // state.cart = payload
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.loading = false
                toast.error(action.payload)
                // console.log(action.payload) 
            })
    }
})


export default cartSlice.reducer;
export const { setCredentials, logout } = cartSlice.actions;