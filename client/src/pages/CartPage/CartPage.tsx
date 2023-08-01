import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartSliceInterface, getUserCartProductsThunk, addProductThunk, deleteSingleProductThunk } from '../../features/cart/cartSlice'
import { AppThunkDispatch, RootState } from '../../features/store'
import { CartContainer, ItemContainer } from './styles.css'
import loadingGIF from '../../assets/loading.gif'

const CartPage = () => {
    const cart = useSelector<RootState, cartSliceInterface>(state => state.cartSlice)
    const dispatch = useDispatch<AppThunkDispatch>()
    console.log(cart, 'cartpage')
    useEffect(() => {
        dispatch(getUserCartProductsThunk())
    }, [])

    const downItemCart = ({ id } : {id: string}):void => {
        dispatch(deleteSingleProductThunk({ productID: id }))
    }

    const upItemCart = ({ id }: {id: string}):void => {
        dispatch(addProductThunk({ productID: id }))
    }

    if (cart.cart.length === 0 || cart.errors.length > 0) {
        return <>
            <CartContainer>
                {cart.errors.length < 1
                    ? <h2>empty cart</h2>
                    : cart.errors.map((error, i) => {
                        return <div key={i}>
                            <h2>{error}</h2>
                        </div>
                    })
                }
            </CartContainer>
        </>
    }

    return <>
        <CartContainer>
            <div className='title'>Carrinho</div>
            <div className='table_container'>
                {
                    !cart.loading && <ItemContainer as={'header'} className='header'>
                        <div className='item_name'>Item</div>
                        <div>preço</div>
                        <div>Quant.</div>
                        <div>total</div>
                    </ItemContainer>
                }

                {
                    cart.loading
                        ? <img src={loadingGIF} alt="loading gif" />
                        : cart.cart.map((res) => {
                            return <ItemContainer key={res.id}>
                                <div className='item_name'>{res.productName}</div>
                                <div>R${res.price.toFixed(2).replace('.', ',')}</div>
                                <div className='count'>
                                    <button disabled={cart.loading} onClick={() => downItemCart(res)}>{'<'}</button>
                                    {res.count}
                                    <button disabled={cart.loading} onClick={() => upItemCart(res)}>{'>'}</button></div>
                                <div>R${(res.count * res.price).toFixed(2).replace('.', ',')}</div>
                            </ItemContainer>
                        })
                }

            </div>
            { cart.cart.length > 0 && <footer className='footer'>
                <div className='item_name'>Total:</div>
                <div>R${
                    (cart.cart.length > 1
                        ? cart.cart.reduce((pv, cv) => {
                            return { price: (pv.price * pv.count) + (cv.price * cv.count), count: 1, productName: '', id: '', imagePath: '' }
                        }).price
                        : cart.cart[0].price * cart.cart[0].count).toFixed(2).replace('.', ',')
                }</div>

                <button>Pagar</button>
            </footer>
            }
        </CartContainer>
    </>
}

export default CartPage
