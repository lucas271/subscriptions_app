import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api'

const config = {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
}

export const deleteProductThunk = createAsyncThunk('product/deleteProduct', async ({ id }: {id: string}) => {
    try {
        if (!id) return { errors: ['missing ID'] }

        const tokens = localStorage.getItem('tokens')
        if (!tokens) return { errors: ['unathorized'] }
        const { data } = await api.post('/deleteProduct', { id, limit: 10000, offset: 0 }, {
            ...config,
            headers: {
                'x-access-token': tokens
            }
        }).catch(res => res.response)
        if (Number(data.amountOfProducts) === 0) return { errors: ['no itens found'], product: [] }
        if (data.errors) return { errors: data.errors }
        if (data.products && data.amountOfProducts) return { product: data.products, amountOfProducts: Number(data.amountOfProducts) }
        else {
            return { errors: ['no items'] }
        }
    } catch (error) {
        return { errors: ['server error'] }
    }
})

export const newProductThunk = createAsyncThunk('product/newProduct', async ({ name, price, limit, offset }: {name: string, price: number, limit: number, offset: number}) => {
    try {
        if (!name || !price) return { errors: ['Info Missing'] }

        // eslint-disable-next-line no-mixed-operators
        if (!limit || !offset && offset !== 0) return { errors: ['server error'] }
        const tokens = localStorage.getItem('tokens')
        if (!tokens) return { errors: ['unathorized'] }
        const { data } = await api.post('/createProduct', { productName: name, price, limit, offset }, {
            ...config,
            headers: {
                'x-access-token': tokens
            }
        }).catch(res => res.response)
        if (Number(data.amountOfProducts) === 0) return { errors: ['no itens found'], product: [] }
        if (data.errors) return { errors: data.errors }
        if (data.products && data.amountOfProducts) return { product: data.products, amountOfProducts: Number(data.amountOfProducts) }
        else {
            return { errors: ['no items'] }
        }
    } catch (error) {
        return { errors: ['server error'] }
    }
})

export const getProductThunk = createAsyncThunk('product', async ({ productID }: {productID: string | undefined}) => {
    try {
        if (!productID) return { errors: ['no productID received'] }
        const { data } = await api.get(`/getProduct/${productID}`).catch(res => res.response)
        if (data.errors) return { errors: data.errors }
        if (data.products) return { product: data.products }
        else {
            return { errors: ['no items'] }
        }
    } catch (error) {
        return { errors: ['server error'] }
    }
})

export const getProductsThunk = createAsyncThunk('products', async ({ limit, offset }: {limit: number, offset:number}) => {
    try {
        const { data } = await api.get(`/getAllProducts/${JSON.stringify({ limit, offset })}`).catch(res => res.response)
        if (data.errors) return { errors: data.errors }
        if (data.products && data.amountOfProducts) return { products: data.products, amountOfProducts: Number(data.amountOfProducts) }
        else {
            return { errors: ['no items'] }
        }
    } catch (error) {
        return { errors: ['server error'] }
    }
})

export interface ProductInterface{
    productName: string,
    price: number,
    imagePath: string,
    id: string,
}

export interface productSliceInterface{
    products: ProductInterface[],
    amountOfProducts: number,
    loading: boolean,
    errors: string[]
}

const initialState: productSliceInterface = {
    products: [],
    amountOfProducts: 0,
    loading: false,
    errors: []
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductsThunk.pending, state => {
            state.errors = []
            state.loading = true
        })
        builder.addCase(getProductsThunk.fulfilled, (state, action) => {
            state.loading = false
            action.payload?.errors
                ? state.errors = action.payload.errors
                : state.products = [...action.payload.products]; state.amountOfProducts = action.payload.amountOfProducts || 0
        })
        builder.addCase(getProductsThunk.rejected, (state) => {
            state.loading = false
            state.errors = ['error']
        })
        builder.addCase(getProductThunk.pending, state => {
            state.errors = []
            state.loading = true
        })
        builder.addCase(getProductThunk.fulfilled, (state, action) => {
            state.loading = false
            action.payload?.errors
                ? state.errors = action.payload.errors
                : state.products = [...action.payload.product]
        })
        builder.addCase(getProductThunk.rejected, (state) => {
            state.loading = false
            state.errors = ['error']
        })
        builder.addCase(newProductThunk.pending, state => {
            state.errors = []
            state.loading = true
        })
        builder.addCase(newProductThunk.fulfilled, (state, action) => {
            state.loading = false
            action.payload?.errors
                ? state.errors = action.payload.errors
                : state.products = [...action.payload.product]
        })
        builder.addCase(newProductThunk.rejected, (state) => {
            state.loading = false
            state.errors = ['error']
        })
        builder.addCase(deleteProductThunk.pending, state => {
            state.errors = []
            state.loading = true
        })
        builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload?.errors) state.errors = action.payload.errors
            if (action.payload?.product) state.products = action.payload.product
        })
        builder.addCase(deleteProductThunk.rejected, (state) => {
            state.loading = false
            state.errors = ['error']
        })
    }
})

export default productSlice.reducer
