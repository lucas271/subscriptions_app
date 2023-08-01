import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api'
const config = {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
}

export const deleteSingleProductThunk = createAsyncThunk('getcart', async ({ productID } : { productID:string}) => {
    try {
        // bellow line must not be set in global scope since It needs to dynamically run.
        const token = localStorage.getItem('tokens')

        if (!productID) return { errors: ['information missing'] }
        const { data } = await api.post('/deletecartItem', { productID }, {
            ...config,
            headers: {
                'x-access-token': token
            }
        }).catch(res => res.response)
        if (data.errors) return { errors: data.errors }
        if (data.cart) return { cart: data.cart }
        else {
            return { errors: ['something went wrong'] }
        }
    } catch (error) {
        return { errors: ['server error'] }
    }
})

export const addProductThunk = createAsyncThunk('getcart', async ({ productID } : { productID:string}) => {
    try {
        const token = localStorage.getItem('tokens')

        if (!productID) return { errors: ['information missing'] }
        const { data } = await api.post('/newCartItem', { productID }, {
            ...config,
            headers: {
                'x-access-token': token
            }
        }).catch(res => res.response)
        if (data.errors) return { errors: data.errors }
        if (data.cart) return { cart: data.cart }
        else {
            return { errors: ['something went wrong'] }
        }
    } catch (error) {
        return { errors: ['server error'] }
    }
})

export const getUserCartProductsThunk = createAsyncThunk('getcart', async () => {
    try {
        const token = localStorage.getItem('tokens')

        const { data } = await api.get('/getCart', {
            headers: {
                'x-access-token': token
            }
        }).catch(res => res.response)
        if (data.errors) return { errors: data.errors }
        if (data.cart && data.cart[0]?.id) return { cart: data.cart }
        else {
            return { errors: ['products not found'] }
        }
    } catch (error) {
        return { errors: ['server error'] }
    }
})

interface cartInterface{
    productName: string
    price: number,
    id: string,
    imagePath: string,
    count: number
}

export interface cartSliceInterface{
    cart: cartInterface[],
    loading: boolean,
    errors: string[]
}

const initialState: cartSliceInterface = {
    cart: [],
    loading: false,
    errors: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserCartProductsThunk.pending, state => {
            state.errors = []
            state.loading = true
        })
        builder.addCase(getUserCartProductsThunk.fulfilled, (state, action) => {
            state.loading = false
            action.payload.errors
                ? state.errors = action.payload?.errors
                : state.cart = [...action.payload?.cart]
        })
        builder.addCase(getUserCartProductsThunk.rejected, state => {
            state.loading = false
            state.errors = ['error']
        })
    }

})

export default cartSlice.reducer
