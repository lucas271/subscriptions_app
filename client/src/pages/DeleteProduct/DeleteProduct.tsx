import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductThunk, getProductsThunk, productSliceInterface } from '../../features/product/productSlice'
import { AppThunkDispatch, RootState } from '../../features/store'
import { ItemsContainer } from './styles.css'

const DeleteProduct = () => {
    const products = useSelector<RootState, productSliceInterface>(state => state.productSlice)
    const dispatch = useDispatch<AppThunkDispatch>()

    useEffect(() => {
        dispatch(getProductsThunk({ limit: 10000, offset: 0 }))
    }
    , [])

    const deleteProduct = (id: string) => {
        dispatch(deleteProductThunk({ id }))
    }
    return <ItemsContainer>
        <h2>Deletar produtos</h2>
        {products.products.map(product => {
            return <div className='product' key={product.id}>
                <h3 className='name'>{product.productName}</h3>
                <p className='price'>{product.price}</p>
                <button className='btn' onClick={() => deleteProduct(product.id)}>Deletar</button>
            </div>
        })}
    </ItemsContainer>
}

export default DeleteProduct
