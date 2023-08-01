import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProductThunk, cartSliceInterface } from '../../features/cart/cartSlice'
import { productSliceInterface } from '../../features/product/productSlice'
import { AppThunkDispatch, RootState } from '../../features/store'
import { UserAuthSliceType } from '../../features/userAuth/userSlicer'
import { ItemContainer } from './Item.css'

const Items = ({ product }: {product: productSliceInterface}) => {
    const navigate = useNavigate()
    const cart = useSelector<RootState, cartSliceInterface>(state => state.cartSlice)
    const dispatch = useDispatch<AppThunkDispatch>()
    const user = useSelector<RootState, UserAuthSliceType>(state => state.userAuthSlice)

    return <>
        {
            product.products.map((res) => {
                /// try for require(imagepath) catch(require(defaultImage))
                try {
                    return <ItemContainer key={res.id}>
                        <img src={require('../../assets/netflix.png')} alt="netflix image" />
                        <div className='item_info'>
                            <h3>{res.productName}</h3>
                            <div>R${res.price.toFixed(2).replace('.', ',')}</div>
                            <div className='util_btns'>
                                <button onClick={() => navigate(`/item/${res.id}`)}>assinar</button>
                                <button disabled={cart.loading} onClick={() => dispatch(addProductThunk({ productID: res.id }))}>adicionar ao carrinho</button>
                            </div>
                        </div>
                    </ItemContainer>
                } catch (error) {
                    return <ItemContainer key={res.id}>
                        <img src={require('../../assets/netflix.png')} alt="netflix image" />
                        <div className='item_info'>
                            <h3>{res.productName}</h3>
                            <div>R${res.price.toFixed(2).replace('.', ',')}</div>
                            <div className='util_btns'>
                                <button>assinar</button>
                                {
                                    user.logged && <button>adicionar ao carrinho</button>
                                }
                            </div>
                        </div>
                    </ItemContainer>
                }
            })
        }
    </>
}

export default Items
