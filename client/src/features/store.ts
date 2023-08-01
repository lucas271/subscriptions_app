import { AnyAction, configureStore, Store, ThunkDispatch } from '@reduxjs/toolkit'
import userAuthSlice from './userAuth/userSlicer'
import productSlice from './product/productSlice'
import cartSlice from './cart/cartSlice'
import subscriptionSlice from './subscriptions/subscriptionSlice'

const rootReducer = {
    userAuthSlice,
    productSlice,
    cartSlice,
    subscriptionSlice
}

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;

export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type AppStore = Omit<Store<RootState, AnyAction>, 'dispatch'> & {dispatch: AppThunkDispatch}

export default store
