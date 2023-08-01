import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import UserAuth from './pages/UserAuth/UserAuth'
import Homepage from './pages/HomePage/HomePage'
import Navbar from './components/Navbar/Navbar'
import Page404 from './pages/Page404/Page404'
import ItemPage from './pages/ItemPage/ItemPage'
import CartPage from './pages/CartPage/CartPage'
import Subscriptions from './pages/Subscriptions/Subscriptions'
import { useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch, RootState } from './features/store'
import { isUserAdminThunk, renewTokensThunk, UserAuthSliceType } from './features/userAuth/userSlicer'
import { useEffect } from 'react'
import DeleteProduct from './pages/DeleteProduct/DeleteProduct'

const RoutesWithNavbar = () => {
    const user = useSelector<RootState, UserAuthSliceType>(state => state.userAuthSlice)
    // below line is used to avoid redirect before useeffect is runned
    const tokens = localStorage.getItem('tokens')
    const isAdmin = localStorage.getItem('admin')
    return <>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/404' element={<Page404/>}/>
            <Route path='/item/:id' element={<ItemPage/>}/>
            <Route path='/cart' element={user.logged || tokens ? <CartPage/> : <Navigate to='/userAuth'/>}/>
            <Route path='/subscription' element={user.logged || tokens ? <Subscriptions/> : <Navigate to='/userAuth'/>}/>
            <Route path='*' element={<Navigate to={'/404'}/>}/>
            <Route path='/deleteProduct' element={user.admin || isAdmin ? <DeleteProduct/> : <Navigate to='/'/>}/>
        </Routes>
    </>
}

const RoutesComponent = () => {
    const user = useSelector<RootState, UserAuthSliceType>(state => state.userAuthSlice)
    const dispatch = useDispatch<AppThunkDispatch>()
    useEffect(() => {
        dispatch(renewTokensThunk())
        dispatch(isUserAdminThunk())
    }, [])

    return <>
        <Router>
            <Routes>
                <Route path='*' element={<RoutesWithNavbar/> }/>
                <Route path='/userAuth' element={!user.logged ? <UserAuth/> : <Navigate to={'/'}/>}/>
            </Routes>
        </Router>
    </>
}

export default RoutesComponent
