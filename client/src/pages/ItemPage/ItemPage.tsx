import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { addProductThunk } from '../../features/cart/cartSlice'
import { getProductThunk, productSliceInterface } from '../../features/product/productSlice'
import { AppThunkDispatch, RootState } from '../../features/store'
import { ItemRightSide, ItemContainer } from './stylecs.css'

const ItemPage = () => {
    const { id } = useParams<string>()
    const dispatch = useDispatch<AppThunkDispatch>()
    const product = useSelector<RootState, productSliceInterface>(state => state.productSlice)

    useEffect(() => {
        dispatch(getProductThunk({ productID: id }))
    }, [])

    if (product.errors.length > 0) return <Navigate to='/page404'/>

    return <>
        { product.products.length > 0 && <ItemContainer>
            <div className='item_img_container'>
                <img src={product.products[0].imagePath} alt={product.products[0].productName} />
            </div>
            <ItemRightSide>
                <article className='item_article'>
                    <h2>{product.products[0].productName}</h2>
                    <p>R${product.products[0].price.toFixed(2).replace('.', ',')}</p>
                </article>

                <div className='btns_container'>
                    <button onClick={() => dispatch(addProductThunk({ productID: product.products[0].id }))}>adicionar ao carrinho</button>
                    <button>comprar</button>
                </div>
            </ItemRightSide>
        </ItemContainer>

        }
    </>
}

export default ItemPage
