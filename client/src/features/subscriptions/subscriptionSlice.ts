import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api'

export const getSubscriptionsThunk = createAsyncThunk('getSubscriptions', async () => {
    try {
        const token = localStorage.getItem('tokens')

        const { data } = await api.get('/getSubscriptions', {
            headers: {
                'x-access-token': token
            }
        }).catch(res => res.response)

        if (data.errors) return { errors: data.errors }
        if (data.subscriptions) return { subscriptions: data.subscriptions }
        else {
            return { errors: ['no subscriptions'] }
        }
    } catch (error) {
        return { errors: ['server error'] }
    }
})
export interface SubscriptionInterface{
    expireDate: Date,
    customerCPF: string,
    productID: string
}

export interface SubscriptionSliceInterface{
    subscriptions: SubscriptionInterface[],
    loading: boolean,
    errors: string[]
}

const initialState: SubscriptionSliceInterface = {
    subscriptions: [],
    loading: false,
    errors: []
}

export const subscriptionSlice = createSlice({
    name: 'subscriptions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSubscriptionsThunk.pending, state => {
            state.errors = []
            state.loading = true
        })
        builder.addCase(getSubscriptionsThunk.fulfilled, (state, action) => {
            state.errors = []
            state.loading = false
            action.payload.errors
                ? state.errors = action.payload.errors
                : state.subscriptions = [...action.payload.subscriptions]
        })
        builder.addCase(getSubscriptionsThunk.rejected, state => {
            state.loading = false
            state.errors = ['error']
        })
    }

})

export default subscriptionSlice.reducer
