import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartSliceInterface, getUserCartProductsThunk } from '../../features/cart/cartSlice'
import { AppThunkDispatch, RootState } from '../../features/store'
import { NumberContainer } from './styles.css'
import loadingGIF from '../../assets/loading.gif'
const CartCount = () => {
    const cart = useSelector<RootState, cartSliceInterface>(state => state.cartSlice as cartSliceInterface)
    const dispatch = useDispatch<AppThunkDispatch>()

    useEffect(() => {
        dispatch(getUserCartProductsThunk())
    }, [])
    return <>
        <NumberContainer>
            {!cart.loading
                ? cart.errors.length > 0
                    ? 0
                    : cart.cart.length > 0
                        ? cart.cart.reduce((pv, cv) => {
                            return { count: cv.count + pv.count, productName: '', price: 0, id: '', imagePath: '' }
                        }).count
                        : 0
                : <img src={loadingGIF}/>
            }

        </NumberContainer>
    </>
}

export default CartCount
