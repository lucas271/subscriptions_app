import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api'

const config = {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
}

export const isUserAdminThunk = createAsyncThunk('userAuth/checkAdmin', async () => {
    try {
        const tokens = localStorage.getItem('tokens')
        if (!tokens) return
        const { data } = await api.get('/isAdmin', {
            headers: {
                'x-access-token': tokens
            }
        }).catch(res => res.response)
        if (!data.success) {
            localStorage.removeItem('admin')
            return { admin: false }
        }
        localStorage.setItem('admin', 'true')
        return { admin: true }
    } catch (error) {
        return { admin: false }
    }
})

export const renewTokensThunk = createAsyncThunk('userAuth/renewTokens', async () => {
    try {
        const tokens = localStorage.getItem('tokens')
        if (!tokens) return
        const { data } = await api.get('/refreshToken', {
            headers: {
                'x-access-token': tokens

            }
        }).catch(res => res.response)

        if (data.errors) {
            localStorage.removeItem('tokens')
            return { logged: false }
        }

        if (data.accessToken && data.refreshToken) {
            localStorage.setItem(
                'tokens',
                JSON.stringify({
                    refreshToken: data.refreshToken,
                    accessToken: data.accessToken
                }))
            return { logged: true }
        }
    } catch (error) {
        localStorage.removeItem('tokens')
        return { errors: ['server error'] }
    }
})

export const loginUserThunk = createAsyncThunk('userAuth/loginUser', async ({ cpf, password }: {cpf: string, password: string}) => {
    try {
        const { data } = await api.post('/loginUser', { cpf, password }, config).catch(res => res.response)

        if (data.errors) return { errors: data.errors }
        if (data.accessToken && data.refreshToken) {
            localStorage.setItem(
                'tokens',
                JSON.stringify({
                    refreshToken: data.refreshToken,
                    accessToken: data.accessToken
                }))
            return { logged: true }
        }
    } catch (error) {
        return { errors: ['server error'] }
    }
})

export const createUserThunk = createAsyncThunk('user/createUser', async ({ email, username, password, cpf }: {email: string, username: string, password: string, cpf: string}) => {
    try {
        const { data } = await api.post('/createUser', { email, username, password, cpf }, config).catch(res => res.response)

        if (data.errors) return { errors: data.errors }
        if (data.accessToken && data.refreshToken) {
            localStorage.setItem(
                'tokens',
                JSON.stringify({
                    refreshToken: data.refreshToken,
                    accessToken: data.accessToken
                }))
            return { logged: true }
        }
    } catch (error) {
        return { errors: ['server Error'] }
    }
})

export interface UserAuthSliceType{
    admin?: boolean
    logged: boolean
    loading: boolean
    errors: string[]
}

const initialState: UserAuthSliceType = {
    logged: false,
    loading: false,
    errors: []
}
const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUserThunk.pending, state => {
            state.errors = []
            state.loading = true
        })
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload?.logged) state.logged = action.payload.logged
            if (action.payload?.errors) state.errors = action.payload.errors
        })
        builder.addCase(loginUserThunk.rejected, (state) => {
            state.loading = false
            state.errors = ['error']
        })
        builder.addCase(isUserAdminThunk.pending, state => {
            state.errors = []
            state.loading = true
        })
        builder.addCase(isUserAdminThunk.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload?.admin) state.admin = action.payload.admin
        })
        builder.addCase(isUserAdminThunk.rejected, (state) => {
            state.loading = false
            state.errors = ['error']
        })
        builder.addCase(createUserThunk.pending, state => {
            state.errors = []
            state.loading = true
        })
        builder.addCase(createUserThunk.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload?.logged) state.logged = action.payload.logged
            if (action.payload?.errors) state.errors = action.payload.errors
        })
        builder.addCase(createUserThunk.rejected, (state) => {
            state.loading = false
            state.errors = ['error']
        })
        builder.addCase(renewTokensThunk.pending, state => {
            state.errors = []
            state.loading = true
        })
        builder.addCase(renewTokensThunk.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload?.logged) state.logged = action.payload.logged
            if (action.payload?.errors) state.errors = action.payload.errors
        })
        builder.addCase(renewTokensThunk.rejected, (state) => {
            state.loading = false
            state.errors = ['error']
        })
    }
})

export default userAuthSlice.reducer
