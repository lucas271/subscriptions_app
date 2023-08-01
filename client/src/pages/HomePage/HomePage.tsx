import { ItemsContainer, LoadingContainer } from './styles.css'
import { ThemeContext } from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import Items from '../../components/Items/Items'
import { useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch, RootState } from '../../features/store'
import { getProductsThunk, productSliceInterface } from '../../features/product/productSlice'
import Pagination from '../../components/Pagination/Pagination'

import loadingGIF from '../../assets/loading.gif'
import { UserAuthSliceType } from '../../features/userAuth/userSlicer'
import AddItemAdmin from '../../components/Items/AddItemAdmin'

const Homepage = () => {
    const { fontSizes, colors } = useContext(ThemeContext)
    const itemsPerPage = 3
    const [currentPage, setCurrentPage] = useState<number>(1)
    const products = useSelector<RootState, productSliceInterface>(state => state.productSlice)
    const user = useSelector<RootState, UserAuthSliceType>(state => state.userAuthSlice)
    const dispatch = useDispatch<AppThunkDispatch>()

    useEffect(() => {
        dispatch(getProductsThunk({ limit: itemsPerPage, offset: (itemsPerPage * currentPage / itemsPerPage - 1) * itemsPerPage }))
    }, [currentPage])

    return <>
        <main>
            <header style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center', height: '10vh', margin: 'auto', marginBottom: '3vh', fontSize: fontSizes.default, maxWidth: '90%' }}>
                <h2 >Loja de Assinaturas</h2>
            </header>
            {products.errors.length > 0}{
                <ItemsContainer>
                    {products.errors.map(error => <p key={error} style={{
                        textAlign: 'center',
                        margin: '5vh auto',
                        width: '30vw',
                        background: colors.error_color,
                        padding: '10px',
                        borderRadius: '5px'
                    }}>
                        {error}
                    </p>)}
                </ItemsContainer>
            }
            <ItemsContainer>
                {products.loading
                    ? <LoadingContainer>
                        <img src={loadingGIF} alt="loading gif" />
                    </LoadingContainer>
                    : <>
                        {user.admin && <AddItemAdmin offset={(itemsPerPage * currentPage / itemsPerPage - 1) * itemsPerPage} itemsPerPage={itemsPerPage}/>}
                        <Items product={products}/>
                    </>
                }
            </ItemsContainer>
            <footer style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                alignItems: 'center',
                width: '75%',
                margin: '10px auto'
            }}>
                {products.amountOfProducts > 0 &&
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        amountOfProducts={products.amountOfProducts}
                        maxAmountOfPaginationNums={8}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        loading={products.loading}
                    />
                }
            </footer>
        </main>
    </>
}

export default Homepage
